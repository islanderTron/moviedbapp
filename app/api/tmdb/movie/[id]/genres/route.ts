import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Response> {
  const movie_id = res.params.id;
  let http: string = req.headers.get("x-forwarded-proto");
  let hostname: string = req.headers.get("host");
  let url: string = `${http}://${hostname}/api/tmdb/genre`;

  try {
    // Get generic genres
    let request = await fetch(url);

    if (request.ok) {
      let generic_genres = await request.json();
    }
  } catch (error) {}

  return Response.json({
    status: 200,
  });
}
