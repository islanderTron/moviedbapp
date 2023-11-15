// Build a image URL
// https://developer.themoviedb.org/docs/image-basics
import { MOVIEDB } from "@/server/tmdb";

export async function GET() {
	const image_config = await MOVIEDB.configuration();
	// Example: https://image.tmdb.org/t/p/w92/NNxYkU70HPurnNCSiCjYAmacwm.jpg
	let url_path = image_config.images.base_url + '/original'
	
	// After get the data, set the object what you want to give to display the movie.
  return Response.json({
		status: 200,
		url_path
  });
}
