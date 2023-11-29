import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<Response> {  
  const movie_id = res.params.id
  let http = req.headers.get('x-forwarded-proto')
  let hostname = req.headers.get('host')
  let url = `${http}://${hostname}/api/tmdb/genre`

  try {
    // Get generic genres 
    let request = await fetch(url)
    
    if(request.ok) {
      let generic_genres = await request.json()
      
    }
  } catch(error) {
    
  }

  return Response.json({
    status: 200,
  });
}