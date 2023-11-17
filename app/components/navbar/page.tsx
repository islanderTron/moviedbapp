import { useEffect, useState } from "react";

export default function Navbar(props) {
	const { imageURL } = props;
	const [providers, setProviders] = useState(null);
	// Lifecycle 
	// useEffect(() => {
	// 	getProvidersData();
	// }, [])

	// HTTP Methods
	// function getProvidersData() {
	// 	return fetch('/api/tmdb/providers')
	// 		.then((res) => res.json())
	// 		.then((res) => {
	// 			setProviders(res.providers_list)
	// 		})
	// 		.catch(error => console.error(error))
	// }
	
	// console.log(providers);
	
	
  return (
    <div className="navbar bg-neutral text-neutral-content bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Movie Library</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          
        </button>
      </div>
    </div>
  );
}
