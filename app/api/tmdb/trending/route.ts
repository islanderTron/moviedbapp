import { filterProviders } from "@/app/helper";
import { MOVIEDB } from "@/app/server/tmdb";

export async function POST(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("time_window");
  const total = parseInt(searchParams.get("total"));
  const providersData = await req.json();

  try {
    let request = await MOVIEDB.trending({
      media_type: "movie",
      time_window: query,
    });

    if (request) {
      let data = (await request).results.slice(0, total);
      let trending_data: any = data;

			// trending_data = await filterProviders(providersData, trending_data);

			for(let [index, movie] of Object.entries(data)) {
				let selected_provider = await MOVIEDB.movieWatchProviders({ id: movie.id });

				let hasFlatValue =
					selected_provider &&
					selected_provider.results &&
					selected_provider.results.US &&
					selected_provider.results.US.flatrate

				if(hasFlatValue) {
					let matchProviders = hasFlatValue.filter((flat: any) => providersData.find(prov => prov.provider_id === flat.provider_id))
					
					// Add a key and value for provider
					data[index] = {
						...data[index],
						provider: matchProviders ? matchProviders : null
					};
				}
			}
			
      return Response.json({
        trending_data
      });
    }
  } catch (error) {
    console.error(error);
  }
}
