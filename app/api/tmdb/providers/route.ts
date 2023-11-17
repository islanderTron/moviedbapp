import { MOVIEDB } from "@/app/server/tmdb";
export async function GET(): Promise<Response> {
	let result;
	
	const response = await MOVIEDB.movieWatchProviderList()
	.then((res: any) => {
		result = res.results;
	})
	.catch(console.error);
	
	const providers_filter = ['Apple TV Plus', 'Hulu', 'HBO Max', 'Disney', 'Amazon Prime Video', 'Paramount Plus']

	let providers_list = [];
	result.filter(provider => {
		if(providers_filter.includes(provider.provider_name)) {
			providers_list.push({
				display_priority: provider.display_priority,
				logo_path: provider.logo_path,
				provider_name: provider.provider_name,
				provider_id: provider.provider_id

			})
		}
	})
	
  return Response.json({
    status: 200,
		providers_list
  });
}
