import { useEffect, useState } from "react";

export default function Navbar(props: any) {
  const { providers, imageURL } = props;
  const [providerIDS, setProviderIDs] = useState([]);
  const [test, setTest] = useState(0);
  // Lifecycle
  useEffect(() => {
    if (providers)
      setProviderIDs(providers.map((provider: any) => provider.provider_id));
    console.log(providerIDS);
  }, [providers]);

  // Event Methods
  function onClick(e) {
    // 1) Change the color after click a button
    let domState = e.target.parentNode.parentNode.style.background;
    let selected_id: number = parseInt(e.target.parentNode.parentNode.id);
    // let selected_index = providerIDS.indexOf(selected_id);
    // console.log(providerIDS.splice(selected_index, 1));
    

    // image -> pic -> button
    if (domState === "") {
      e.target.parentNode.parentNode.style.background = "gray";
      e.target.parentNode.parentNode.style.opacity = 0.49;
      // setProviderIDs(providerIDS.filter(id => id !== selected_id));
      setTest(selected_id)
      
    } else {
      e.target.parentNode.parentNode.style.background = "";
      e.target.parentNode.parentNode.style.opacity = 1;
      setTest(0)
    }
    console.log(test);
    

    // 	https://tailwindcss.com/docs/background-color

    // 2) Update the providers - add or remove ID

    // 3) Then call endpoint - discover with updated state
  }

  function updateProviderIDs(id) {
    providerIDS.slice()
  }

  // HTTP Methods

  // Render Methods
  function providerList() {
    if (providers) {
      return (
        <div className="flex">
          {providers.map((provider: any) => {
            return (
              <button
                className="hover:bg-sky-700 shrink w-11 p-1 m-2 mask mask-circle"
                id={provider.provider_id}
                key={provider.provider_id}
                onClick={onClick}
              >
                <picture>
                  <source
                    srcSet={`${imageURL}/${provider.logo_path}`}
                    type="image"
                  />
                  <img
                    className="mask mask-circle"
                    src={`${imageURL}/${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                </picture>
              </button>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="navbar">
      <div className="grid sm:grid-row-1 grid-rows-1">
        <a className="btn btn-ghost text-xl">Streaming App Movies </a>
        {providerList()}
      </div>
      {/* <div className="flex-none">
        <button className="btn btn-square btn-ghost"></button>
      </div> */}
    </div>
  );
}
