"use client";
import Modal from "$app/components/modal/page";
import { relative } from "path";
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
	function renderOrder(index: number) {
		if(showOrder === true) {
			return <span className="text-6xl absolute bottom-0 w-1/4">
				{index}
			</span>
		}
	}
  // Need to work on the style condition ***** 
  function renderPoster(movie, index: number) {
    return (
      <div style={{ position: "relative"}} >
        {renderOrder(index)}
				
        <img
          src={`${imageURL}/${movie.poster_path}`}
          alt={movie.title}
          width={300}
          onClick={() => openModal(movie.id)}
					className={`${showOrder ? 'left-7 w-3/4 relative' : 'w-full'} h-auto rounded-lg`}
        />
      </div>
    );
  }
  return (
    <div
      className="carousel rounded-box w-full"
      style={{ position: "relative" }}
    >
      {data.map((movie: any, index: number) => {
        return (
          <div key={movie.id} className="carousel-item w-32 sm:w-80">
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
