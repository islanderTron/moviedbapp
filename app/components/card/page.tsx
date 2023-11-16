"use client";

export default function Card(props: any) {
  const { popular, imageURL } = props;

  return (
    <div>
      {popular.map((data: any) => {
        return (
          <div
            key={data.title}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <figure>
							<picture>
								<source 
									srcSet={`${imageURL}/${data.poster_path}`} 
									type='image'
								/>
								<img
									src={`${imageURL}/${data.poster_path}`}
									alt={data.title}
								/>
							</picture>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.title}</h2>
              <p>{data.overview}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
