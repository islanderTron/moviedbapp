import type { NextApiRequest, NextApiResponse } from "next";

// TMDB starter 
import { MOVIEDB } from "@/app/server/tmdb";

// Helper 
import { convertCommantoL } from "@/app/helper";
// https://developer.themoviedb.org/reference/discover-movie
/*  page integer
 * results - array of objects: 
 * adult: boolean
 * backdrop_path: string
 * genre_ids: array of integers
 * id: integer
 * original_language: string
 * original_title: string
 * overview: string
 * popularity: number
 * poster_path: string
 * release_date: string
 * title: string
 * video: boolean
 * vote_average: number
 * vote_count: integer
 *	total_pages: integer
 * total_results: integer
 **/
export async function GET({url}): Promise<Response> {

  let arr = url.split('providers=')[1].split(',')
  let providerList = convertCommantoL(arr)

  // Convert from , to | 
  const response = await MOVIEDB.discoverMovie({
    watch_region: "US",
    with_watch_providers: `${providerList}`,
  });

  return Response.json({
    status: 200,
    response,
  });
}
