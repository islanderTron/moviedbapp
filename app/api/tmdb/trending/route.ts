import { MOVIEDB } from "@/app/server/tmdb";

export async function POST(req, res) {
  // const searchParams = req.nextUrl.searchParams
  // const query = req.searchParams.get('time_window');
	// const total = parseInt(req.searchParams.get('total'));

	
	let data = await req.json();
	console.log(data);
	
	// console.log('hi');
	
  try {
    // let request = await MOVIEDB.trending({
    //   media_type: 'movie',
    //   time_window: query
    // })

		// console.log(req.searchParams);
		

    // if(request) {
		// 	// Get the list of providers
    //   let trending_info = (await request).results.slice(0, (total - 1));
		// 	// trending_info.map(async(movie, index) => {
		// 	// 	let movie_info = await MOVIEDB.movieWatchProviders({ id: movie.id})
		// 	// 	let provider = movie_info.results.US.flatrate[0];
				
		// 	// 	//
				
		// 	// })

		// 	console.log(trending_info);
			
    //   return Response.json({
    //     trending_info
    //   }); 
    // }

		return Response.json({
			    test: 'hi'
			  }); 
  } catch (error) {
    console.error(error)
  }
}
