"use client";
import * as dotenv from "dotenv";
dotenv.config();

import { useEffect, useState } from "react";

// Componemts
import Navbar from "$app/components/navbar/page";
import Trending from "$app/components/main/trending/page";

export default function Main() {
  const [providers, setProviders] = useState(null);
  const [fixedProviders, setFixedProviders] = useState(null);
  const [providerIDs, setProviderIDs] = useState();

  const [imageURL, setImageURL] = useState("");
  const [isLoad, setLoad] = useState(true);

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

  const loadedCanShow = !isLoad;

  // Render methods
  return (
    <main>
      <Navbar
        updateProvidersList={updateProvidersList}
        providers={providers}
        imageURL={imageURL}
      />
      {loadedCanShow && 
        <Trending imageURL={imageURL} fixedProviders={fixedProviders} showOrder={true} />
      }
    </main>
  );
}
