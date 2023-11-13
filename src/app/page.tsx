"use client"; // This is a client component 👈🏽

import Image from "next/image";
import { useEffect, useState } from "react";

async function handlerRequest() {
  let response = await fetch('./api/tmdb/popular')
  return response.json();  
}



export default async function Home() {
  const [data, setData] = useState(null);


  useEffect(() => {
    fetch('/api/tmdb/popular')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      }) 
  }, [])

  return (
    <main>
      Hi
      <button className="btn">Button</button>
    </main>
  );
}
