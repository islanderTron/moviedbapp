import { useEffect, useState } from "react";

export default function Navbar(props: any) {
  const { providers, imageURL } = props;
	
  // Lifecycle

  // HTTP Methods

  // Render Methods
  function providerList() {
    if (providers) {
      return (
        <div className="flex">
          {providers.map((provider: any) => {
            return (
              <div className="shrink w-12 m-2" key={provider.provider_id}>
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
              </div>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Movie Library</a>
        {providerList()}
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost"></button>
      </div>
    </div>
  );
}
