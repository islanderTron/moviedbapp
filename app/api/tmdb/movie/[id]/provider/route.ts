import { MOVIEDB } from "@/app/server/tmdb";
import { matchProvider } from "@/app/helper";

export async function GET({ url }) {  
  let movie_id = url.split("movie/")[1].split('/')[0];
  let provider;
  
  let localization = 'US'

  await MOVIEDB.movieWatchProviders({
    id: movie_id,
  })
    .then(async (res: any) => {
      let filterProvider = await matchProvider(res.results[localization])

      provider = filterProvider
    })
    .catch(console.error);

  return Response.json({
    status: 200,
     provider
  });
}
