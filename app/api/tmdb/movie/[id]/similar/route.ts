import { MOVIEDB } from "@/app/server/tmdb";

export async function GET({ url }) {  
  let movie_id = url.split("movie/")[1].split('/')[0];
  let similar;

  await MOVIEDB.movieSimilar({
    id: movie_id,
  })
    .then((res: any) => {
      similar = res;
    })
    .catch(console.error);

  return Response.json({
    status: 200,
     similar
  });
}
