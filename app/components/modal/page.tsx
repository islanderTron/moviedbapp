import Spin from "../sping/page"
import Video from "../video/page";

export default function Modal({
  movie,
  imageURL,
  movieGenres,
  provider,
  // similar,
  loadedCanShow,
  credits,
  videoId
}) {
  // Render Methods
  function renderGenres() {
    if (movieGenres) {
      return movieGenres.map((genre: { name: boolean }) => {
        return <div className="badge badge-neutral badge-lg">{genre.name}</div>;
      });
    }
  }

  function renderProvider() {
    if (provider) {
      return (
        <picture>
          <source srcSet={`${imageURL}/${provider.logo_path}`} type="image" />
          <img
            className="w-20 mask mask-circle"
            src={`${imageURL}/${provider.logo_path}`}
            alt={provider.provider_name}
          />
        </picture>
      );
    } else {
      return "";
    }
  }

  function releaseDate() {
    return (
      <div>
        <p>{movie.title}</p>
        <p>{movie.release_date}</p>
      </div>
    );
  }

  function renderSimilar() {
    let render: any = [];

    if (loadedCanShow && similar.results) {
      similar.results.map((similar: any) => {
        render.push(
          <picture className="">
            <source
              srcSet={`${imageURL}/${similar.poster_path}`}
              type="image"
            />
            <img
              src={`${imageURL}/${similar.poster_path}`}
              alt={similar.original_title}
            />
          </picture>,
        );
      });
      return render;
    } else {
      <Spin />;
    }
  }

  function castCrew() {
    if (credits) {
      return (
        <div className="p-2">
          <p>Casts: </p>
          {credits.map((cast, index) => {
            if (index <= 9) {
              return <p>{cast.name} </p>;
            }
          })}
        </div>
      );
    }
  }

  function renderVideo(videos) {
    console.log(videos);
  }

  return (
    <dialog
      id={`${movie.id}`}
      key={movie.id}
      className="modal modal-top lg:modal-middle"
    >
      <div className="modal-box p-0 w-full max-w-5xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-40">
            ✕
          </button>
        </form>
        <div>
          {loadedCanShow ? (
            <>
              <div style={{position: "relative"}}>
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
                <div style={{position: 'absolute', bottom: 0, right: 0}}>
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
