import { MOVIEDB } from "@/app/server/tmdb";

export async function GET(req: { nextUrl: { searchParams: any; }; }, res: any) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('time_window');

  try {
    let request = await MOVIEDB.trending({
      media_type: 'movie',
      time_window: query
    })

    if(request) {
      let trending_info = await request;
      
      return Response.json({
        trending_info
      }); 
    }
  } catch (error) {
    console.error(error)
  }
}
