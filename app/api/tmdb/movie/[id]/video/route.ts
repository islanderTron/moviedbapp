import { MOVIEDB } from "@/app/server/tmdb";

export async function GET({ url }) {  
  let movie_id = url.split("movie/")[1].split('/')[0];
  let video;

  await MOVIEDB.movieVideos({
    id: movie_id,
  })
    .then((res: any) => {
      video = res;
    })
    .catch(console.error);

  return Response.json({
    status: 200,
     video
  });
}
