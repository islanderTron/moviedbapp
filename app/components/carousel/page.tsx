"use client";
import Modal from "$app/components/modal/page";
import { Fragment, Key } from "react";
import { useState } from "react";
import { filterGenres } from "@/app/helper";

export default function Carousel({ data, imageURL, genres, fixedProviders }) {
  const [similar, setSimilar] = useState();
  const [provider, setProvider] = useState();
  const [isLoaded, setLoad] = useState(true);
  const [movieGenres, setMovieGenres] = useState();

  // HTTP Methods
  async function getGenresData(movie_id: number) {
    if(genres) {
      let movie_genres_ids = data.filter((movie: { id: number; }) => movie.id === movie_id)[0].genre_ids
      let filter_genres = filterGenres(movie_genres_ids, genres)
      
      setMovieGenres(filter_genres)
    }
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
      .then((res: any) => {

        // let filtered = res.flatrate.filter(i => {
        //   return fixedProviders.includes(i.provider_id)  
        // })
        
        // console.log(filtered);

        res.flatrate.filter(i => {
          fixedProviders.map(prov => {
            if(prov.provider_id === i.provider_id) {
              setProvider(prov);
            }
          })
        })
        
      })
      .catch((error: any) => console.error(error));
  }

  // Event Handlers
  async function openModal(id: number) {
    if(id) {
      await Promise.all([
        await getGenresData(id),
        await getSimilarData(id),
        await getProviderData(id),
      ]);
      
      setLoad(false);
      document?.getElementById(`${id}`)?.showModal();
    }
  }

  const loadedCanShow = !isLoaded;

  // Render Methods
  function renderCarousel() {
    let render: any = [];

    data.map((movie: { id: any; poster_path: any; title: string | undefined; }): void => {
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
              similar={similar}
              loadedCanShow={loadedCanShow}
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
