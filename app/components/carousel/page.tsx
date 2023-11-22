"use client";
import Modal from "$app/components/modal/page";
import { useEffect, useState } from "react";

export default function Carousel(props: any) {
  const { data, imageURL } = props;
  const [movieID, setMovieID] = useState(null);

  function renderCarousel() {
    let render: any = [];

    data.map((movie: any) => {
      render.push(
        <div className="carousel-item w-1/4" key={movie.id}>
          <picture
            onClick={() => document.getElementById(movie.id).showModal()}
          >
            <source srcSet={`${imageURL}/${movie.poster_path}`} wtype="image" />
            <img src={`${imageURL}/${movie.poster_path}`} alt={movie.title} />
          </picture>
          <Modal movie={movie} imageURL={imageURL} />
        </div>
      );
    });
    return render;
  }
  return <div className="carousel rounded-box">{renderCarousel()}</div>;
}
