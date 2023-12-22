import { useEffect, useState } from "react"
import Carousel from "../../carousel/page"
import Spin from "../../sping/page"
export default function Netflix({ imageURL, fixedProviders, showOrder }) {
	const [discoverData, setDiscoverData] = useState();

	useEffect(() => {
		getDiscoverData()
	}, [])

	async function getDiscoverData() {
		return fetch(`/api/tmdb/discover?providers=8&total=20&providerImages=true`, {
			method: 'POST',
			body: JSON.stringify(fixedProviders)
		})
			.then(async (res) => {
				const data = (await res.json()).discoverData
				setDiscoverData(data)
			})
	}

  return (
    <div>
        <div>
          <p className="text-2xl ml-5">Netflix</p>
        </div>

        {discoverData ? (
          <Carousel
						data={discoverData}
						imageURL={imageURL}
						fixedProviders={fixedProviders}
						showOrder={showOrder}
          />
        ) : (
          <Spin />
        )}
    </div> 
  )
}