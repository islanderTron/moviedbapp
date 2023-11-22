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

export function filterGenres(movie_genres: any, genres: any) { 
  let name_genres: any = [];

  genres.filter((genre: any) => {
    if(movie_genres.includes(genre.id)) {
      name_genres.push(genre.name)
      // console.log(genre.name);      
    }
  })
  
  return name_genres
}