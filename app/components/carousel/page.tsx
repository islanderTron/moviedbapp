"use client";
import Modal from "$app/components/modal/page";
import { useState } from "react";

export default function Carousel({
  data,
  imageURL,
  fixedProviders,
  showOrder,
}) {
  const [provider, setProvider] = useState();
  const [isLoaded, setLoad] = useState(true);
  const [movieGenres, setMovieGenres] = useState();
  const [credits, setCredits] = useState();
  const [videoId, setVideoId] = useState();

  const [selectedMovie, setSelectedMovie] = useState();

  // HTTP Methods
  async function getMovieInfo(id: number) {
    return fetch(`/api/tmdb/movie/${id}`, {
      method: "POST",
      body: JSON.stringify(fixedProviders),
    }).then(async (res: any) => {
      const info = (await res.json()).movie_info;

      setSelectedMovie(info);
      setMovieGenres(info.genres);

      setCredits(info.credits.cast.slice(0, 9));

      if (info.provider) {
        setProvider(info.provider[0]);
      } else {
        setProvider("");
      }

      let hasVideo = info && info.videos && info.videos.results;
      setVideoId(hasVideo[0].id);
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

  const loadedCanShow = selectedMovie ?? !isLoaded;

  // Render Methods
  function renderPoster(movie, index: number) {
    return (
      <div className="relative">
         {showOrder === true && (
          <span className="text-6xl sm:text-9xl absolute bottom-0 left-0 w-1/4">
            {index}
          </span>
        )}
        <img
          src={`${imageURL}/${movie.poster_path}`}
          alt={movie.title}
          onClick={() => openModal(movie.id)}
          className={`${
            showOrder ? "left-7 sm:left-16 w-3/4" : "w-full"
          } h-full`}
        />
      </div>
    );
  }
  
  return (
    <div className="carousel rounded-box w-full">
      {data.map((movie: any, index: number) => {
        return (
          <div key={movie.id} className="carousel-item w-32 sm:w-64">
            {renderPoster(movie, index + 1)}
            <Modal
              movie={movie}
              imageURL={imageURL}
              loadedCanShow={loadedCanShow}
              credits={credits}
              videoId={movie.id}
              movieData={selectedMovie}
            />
          </div>
        );
      })}
    </div>
  );
}
