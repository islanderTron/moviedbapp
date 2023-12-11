"use client";
import Modal from "$app/components/modal/page";
import { Fragment } from "react";
import { useState } from "react";

export default function Carousel({ data, imageURL, genres, fixedProviders }) {
  const [similar, setSimilar] = useState();
  const [provider, setProvider] = useState();
  const [isLoaded, setLoad] = useState(true);
  const [movieGenres, setMovieGenres] = useState();
	const [credits, setCredits] = useState();
  const [videoId, setVideoId] = useState();

  // HTTP Methods
  async function getSimilarData(id: any) {
    return fetch(`/api/tmdb/movie/${id}/similar`)
      .then((res: any) => res.json())
      .then((res: any) => setSimilar(res.similar))
      .catch((error: any) => console.error(error));
  }

  async function getMovieInfo(id: number) {
    return fetch(`/api/tmdb/movie/${id}`)
      .then((res: any) => res.json())
      .then((res: any) => {
        let info = res.movie_info;
        // Set Genres
        if (genres) {
          setMovieGenres(info.genres);
        }

				// Casts
				setCredits(info.credits.cast.slice(0,9));

				// Provider
        let hasValue =
          info &&
          info["watch/providers"] &&
          info["watch/providers"].results &&
          info["watch/providers"].results.US &&
          info["watch/providers"].results.US.flatrate;

        if (hasValue) {
          info["watch/providers"].results.US.flatrate.filter((i) => {
            fixedProviders.map((prov) => {
              if (prov.provider_id === i.provider_id) {
                setProvider(prov);
              }
            });
          });
        } else {
					setProvider("")
				}

        let hasVideo = info &&
          info.videos && 
          info.videos.results
        
        setVideoId(hasVideo[0].id)
      });
  }

  // Event Handlers
  async function openModal(id: number) {
    if (id) {
      await Promise.all([
        getMovieInfo(id),
        // getSimilarData(id)
      ]);
      setLoad(false);
      document?.getElementById(`${id}`)?.showModal();
    }
  }

  const loadedCanShow = !isLoaded;

  // Render Methods

  // Will have to move Modal component over here due to the key error. 
  function renderCarousel() {
    let render: any = [];

    data.map((movie, index): void => {
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
              movieGenres={movieGenres}
              provider={provider}
              loadedCanShow={loadedCanShow}
							credits={credits}
              videoId={videoId}
            />
          </div>
        </Fragment>,
      );
    });
    return render;
  }

  return (
    <div className="carousel rounded-box">
      {renderCarousel()}
    </div>
);
}
