export default function Card(props: any) {
  const { popular, imageURL } = props;

  return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
			<div className="card-body">
				<h2 className="card-title">
					Shoes!
					<div className="badge badge-secondary">NEW</div>
				</h2>
				<p>If a dog chews shoes whose shoes does he choose?</p>
				<div className="card-actions justify-end">
					<div className="badge badge-outline">Fashion</div> 
					<div className="badge badge-outline">Products</div>
				</div>
			</div>
		</div>
    // <div>
    //   {popular.map((data: any) => {
    //     <div classNameName="card w-96 bg-base-100 shadow-xl">
    //       <figure>
    //         <picture>
    //           <source srcSet={`${imageURL}/${data.poster_path}`} type="image" />
    //           <img src={`${imageURL}/${data.poster_path}`} alt={data.title} />
    //         </picture>
    //       </figure>
    //       <div classNameName="card-body">
    //         <h2 classNameName="card-title">
    //           Shoes!
    //           <div classNameName="badge badge-secondary">NEW</div>
    //         </h2>
    //         <p>If a dog chews shoes whose shoes does he choose?</p>
    //         <div classNameName="card-actions justify-end">
    //           <div classNameName="badge badge-outline">Fashion</div>
    //           <div classNameName="badge badge-outline">Products</div>
    //         </div>
    //       </div>
    //     </div>;
    //   })}
    // </div>
  );
}
