import { MOVIEDB } from "../server/tmdb";

export function providerListComma(data) {  
  let providers_arr = ''
  
  data?.map((provider: any) => {
    providers_arr = providers_arr
      ? providers_arr + "," + provider
      : provider;
  });

  return providers_arr;
}

export function convertCommantoL (data) {
  let providers_arr = ''
  
  data?.map((provider: any) => {
    providers_arr = providers_arr
      ? providers_arr + " | " + provider
      : provider;
  });

  return providers_arr;
}

export async function filterProviders(fixedProvider, data) {
  for(let [index, movie] of Object.entries(data)) {
    
    let selected_provider = await MOVIEDB.movieWatchProviders({ id: movie.id });

    let hasFlatValue =
      selected_provider &&
      selected_provider.results &&
      selected_provider.results.US &&
      selected_provider.results.US.flatrate

    if(hasFlatValue) {
      let matchProviders = hasFlatValue.filter((flat: any) => fixedProvider.find(prov => prov.provider_id === flat.provider_id))
      
      // Add a key and value for provider
      data[index] = {
        ...data[index],
        provider: matchProviders ? matchProviders : null
      };
    }
  }

  return data
}