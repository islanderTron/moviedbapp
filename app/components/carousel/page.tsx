"use client";

export default function Carousel(props: any) {
  const { data, imageURL } = props;

  return (
    <div className="carousel carousel-end w-full">
      {data.map((data: any) => {
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
