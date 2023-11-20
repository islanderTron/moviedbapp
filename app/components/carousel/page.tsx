"use client";
import Modal from "$app/components/modal/page";
import { useState } from "react";

export default function Carousel(props: any) {
  const { data, imageURL } = props;
  const [id, setID] = useState(null);

  function getID(id: any) {
    document.getElementById(id).showModal();
  }
  return (
    <div>
			<div>
				<dialog id={`${id}`} className="modal modal-bottom sm:modal-middle">
					<div className="modal-box">
						<h3 className="font-bold text-lg">{id}</h3>
						<p className="py-4">Press ESC key or click the button below to close</p>
						<div className="modal-action">
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn">Close</button>
							</form>
						</div>
					</div>
				</dialog>
			</div>

      <div className="carousel carousel-end w-full">
        {data.map((data: any) => {
          return (
            <div
              key={data.title}
              onClick={() => getID(data.id)}
              id={data.id}
              className="carousel-item w-1/4"
            >
              <picture>
                <source
                  srcSet={`${imageURL}/${data.poster_path}`}
                  type="image"
                />
                <img src={`${imageURL}/${data.poster_path}`} alt={data.title} />
              </picture>
            </div>
          );
        })}
      </div>
    </div>
  );
}
