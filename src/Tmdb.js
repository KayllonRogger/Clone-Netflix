const api_key = "aa351e06f6a62609dd5d5c14a1a8877a";
const base_url = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${base_url}${endpoint}`);
  const json = await req.json();
  return json;
}

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais do Netflix",
        items: await basicFetch(`/trending/all/week?api_key=${api_key}&with_network=213&language=pt-BR`),
      },
      {
        slug: "trending",
        title: "Recomendados para você",
        items: await basicFetch(`/movie/popular?api_key=${api_key}&language=pt-BR`),
      },
      {
        slug: "toprated",
        title: "Em Alta",
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${api_key}&language=pt-BR`),
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(`/discover/movie?api_key=${api_key}&with_genres=28&language=pt-BR`),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(`/discover/movie?api_key=${api_key}&with_genres=35&language=pt-BR`),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(`/discover/movie?api_key=${api_key}&with_genres=27&language=pt-BR`),
      },
      {
        slug: "romance",
        title: "Romances",
        items: await basicFetch(`/discover/movie?api_key=${api_key}&with_genres=10749&language=pt-BR`),
      },
      {
        slug: "documentary",
        title: "Documentários",
        items: await basicFetch(`/discover/movie?api_key=${api_key}&with_genres=99&language=pt-BR`),
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if(movieId){
      switch(type){
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?api_key=${api_key}&language=pt-BR`)
          break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?api_key=${api_key}&language=pt-BR`)
          break;
        default:
          info = null;
          break;
      }
    }
    return info;
  }

};