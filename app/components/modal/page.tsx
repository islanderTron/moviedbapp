import { filterGenres } from "@/app/helper";

export default function Modal({ movie, imageURL, genre }) {
  let genres_list; 
  
  if(genre) {
    genres_list = filterGenres(movie.genre_ids, genre);
  }
  
  return (
    <dialog id={`${movie.id}`} className="modal modal-top lg:mt-0 lg:mt-20 lg:modal-middle">
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
          {genres_list.map(genre => {
            return(
              <p className="badge badge badge-lg">{genre}</p>
            )
          })}
				</div>
        <p className="p-2">{movie.overview}</p>
      </div>
    </dialog>
  );
}
