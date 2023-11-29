import { MOVIEDB } from "@/app/server/tmdb";

export async function GET() {
  let result;
  // trending/:media_type/:time_window

  /**
   * https://developer.themoviedb.org/docs/popularity-and-trending#trending
   * 
   * media_type: movie || tv
   * time_window: day || week,
   */
  await MOVIEDB.trending({
    media_type: "movie",
    time_window: "week",
  })
    .then((res: any) => {
      result = res;
    })
    .catch(console.error);

  return Response.json({
    result,
  });
}
