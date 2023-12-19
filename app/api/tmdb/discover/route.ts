// TMDB starter 
import { MOVIEDB } from "@/app/server/tmdb";

// Helper 
import { convertCommantoL } from "@/app/helper";

/**
 * This is a heart of discovery movies
 * @param param0 
 * @returns 
 */
export async function GET(req, res): Promise<Response> {
	// https://developer.themoviedb.org/reference/discover-movie
	type Results = {
		adult: boolean,
		backdrop_path: string,
		genre_ids: Array<number>,
		id: number,
		original_language: string,
		original_title: string,
		overview: string,
		popularity: number,
		poster_path: string,
		release_date: string,
		title: string,
		video: boolean,
		vote_average: number,
		vote_count: number,
	}
	type Response = {
		page: number,
		results: Results,
		total_pages: number,
		total_results: number
	}
	type Request = {
		certification: string,
		"certification.gte": string,
		"certification.lte": string,
		certification_country: string,
		include_adult: boolean,
		include_video: boolean,
		language: string,
		page: number,
		primary_release_year: number,
		"primary_release_date.gte": Date,
		"primary_release_date.lte": Date,
		region: string,
		"release_date.gte": Date,
		"release_date.lte": Date,
		sort_by: string,
		"popularity.desc": "popularity.asc" | "popularity.desc" | "revenue.asc" | "revenue.desc" | "primary_release_date.asc" | "primary_release_date.desc" | "vote_average.asc" | "vote_average.desc" | "vote_ctount.asc" | "vote_count.desc",
		"vote_average.gte": number,
		"vote_average.lte": number,
		"vote_count.gte": number,
		"vote_count.lte": number,
		watch_region: string,
		with_cast: string,
		with_companies: string,
		with_crew: string,
		with_genres: string,	// can be a comma (AND) or pipe (OR) separated query
		with_keywords: string,
		with_origin_country: string,
		with_original_language: string,
		with_people: string,
		with_release_type: number,
		"with_runtime.gte": number,
		"with_runtime.lte": number,
		with_watch_monetization_types: string,
		with_watch_providers: string,
		without_companies: string,
		without_genres: string,
		without_keywords: string,
		without_watch_providers: string,
		year: number
	}

	let request: Request = {

	}

	const searchParams = req.nextUrl.searchParams
	// let arr = url.split('providers=')[1].split(',')
	// let providerList;
	// let providers = null;
	// let genres = null;
	// let total = null;

	let requestDiscover = {
		providers: null,
		total: null,
		genres: null
	}
	
	if(searchParams.get('providers') !== null) {
		requestDiscover.providers = searchParams.get('providers')
	}

	if(searchParams.get('total') !== null) {
		requestDiscover.total = searchParams.get('total')
	}

	if(searchParams.get('genres') !== null) {
		requestDiscover.genres = searchParams.get('genres')
	}
	
	// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_providers=8%2C9%2C15%2C350%2C384%2C531';

	const response = await MOVIEDB.discoverMovie({
		watch_region: "US",
		with_watch_providers: `8|9|15|350|384|531`
		// with_genres: 
	});

	// Need handle the error if the response return empty
	console.log(response);
	

	return Response.json({
		// response,
		'test': 'hello world'
	});
}
