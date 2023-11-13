import { MOVIEDB } from "$app/server/tmdb/index";

export async function GET() {
  let result;
  
  await MOVIEDB.moviePopular()
  .then((res: any) => {
    result = res;
  })
  .catch(console.error)

  return Response.json({
    result,
  });
}
