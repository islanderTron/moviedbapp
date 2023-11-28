"use client";

import * as dotenv from "dotenv";
dotenv.config();

import { useEffect, useState } from "react";

// Componemts
import Navbar from "./components/navbar/page";
import Video from "./components/video/page";
import Card from "./components/card/page";
import Carousel from "./components/carousel/page";

// Helper
import { providerListComma } from "./helper";

export default function Home() {
  const [popular, setPopular] = useState(null);
  const [providers, setProviders] = useState(null);
  const [discovery, setDiscovery] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [isLoad, setLoad] = useState(true);
  const [providerIDs, setProviderIDs] = useState();

  // Lifecycle methods
  useEffect(() => {
    let list = providerListComma(providerIDs);

    getDiscovery(list);
    setLoad(false);
  }, [providerIDs]);

  useEffect(() => {
    getImagePath();
    getProvidersData();
  }, []);

  // HTTP methods
  async function getProvidersData() {
    return fetch("/api/tmdb/providers")
      .then((res) => res.json())
      .then((res) => {
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
          <div>
            <div>
              <div className="">
                <p className="text-2xl">Discovery</p>
              </div>

              {discovery && <Carousel data={discovery} imageURL={imageURL} />}
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </main>
  );
}
