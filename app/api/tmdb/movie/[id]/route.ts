import { NextApiRequest, NextApiResponse } from "next";

import * as dotenv from "dotenv";
dotenv.config();
const { TMDB_KEY } = process.env;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const movie_id = res.params.id;
  let localization = "US";
  let url_movie_info = "https://api.themoviedb.org/3/movie/";

  try {

    let url_path = `${url_movie_info}/${movie_id}?api_key=${TMDB_KEY}&append_to_response=similar,watch/providers,credits,videos`;

    let request = await fetch(url_path)
    
    if(request.ok) {
      let movie_info = await request.json();
      
      return Response.json({
        movie_info,
      });
    } else {
      return Response.json({
        error: "We apologies that you're having this issue. Please, let us know: xxx@gmail.com. Thank you for being patience."
      });
    }
  } catch (error) {
    console.error(error);
  }
}
