import { MOVIEDB } from "$app/server/tmdb/index";

console.log(MOVIEDB.apiKey);

export async function GET() {
  let result;
  const test = await MOVIEDB.searchMovie({ query: "Alien" })
    .then((res) => {
      result = res;
    })
    .catch(console.error);

  return Response.json({
    result,
  });

  // return Response.json({
  //   test: 'hi'
  // })
}
