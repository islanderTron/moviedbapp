"use client";

import * as dotenv from "dotenv";
dotenv.config();

import { useEffect, useState } from "react";

// Componemts
import Navbar from "./components/navbar/page";
import Card from "./components/card/page";
import Carousel from "./components/carousel/page";

// Helper
import { providerListComma } from "./helper";

// DEV Mode
import test from "./server/tmdb/example/popular.json";
import dev_image_path from "./server/tmdb/example/file_config.json";

export default function Home() {
  const [popular, setPopular] = useState(null);
  const [providers, setProviders] = useState(null);
  const [discovery, setDiscovery] = useState(null);
  const [imageURL, setImageURL] = useState("");

  // Lifecycle methods
  useEffect(() => {
    getDiscovery();
  }, [providers]);

  useEffect(() => {
    getImagePath();
    getProvidersData();
  }, []);

  // HTTP methods
  async function getProvidersData() {
    return fetch("/api/tmdb/providers")
      .then(async (res) => res.json())
      .then(async (res) => {
        setProviders(res.providers_list);
      })
      .catch((error) => console.error(error));
  }

  async function getDiscovery() {
    let list = providerListComma(providers);

    return fetch(`/api/tmdb/discover?providers=${list}`)
      .then((res) => res.json())
      .then((res) => {
        return setDiscovery(res.response.results);
      })
      .catch((err) => console.error(err));
  }

  function getPopularData() {
    return fetch("/api/tmdb/popular")
      .then((res) => res.json())
      .then((res) => {
        setPopular(res.result.results);
        console.log(popular);
      });
  }

  async function getTrendingData() {
    return await fetch("/api/tmdb/trending", {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        setTrending(res.result.results);
      });
  }

  function getUpcomingData() {
    return fetch("/api/tmdb/upcoming")
      .then((res) => res.json())
      .then((res) => {
        return setUpcoming(res.result.results);
      });
  }

  function getTopratedData() {
    return fetch("/api/tmdb/top_rated")
      .then((res) => res.json())
      .then((res) => {
        return setTopRated(res.result.results);
      });
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
  return (
    <main>
      <Navbar providers={providers} imageURL={imageURL} />
      <div>
        <div>
          <div className="">
            <p className="text-2xl">Discovery</p>
          </div>

          {discovery && <Carousel data={discovery} imageURL={imageURL} />}
        </div>
      </div>
    </main>
  );
}
