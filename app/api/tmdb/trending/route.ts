import { MOVIEDB } from "@/app/server/tmdb";

export async function GET() {
  try {
    let request = await MOVIEDB.trending({
      media_type: 'movie',
      time_window: [`week`]
    })

    if(request) {
      let trending_info = await request;
      console.log(trending_info);
      
      return Response.json({
        trending_info
      }); 
    }
    

  } catch (error) {
    console.error(error)
  }
}
