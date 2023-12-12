import { MOVIEDB } from "@/app/server/tmdb";
export async function GET(): Promise<Response> {

	// Def need to refactor this for sure
  try {
    const response = (await MOVIEDB.movieWatchProviderList()).results;
		
    const providers_filter = [
      "Apple TV Plus",
      "Hulu",
      "HBO Max",
      "Disney",
      "Paramount Plus",
      "Netflix",
      "Amazon Prime Video",
    ];

    // I had to add extra filter out due to duplicate on TMDB's API streaming providers.
    let providers_list = [];
    response.filter((provider) => {
      if (
        providers_filter.includes(provider.provider_name) &&
        provider.provider_id !== 119
      ) {
        providers_list.push({
          display_priority: provider.display_priority,
          logo_path: provider.logo_path,
          provider_name: provider.provider_name,
          provider_id: provider.provider_id,
					isEnable: true
        });
      }
    });

    return Response.json({
			// test: '101'
      providers_list,
    });
  } catch (error) {
    console.error(error);
  }
}
