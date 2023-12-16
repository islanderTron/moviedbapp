import Spin from "../sping/page";
import Video from "../video/page";

export default function Modal({
  movie,
  imageURL,
  loadedCanShow,
  credits,
  videoId,
  movieData,
}) {
  // Render Methods
  function renderGenres() {
    return movieData.genres.map((genre: { name: boolean }) => {
      return (
        <div key={`${genre.name}`} className="badge badge-neutral badge-lg">
          {genre.name}
        </div>
      );
    });
  }

  function renderProvider() {
    const haveProvider = movieData.provider
    
    if(haveProvider) {
      let providerData = movieData.provider;
      providerData.map(prov => {
        return (
          <picture>
            <source srcSet={`${imageURL}/${prov.logo_path}`} type="image" />
            <img
              className="w-20 mask mask-circle"
              src={`${imageURL}/${prov.logo_path}`}
              alt={prov.provider_name}
            />
          </picture>
        );
      })
    }
  }

  function releaseDate() {
    return (
      <div>
        <p>{movieData.title}</p>
        <p>{movieData.release_date}</p>
      </div>
    );
  }

  function castCrew() {
    const credit = movieData.credits.cast.slice(0, 9);
    return (
      <div className="p-2">
        <p>Casts: </p>
        {credit.map((cast) => {
          return <p key={cast.id}>{cast.name} </p>;
        })}
      </div>

    )
  }

  // Need to replace from movie to movieData - once the condition is workgin, remove states: provider, genres, credits. Keep it concise 🤓
  return (
    <dialog
      id={`${movie.id}`}
      key={`${movie.id}`}
      className="modal modal-top lg:modal-middle"
    >
      <div className="modal-box p-0 w-full max-w-5xl">
        <div>
          {loadedCanShow ? (
            <>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-40">
                  ✕
                </button>
              </form>

              <div style={{ position: "relative" }}>
                <picture>
                  <source
                    srcSet={`${imageURL}/${movie.backdrop_path}`}
                    type="image"
                  />
                  <img
                    src={`${imageURL}/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </picture>
                {/* <Video id={videoId} /> */}
                <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                  {renderProvider()}
                </div>
              </div>

              <div className="p-2">
                {releaseDate()}
                <p> Genres: </p>
                {renderGenres()}
              </div>

              <p className="p-2">{movie.overview}</p>
              <div>{castCrew()}</div>
            </>
          ) : (
            <Spin />
          )}
        </div>
      </div>
    </dialog>
  );
}
