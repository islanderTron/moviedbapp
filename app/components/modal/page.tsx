import { filterGenres } from "@/app/helper";
import { useEffect } from "react";

export default function Modal({ movie, imageURL, genres }) {
  let genres_list: any;

  if (genres) {
    genres_list = filterGenres(movie.genre_ids, genres);
  }

  // Render Methods
  function renderGenres() {
    return genres_list.map((genre: string) => {
      return <p className="badge badge-lg">{genre}</p>;
    });
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
          <picture className="">
            <source
              srcSet={`${imageURL}/${movie.backdrop_path}`}
              type="image"
            />
            <img src={`${imageURL}/${movie.backdrop_path}`} alt={movie.title} />
          </picture>
        </div>
        <div className="p-2">
          <p> Genres: </p>
          {genres_list && renderGenres()}
        </div>
        <p className="p-2">{movie.overview}</p>
      </div>
    </dialog>
  );
}
