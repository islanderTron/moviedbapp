"use client";
import * as dotenv from "dotenv";
dotenv.config();

import { useEffect, useState } from "react";

// Componemts
import Navbar from "$app/components/navbar/page";
import Trending from "$app/components/main/trending/page";
import Discover from "$app/components/main/discover/page";
import Netflix from "$app/components/main/netflix/page";
import Amazon from "@/app/components/main/amazon/page";

export default function Main() {
  const [providers, setProviders] = useState(null);
  const [fixedProviders, setFixedProviders] = useState(null);
  const [providerIDs, setProviderIDs] = useState();

  const [imageURL, setImageURL] = useState("");
  const [isLoad, setLoad] = useState(true);
  const [trends, setTrends] = useState();
	const [discoverData, setDiscoverData] = useState();


  // Lifecycle methods
  useEffect(() => {
    async function callAll() {
      return await Promise.all([
        await getImagePath(),
        await getProvidersData(),
        setLoad(false),
      ]);
    }

    callAll();
  }, []);


  // HTTP methods
  async function getProvidersData() {
    return fetch("/api/tmdb/providers", {
      method: "GET"
    })
      .then(async (res) => {
        const data = (await res.json()).providers_list;
        
        setFixedProviders(data);
        updateProvidersList(data);

        setProviderIDs(data.map((provider: any) => provider.provider_id));
        
      })
      .catch((error) => console.error(error));
  }

  async function updateProvidersList(list: any) {
    if (list) {
      let addEnable = list;
      setProviders(addEnable);

      let list_enable = addEnable.filter(
        (prov: { isEnable: boolean }) => prov.isEnable === true,
      );
      setProviderIDs(
        list_enable?.map((prov: { provider_id: any }) => prov.provider_id),
      );
    }
  }

  function getImagePath() {
    return fetch("/api/tmdb/image_config").then(async (res) => {
      const response = (await res.json()).url_path;
      setImageURL(response);
    });
  }

	async function getTrendingData() {
    return fetch(`/api/tmdb/trending?time_window=week&total=10&providerImages`, {
      method: "POST",
      body: JSON.stringify(fixedProviders),
    }).then(async (res: any) => {
      const data = (await res.json()).trending_data;
      setTrends(data);
    });
  }

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

	useEffect(() => {
		async function callAll() {
			await Promise.all([
				getTrendingData(),
				getDiscoverData()
			])
		}
		if(fixedProviders) {
			callAll();
		}
	}, [fixedProviders])
	
  const loadedCanShow = !isLoad;

  // Render methods
  return (
    <main>
      <Navbar
        // updateProvidersList={updateProvidersList}
        // providers={providers}
        // imageURL={imageURL}
      />
      {loadedCanShow && 
			<>
			{/* I think this is where need to use promise all for 4 requests to improve with performance - parallel data fetch  */}
        <Trending imageURL={imageURL} fixedProviders={fixedProviders} showOrder={true} />
        {/* <Discover imageURL={imageURL} fixedProviders={fixedProviders} showOrder={false} />
        <Netflix imageURL={imageURL} fixedProviders={fixedProviders} showOrder={false} />
        <Amazon imageURL={imageURL} fixedProviders={fixedProviders} showOrder={false} /> */}
			</>
      }
    </main>
  );
}
