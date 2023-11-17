"use client";

export default function Carousel(props: any) {
  // Event Handlers
  function hoverOvereHandler(e) {
    e.target.parentNode.parentNode.style.width = '30%'
  }

  function hoverLeaveHandler(e) {
    e.target.parentNode.parentNode.style.width = '25%'
  }

  function modalHandler(id: number) {

  }
  const { popular, imageURL } = props;

  return (
    <div className="carousel carousel-end w-full">
      {popular.map((data: any) => {
        return (
          <div
            key={data.title}
            id={data.id}
            className="carousel-item w-1/4"
          >
            <picture
              // onMouseOver={hoverOvereHandler}
              // onMouseLeave={hoverLeaveHandler}
            >
              <source srcSet={`${imageURL}/${data.poster_path}`} type="image" />
              <img src={`${imageURL}/${data.poster_path}`} alt={data.title} />
            </picture>
          </div>
        );
      })}
    </div>
  );
}
