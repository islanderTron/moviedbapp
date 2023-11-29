import { MOVIEDB } from "@/app/server/tmdb";

export async function GET(req, res) {  
  let movie_id = res.params.id
  let similar;

  await MOVIEDB.movieSimilar({
    id: movie_id,
  })
    .then((res: any) => {
      similar = res;
    })
    .catch(console.error);

  return Response.json({
     similar
  });
}
