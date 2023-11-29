import { MOVIEDB } from "@/app/server/tmdb";

export async function GET() {
	const image_config = await MOVIEDB.configuration();
	// Example: https://image.tmdb.org/t/p/w92/NNxYkU70HPurnNCSiCjYAmacwm.jpg
	let url_path = image_config.images.base_url + '/original'
	
  return Response.json({
    url_path,
  });
}
