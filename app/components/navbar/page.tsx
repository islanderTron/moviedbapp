
export default function Navbar({ updateProvidersList, providers, imageURL }) {
  // Lifecycle

  // Event Methods
  function updateProviders(e) {
    let selected_id: number = parseInt(e.target.parentNode.parentNode.id);

    let filter = providers.filter(
      (provider: any) => provider.provider_id !== selected_id,
    );
    updateProvidersList(filter);
  }
  async function onClick(e) {
    changeBackground(e);
    // updateProviders(e);
  }

  // HTTP Methods

  // Render Methods
  function changeBackground(e) {
    // image -> pic -> button
    // Maniplative the DOM and state
    let domState = e.target.parentNode.parentNode.style.background;

    if (domState === "") {
      e.target.parentNode.parentNode.style.background = "gray";
      e.target.parentNode.parentNode.style.opacity = 0.49;
    } else {
      e.target.parentNode.parentNode.style.background = "";
      e.target.parentNode.parentNode.style.opacity = 1;
    }
  }

  // Need to update only DOM - right now, this render update both DOM & Provider State
  function providerList() {
    let static_providers = [
      {
        name: 'Amazon Prime Video',
        img_path: 'logos/amazon_prime_video.jpg'
      },
      {
        name: 'Apple TV Plus',
        img_path: 'logos/apple_tv_plus.jpg'
      },
      {
        name: 'Hulu',
        img_path: 'logos/hulu.jpg'
      },
      {
        name: 'HBO Max',
        img_path: 'logos/max.jpg'
      },
      {
        name: 'Netflix',
        img_path: 'logos/netflix.jpg'
      },
      {
        name: 'Paramount Plus',
        img_path: 'logos/paramount.jpg'
      },
    ];

    let add_ids = [];
    for(const [key, value] of Object.entries(providers)) {
      static_providers.map((provider: any) =>  {
        (provider.name === value.provider_name)
      })
    }

    return (
      <div className="flex">
        {static_providers.map((provider: any) => {
          return (
            <button
              className="hover:bg-sky-700 shrink w-11 p-1 m-2 mask mask-circle"
              id={provider.provider_id}
              key={provider.provider_id}
              onClick={onClick}
            >
              <picture>
                <source
                  srcSet={`${provider.logo_path}`}
                  type="image"
                />
                <img
                  className="mask mask-circle"
                  src={`${provider.img_path}`}
                  alt={provider.provider_name}
                />
              </picture>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="grid sm:grid-row-1 grid-rows-1">
        <a className="btn btn-ghost text-xl">Streaming App Movies </a>
        {providerList()}
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost"></button>
      </div>
    </div>
  );
}
