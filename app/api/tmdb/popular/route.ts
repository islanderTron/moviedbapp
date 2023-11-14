import { MOVIEDB } from "@/server/tmdb";

export async function GET() {
	let result; 

	await MOVIEDB.moviePopular()
		.then((res: any) => {
			result = res
		})
		.catch(console.error)	

  return Response.json({
		status: 200,
		result
  });
}
