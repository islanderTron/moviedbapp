"use client";

import * as dotenv from "dotenv";
dotenv.config();

import { useEffect, useState } from "react";

// Componemts
import Navbar from "./components/navbar/page";
import Spin from "./components/sping/page";

import Discover from "./components/main/discover/page";

// Helper
import { providerListComma } from "./helper";
import Trending from "./components/main/trending/page";

export default function Home() {
  const [providers, setProviders] = useState(null);
  const [fixedProviders, setFixedProviders] = useState(null);
  const [providerIDs, setProviderIDs] = useState();

  const [discovery, setDiscovery] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [isLoad, setLoad] = useState(true);
  const [genres, setGenres] = useState(null);
  const [trends, setTrends] = useState(null);

  // Lifecycle methods
  useEffect(() => {
    async function callAll() {
      return await Promise.all([
        await getImagePath(),
        await getProvidersData(),
        await getGenresData(),
      ]);
    }

    callAll();
  }, []);

  useEffect(() => {
    let list = providerListComma(providerIDs);

    if (providers) {
      getDiscovery(list);
      setLoad(false);
      // getTrendingData();
    }
  }, [providerIDs]);

  // HTTP methods
  async function getTrendingData() {
    return fetch(`/api/tmdb/trending`)
    .then((res: any) => res.json())
    .then((res: any) => setTrends(res.result.results))
  }
  async function getProvidersData() {
    return fetch("/api/tmdb/providers")
      .then((res) => res.json())
      .then((res) => {
        // There 2 states for Providers: one is for fixed and another is to use filteer to display the list of movies
        setFixedProviders(res.providers_list);
        // Add a key: isShow for each obj.
        let addEnable = res.providers_list.map(
          (prov: { [x: string]: any }, i: string | number) => {
            return (prov[i] = {
              ...prov,
              isEnable: true,
            });
          },
        );
        updateProvidersList(addEnable);
        setProviderIDs(addEnable.map((provider: any) => provider.provider_id));
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

  async function getDiscovery(providerIDs: string) {
    return fetch(`/api/tmdb/discover?providers=${providerIDs}`)
      .then((res) => res.json())
      .then((res) => {
        return setDiscovery(res.response.results);
      })
      .catch((err) => console.error(err));
  }

  function getImagePath() {
    return fetch("/api/tmdb/image_config")
      .then((res) => res.json())
      .then((res) => {
        setImageURL(res.url_path);
      });
  }

  async function getGenresData() {
    return fetch("/api/tmdb/genre")
      .then((res: any) => res.json())
      .then((res: any) => {
        setGenres(res.genres);
      });
  }

  const loadedCanShow = !isLoad && providerIDs;

  // Render methods
  return (
    <main>
      {loadedCanShow ? (
        <>
          <Navbar
            updateProvidersList={updateProvidersList}
            providers={providers}
            imageURL={imageURL}
          />
          {
            <Discover
              discovery={discovery}
              imageURL={imageURL}
              genres={genres}
              fixedProviders={fixedProviders}
            />
          }{
            // <Trending 
            // trends={trends} 
            // imageURL={imageURL}
            // genres={genres}
            // fixedProviders={fixedProviders}
            // />
          }
        </>
      ) : (
        <Spin h-screen={"h-screen"} />
      )}
    </main>
  );
}
