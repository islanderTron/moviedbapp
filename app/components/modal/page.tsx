import { filterGenres } from "@/app/helper";
import { useEffect } from "react";

export default function Modal({ movie, imageURL, genres, provider, similar }) {
  let genres_list: any, provider_list: any, similar_list: any;

  if (genres) {
    genres_list = filterGenres(movie.genre_ids, genres);
  }

  if (provider) {
    provider_list = provider;
  }

  if (similar) {
    similar_list = similar;
  }

  // Render Methods
  function renderGenres() {
    return genres_list.map((genre: string) => {
      return <p className="badge badge-lg">{genre}</p>;
    });
  }

  function renderProvider() {
    return (
      <picture>
        <source srcSet={`${imageURL}/${provider.logo_path}`} type="image" />
        <img
          src={`${imageURL}/${provider.logo_path}`}
          alt={provider.provider_name}
        />
      </picture>
    );
  }

  function renderSimilar() {
    let render: any = [];
    similar_list.results.map((similar: any) => {
      render.push(
        <picture className="">
          <source srcSet={`${imageURL}/${similar.poster_path}`} type="image" />
          <img
            src={`${imageURL}/${similar.poster_path}`}
            alt={similar.original_title}
          />
        </picture>,
      );
    });
    return render;
  }
  return (
    <dialog
      id={`${movie.id}`}
      key={movie.id}
      className="modal modal-top mt-20 lg:modal-middle"
    >
      <div className="modal-box p-0 w-full max-w-5xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
          <picture>
            <source
              srcSet={`${imageURL}/${movie.backdrop_path}`}
              type="image"
            />
            <img src={`${imageURL}/${movie.backdrop_path}`} alt={movie.title} />
          </picture>
          {provider_list && renderProvider()}
        </div>
        <div className="p-2">
          <p> Genres: </p>
          {genres_list && renderGenres()}
        </div>
        <p className="p-2">{movie.overview}</p>
        <div className="similar grid grid-cols-3 gap-4">
          {similar_list && renderSimilar()}
        </div>
      </div>
    </dialog>
  );
}
