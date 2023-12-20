import { useEffect, useState } from "react"
import Carousel from "../../carousel/page"
import Spin from "../../sping/page"
export default function Discover({ imageURL, fixedProviders, showOrder }) {
	const [discoverData, setDiscoverData] = useState();

	useEffect(() => {
		getDiscoverData()
	}, [])

	async function getDiscoverData() {
		return fetch(`/api/tmdb/discover?providers=8|9|15|350|384|531&total=20&providerImages=true`, {
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
          <p className="text-2xl">Movie Services</p>
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