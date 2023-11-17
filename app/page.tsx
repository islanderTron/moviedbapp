"use client";

import * as dotenv from "dotenv";
dotenv.config();

import Navbar from "./components/navbar/page";
import Card from "./components/card/page";
import Carousel from "./components/carousel/page";

// DEV Mode
import test from "./server/tmdb/example/popular.json";
import dev_image_path from "./server/tmdb/example/file_config.json";

import { useEffect, useState } from "react";

export default function Home() {
  const [popular, setPopular] = useState(null);
  const [trending, setTrending] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [toprated, setTopRated] = useState(null);

  const [isLoading, setLoading] = useState(true);

  const [imageURL, setImageURL] = useState("");

	const [apiCalled, setApi] = useState(false)

  // Lifecycle methods
  useEffect(() => {
		if(!apiCalled) {
			getTrendingData();
			setApi(true)
		}
    // getPopularData();
    // getImagePath();
		// getUpcomingData();
		// getTopratedData();
  }, [apiCalled]);

  // HTTP methods
  function getPopularData() {
    // DEV Mode
    // setPopular(test.results);

    return fetch("/api/tmdb/popular")
      .then((res) => res.json())
      .then((res) => {
        setPopular(res.result.results);
        // setLoading(false);
    });
  }

	async function getTrendingData() {
		return await fetch('/api/tmdb/trending', {
			cache: 'no-cache'
		})
			.then((res) => res.json())
			.then((res) => {
				setTrending(res.result.results)
			})
	}

	function getUpcomingData() {
		return fetch('/api/tmdb/upcoming')
			.then((res) => res.json())
			.then((res) => {
				return setUpcoming(res.result.results)
			})
	}

	function getTopratedData() {
		return fetch('/api/tmdb/top_rated')
			.then((res) => res.json())
			.then((res) => {
				return setTopRated(res.result.results)
			})
	}

  function getImagePath() {
    // DEV mode
    setImageURL(dev_image_path.url_path);
    
		// Prod mode
    // return fetch("/api/tmdb/image_config")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setImageURL(res.url_path);
    //   });
  }
  // Render methods
  // function popularRender() {
  //   if (popular) {
  //     return <Carousel popular={popular} imageURL={imageURL} />;
  //   }
  // }

	console.log(trending);
	

  return (
    <main>
      <Navbar imageURL={imageURL} />
      <div className="mx-auto">
        {/* {isLoading && 
					<span className="loading primary-content  loading-spinner loading-lg"></span>
				} */}

				{/* Most Popular */}
        <div>
          <div>
            <div className="bg-neutral text-neutral-content bg-base-100">
              <p className="text-2xl">Most Popular Movies in the U.S.</p>
            </div>
						
						{popular && 
            	<Carousel popular={popular} imageURL={imageURL} />
						}
          </div>
        </div>
				
				{/* Trending */}
        <div>
          <div>
            <div className="">
              <p className="text-2xl">Trending</p>
            </div>
						
						{trending && 
            	<Carousel popular={trending} imageURL={imageURL} />
						}
          </div>
        </div>

				{/* Upcoming */}
        <div>
          <div>
            <div className="">
              <p className="text-2xl">Upcoming</p>
            </div>
						
						{upcoming && 
            	<Carousel popular={upcoming} imageURL={imageURL} />
						}
          </div>
        </div>

				{/* Top Rated */}
        <div>
          <div>
            <div className="">
              <p className="text-2xl">Top Rated</p>
            </div>
						
						{toprated && 
            	<Carousel popular={toprated} imageURL={imageURL} />
						}
          </div>
        </div>
      </div>
    </main>
  );
}
