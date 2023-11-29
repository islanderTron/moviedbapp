import { MOVIEDB } from "@/app/server/tmdb";

export async function GET() {
	let genres;
  const res = await MOVIEDB.genreMovieList()
    .then((res) => {
      genres = res.genres
    })
    .catch((error) => console.error(error))
  
  return Response.json({
    genres
  });
}
