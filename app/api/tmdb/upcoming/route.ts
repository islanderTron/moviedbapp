import { MOVIEDB } from "@/app/server/tmdb";

export async function GET() {
  let result;
  
  await MOVIEDB.upcomingMovies()
    .then((res: any) => {
      result = res;
    })
    .catch(console.error);

  return Response.json({
    status: 200,
    result,
  });
}
