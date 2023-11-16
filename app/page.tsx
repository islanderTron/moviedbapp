"use client";

import * as dotenv from "dotenv";
dotenv.config();

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
        console.log(res);
        setImageURL(res.url_path);
      });
  }
  // Render methods
  function popularRender() {
    if (popular) {
      const test = [popular];
      console.log(test);

      return (
        <div>
          {/* {test.map(data => {
						<p>hi</p>
					})} */}
        </div>
      );
    }
  }

  // Need to figure out how to handle with the state outside render function. Look at your old repo and it might help you to refresh your mind.
  if (isLoading) return <p>loading...</p>;
  if (!popular) return <p>uh oh</p>;
  else {
    return (
      <main>
        Home page
        <button className="btn">Button</button>
        {popularRender()}
        <div>
          {
            // need to describe the type of this data but the result look fine as usual
            popular.map((data: any) => (
              <div>
                <p key={data.title}>{data.title}</p>
                <img src={`${imageURL}/${data.poster_path}`} />
              </div>
            ))
          }
        </div>
      </main>
    );
  }
}
