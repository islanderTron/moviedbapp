import Carousel from "../../carousel/page"
import Spin from "../../sping/page"
export default function Discover({discovery, imageURL, genres, fixedProviders}) {
  return (
    <div>
      <div>
        <div>
          <p className="text-2xl">Discovery</p>
        </div>

        {discovery ? (
          <Carousel
            data={discovery}
            imageURL={imageURL}
            genres={genres}
            fixedProviders={fixedProviders}
          />
        ) : (
          <Spin />
        )}
      </div>
    </div> 
  )
}