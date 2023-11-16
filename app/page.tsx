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
  const [isLoading, setLoading] = useState(true);

  const [imageURL, setImageURL] = useState("");

  // Lifecycle methods
  useEffect(() => {
    getData();
    getImagePath();
  }, []);

  // HTTP methods
  function getData() {
    // DEV Mode
    setPopular(test.results);

    // return fetch("/api/tmdb/popular")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setPopular(res.result.results);
    //     setLoading(false);
    // });
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
  function popularRender() {
    if (popular) {
      return <Carousel popular={popular} imageURL={imageURL} />;
    }
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto">
        {/* {isLoading && 
					<span className="loading primary-content  loading-spinner loading-lg"></span>
				} */}

        {popularRender()}
      </div>
    </main>
  );
}
