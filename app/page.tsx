"use client"

import * as dotenv from 'dotenv';
dotenv.config()

import { useEffect, useState } from 'react';

export default function Home() {
	const [popular, setPopular] = useState(null)
	const [isLoading, setLoading] = useState(true)
	
	useEffect(() => {
		fetch('/api/tmdb/popular')
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				
				setPopular(res.result.results)
				setLoading(false)
			})
	},[])

	console.log(typeof popular); // weird 
	
	// Need to figure out how to handle with the state outside render function. Look at your old repo and it might help you to refresh your mind. 
	if(isLoading) return <p>loading...</p>
	if(!popular) return <p>uh oh</p>

  return ( 
		<main>
			Home page
			<div>
				{
					popular[0].title
				}
			</div>
		</main>
	)
}
