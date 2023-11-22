"use client";
import Modal from "$app/components/modal/page";
import { Fragment } from "react";
import { useState } from "react";

export default function Carousel(props: any) {
  const { data, imageURL } = props;
  const [genres, setGenres] = useState();
  const [similar, setSimilar] = useState();
  const [provider, setProvider] = useState();

  async function getGenresData() {
    return fetch("/api/tmdb/genre")
      .then((res: any) => res.json())
      .then((res: any) => {
        setGenres(res.genres);
      })
      .catch((error: any) => console.error(error));
  }

  async function getSimilarData(id: any) {
    return fetch(`/api/tmdb/movie/${id}/similar`)
      .then((res: any) => res.json())
      .then((res: any) => setSimilar(res.similar))
      .catch((error: any) => console.error(error));
  }

  async function getProviderData(id: any) {
    return fetch(`/api/tmdb/movie/${id}/provider`)
      .then((res: any) => res.json())
      .then((res: any) => setProvider(res.provider))
      .catch((error: any) => console.error(error));
  }

  // Event Handlers
  async function openModal(id: number) {
    getGenresData();
    getSimilarData(id);
    getProviderData(id);
    document.getElementById(id).showModal();
  }

  function renderCarousel() {
    let render: any = [];

    data.map((movie: any) => {
      render.push(
        <Fragment key={movie.id}>
          <div className="carousel-item  w-1/2 sm:w-2/4 lg:w-1/4">
            <picture onClick={() => openModal(movie.id)}>
              <source
                srcSet={`${imageURL}/${movie.poster_path}`}
                type="image"
              />
              <img src={`${imageURL}/${movie.poster_path}`} alt={movie.title} />
            </picture>
            <Modal
              movie={movie}
              imageURL={imageURL}
              genres={genres}
              provider={provider}
              similar={similar}
            />
          </div>
        </Fragment>,
      );
    });
    return render;
  }
  return <div className="carousel rounded-box">{renderCarousel()}</div>;
}
