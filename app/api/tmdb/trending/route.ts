import { MOVIEDB } from "@/app/server/tmdb";

export async function POST(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("time_window");
  const total = parseInt(searchParams.get("total"));

  try {
    let request = await MOVIEDB.trending({
      media_type: "movie",
      time_window: query,
    });

    if (request) {
      let data = (await request).results.slice(0, total);
      let trending_data: any = data;

      // Iterate trending data 
      for(const [index, movie] of Object.entries(trending_data)) {
        // Fetch movie's provider
        let selected_provider = await MOVIEDB.movieWatchProviders({ id: movie.id });
        
        let hasFlatValue =
          selected_provider &&
          selected_provider.results &&
          selected_provider.results.US &&
          selected_provider.results.US.flatrate &&
          selected_provider.results.US.flatrate;
        
        // Add a key and value for provider
        trending_data[index] = {
          ...trending_data[index],
          provider: hasFlatValue ? selected_provider.results.US.flatrate : null
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
