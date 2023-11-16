"use client";

import { useState } from "react";

export default function Carousel(props: any) {
	const [glowing, setGlowing] = useState('')
  // Event Handlers
  function hoverHandler(id: any) {
    console.log(id);
  }

	function modalHandler(id: number) {

	}
  const { popular, imageURL } = props;

  return (
    <div className="carousel carousel-end w-full">
      {popular.map((data: any) => {
        return (
          <div
            key={data.title}
            id={data.id}
            className="carousel-item w-1/4 hover:bg-sky-700"
						onClick={() => modalHandler(data.id)}
						onMouseOver={() => hoverHandler(data.id)}
						// style={{glowing}}
          >
            <picture>
              <source srcSet={`${imageURL}/${data.poster_path}`} type="image" />
              <img src={`${imageURL}/${data.poster_path}`} alt={data.title} />
            </picture>
          </div>
        );
      })}
    </div>
  );
}
