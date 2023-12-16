"use client";
import Modal from "$app/components/modal/page";
import { useState } from "react";

export default function Carousel({ data, imageURL, fixedProviders }) {
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
  function renderPoster(movie) {
    return (
      <div style={{ position: "relative" }}>
        <picture onClick={() => openModal(movie.id)}>
          <source srcSet={`${imageURL}/${movie.poster_path}`} type="image" />
          <img src={`${imageURL}/${movie.poster_path}`} alt={movie.title} />
        </picture>

        <div className="flex" style={{position: "absolute", width: '100%', bottom: 0}}>
          {movie.provider ? (
            movie.provider.map((prov: any) => {
              return (
                <picture className="w-3/12 mask mask-circle" key={movie.provider[0].id}>
                  <source srcSet={`${imageURL}/${movie.provider[0].logo_path}`} type="image"/>
                  <img src={`${imageURL}/${movie.provider[0].logo_path}`} alt={movie.provider[0].title} />
                </picture>
              );
            })
            // <picture key={movie.provider[0].id} className="w-3/12 mask mask-circle">
            //       <source srcSet={`${imageURL}/${movie.provider[0].logo_path}`} type="image"/>
            //       <img src={`${imageURL}/${movie.provider[0].logo_path}`} alt={movie.provider[0].title} />
            //     </picture>
          ) : (
            <></>
          )}
        </div>

      </div>
    );
  }
  return (
    <div className="carousel rounded-box">
      {data.map((movie: any) => {
        return (
          <div
            key={movie.id}
            className="carousel-item  w-1/2 sm:w-2/4 lg:w-1/4"
          >
            {renderPoster(movie)}
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
