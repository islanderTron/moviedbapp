// TMDB starter 
import { MOVIEDB } from "@/app/server/tmdb";

// Helper 
import { convertCommantoL } from "@/app/helper";

/**
 * This is a heart of discovery movies
 * @param param0 
 * @returns 
 */
export async function POST(req, res): Promise<Response> {
	try {
		const searchParams = req.nextUrl.searchParams;
		let providersData = await req.json();

		let requestDiscover = {
			watch_region: 'US'
		}
	
		if(searchParams.get('providers')) {
			requestDiscover['with_watch_providers'] = searchParams.get('providers')
		}
	
		if(searchParams.get('genres')) {
			requestDiscover['with_genres'] = searchParams.get('genres')
		}
		// http://localhost:3000/api/tmdb/discover?providers=8,9,15,350,384,531&total=5&genres=1 <-- , does not work
		// http://localhost:3000/api/tmdb/discover?providers=8|9|15|350|384|531
		
		const response = await MOVIEDB.discoverMovie(requestDiscover);
		const data = await response.results;
		let discoverData;
		let numShowMovies = searchParams.get('total') ?? searchParams.get('total')

		if(numShowMovies) {
			discoverData = data.slice(0, numShowMovies)
		}
		
		if(searchParams.get('providerImages')) {
			// Need to reuse this code on helper.ts
			for(let [index, movie] of Object.entries(discoverData)) {
				let selected_provider = await MOVIEDB.movieWatchProviders({ id: movie.id });

				let hasFlatValue =
          selected_provider &&
          selected_provider.results &&
          selected_provider.results.US &&
          selected_provider.results.US.flatrate &&
          selected_provider.results.US.flatrate;

				// Filter out share services. 
				let matchProviders = hasFlatValue.filter((flat: any) => providersData.find(prov => prov.provider_id === flat.provider_id))
        
        // Add a key and value for provider
        discoverData[index] = {
          ...discoverData[index],
          provider: matchProviders ? matchProviders : null
        }
			}
		}

		return Response.json({
			discoverData
		});
	} catch (error) {
		console.error(error)
	}
}
