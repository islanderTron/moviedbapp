import { MOVIEDB } from "@/app/server/tmdb";

export async function GET(req, res) {  
  const movie_id = res.params.id
  let video;

  await MOVIEDB.movieVideos({
    id: movie_id,
  })
    .then((res: any) => {
      video = res;
    })
    .catch(console.error);

  return Response.json({
     video
  });
}
