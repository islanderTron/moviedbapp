// TMDB starter 
import { MOVIEDB } from "@/app/server/tmdb";

// Helper 
import { convertCommantoL, filterProviders } from "@/app/helper";

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
		
		// if(searchParams.get('providerImages')) {
		// 	discoverData = await filterProviders(providersData, discoverData)
		// }

		return Response.json({
			discoverData
		});
	} catch (error) {
		console.error(error)
	}
}
