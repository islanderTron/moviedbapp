export function providerListComma(data) {
  let providers_arr = ''
  
  data?.map((provider: any) => {
    providers_arr = providers_arr
      ? providers_arr + "," + provider.provider_id
      : provider.provider_id;
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