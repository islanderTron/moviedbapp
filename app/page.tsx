"use client";

import * as dotenv from "dotenv";
dotenv.config();

import Navbar from "./components/navbar/page";
import Card from "./components/card/page";

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
    return fetch("/api/tmdb/popular")
      .then((res) => res.json())
      .then((res) => {
        setPopular(res.result.results);
        setLoading(false);
      });
  }

  function getImagePath() {
    return fetch("/api/tmdb/image_config")
      .then((res) => res.json())
      .then((res) => {
        setImageURL(res.url_path);
      });
  }
  // Render methods
  function popularRender() {
    if (popular) {
      return <Card popular={popular} imageURL={imageURL} />;
    }
  }

  if (isLoading) return <p>loading...</p>;
  if (!popular) return <p>uh oh</p>;
  else {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto">
          {popularRender()}

        </div>
      </main>
    );
  }
}
