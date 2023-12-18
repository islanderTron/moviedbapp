export default function Navbar({ updateProvidersList, providers, imageURL }) {
  // Lifecycle

  // Event Methods
  function updateProviders(e: {
    target: { parentNode: { parentNode: { id: string } } };
  }) {
    let selected_id: number = parseInt(e.target.parentNode.parentNode.id);
    let filter_pro = providers;

    // 1. Change the boolean depends on the condition
    let selected_obj = filter_pro.filter(
      (prov: any) => prov.provider_id === selected_id,
    )[0];
    selected_obj.isEnable
      ? (selected_obj.isEnable = false)
      : (selected_obj.isEnable = true);

    // 2. Replace the selected object
    filter_pro = filter_pro.filter(
      (provider: { provider_id: any }) =>
        provider.provider_id !== selected_obj.provider_id,
    );

    filter_pro.push(selected_obj); // add the new object

    updateProvidersList(filter_pro);
  }
  async function onClick(e: any) {
    changeBackground(e);
    updateProviders(e);
  }

  // Render Methods
  function changeBackground(e: {
    target: {
      parentNode: {
        parentNode: { style: { background: string; opacity: number } };
      };
    };
  }) {
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
        name: "Netflix",
        img_path: "logos/netflix.jpg",
        provider_id: 8,
      },
      {
        name: "Amazon Prime Video",
        img_path: "logos/amazon_prime_video.jpg",
        provider_id: 9,
      },
      {
        name: "Apple TV Plus",
        img_path: "logos/apple_tv_plus.jpg",
        provider_id: 350,
      },
      {
        name: "Hulu",
        img_path: "logos/hulu.jpg",
        provider_id: 15,
      },
      {
        name: "HBO Max",
        img_path: "logos/max.jpg",
        provider_id: 384,
      },
      {
        name: "Paramount Plus",
        img_path: "logos/paramount.jpg",
        provider_id: 531,
      },
    ];

    return (
      <div className="flex">
        {static_providers.map((provider: any, index: number) => {
          return (
            <button
              className="hover:bg-sky-700 shrink w-11 p-1 m-2 mask mask-circle"
              id={provider.provider_id}
              key={index}
              onClick={onClick}
            >
              <picture>
                <source srcSet={`${provider.logo_path}`} type="image" />
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
        <a className="btn btn-ghost text-xl">Movie Search Library </a>
        {/* {providerList()} */}
      </div>
    </div>
  );
}
