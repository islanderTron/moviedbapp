import { useEffect } from "react";
import Image from 'next/image';


// Might have to reinstall next.js but without `src` - this might be the reason why it's not working with async/await on client side. The `src` folder is static app which means that they do not communciate with server side at all. 
async function getData() {
	const res = await fetch('http://localhost:3000/api/tmdb/popular')
	if(!res.ok) {
		throw new Error('failed fetch data')
	}
	return res.json()
}
export default async function Home() {
	const data = await getData();
	console.log(data.result.results);
	// Build a image URL
	// https://developer.themoviedb.org/docs/image-basics
	
  return (
		<main>
			Home page
			{/* {data.result.results.map((res: any) => {
				return (
					<div key={res.id}>
						<p>name: {res.title} </p>
						<Image 
							src={res.backdrop_path} 
							width={100}
							height={100}
							alt={res.title}
						/>
					</div>
				)
			})} */}
		</main>
	)
}
