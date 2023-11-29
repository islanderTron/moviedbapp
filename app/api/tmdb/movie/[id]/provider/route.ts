import { NextApiRequest, NextApiResponse } from "next";
import { MOVIEDB } from "@/app/server/tmdb";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const movie_id = res.params.id;
  let localization = "US";

  try {
    let response = await MOVIEDB.movieWatchProviders({
      id: movie_id,
    });

    let flatrate = response.results[localization].flatrate;
    return Response.json({
      flatrate,
    });
  } catch (error) {
    console.error(error);
  }
}
