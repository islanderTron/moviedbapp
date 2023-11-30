import Carousel from "../../carousel/page";
import Spin from "../../sping/page";

export default function Trending({ trends, imageURL, genres, fixedProviders }) {
  return (
    <div>
      <div>
        <div>
          <p className="text-2xl">Trending</p>
        </div>

        {trends ? (
          <Carousel
            data={trends}
            imageURL={imageURL}
            genres={genres}
            fixedProviders={fixedProviders}
          />
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
