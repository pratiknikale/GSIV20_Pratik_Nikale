import axios from "axios";

const API = axios.create({baseURL: "https://api.themoviedb.org/3/movie/"});
const API_key = "281555e798614b888c196b529765701e";

export const getUpcommingMovies = async (page) => {
  return await API.get(`upcoming?api_key=${API_key}&language=en-US&page=${page}`);
};

export const getMovieDetails = async (id) => {
  return await API.get(`${id}?api_key=${API_key}&language=en-US`);
};

export const getSimilarMovie = async (id, page) => {
  return await API.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_key}&language=en-US&page=${page}`
  );
};

export const SearchMovie = async (movie) => {
  return await API.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&language=en-US&query=${movie}&page=1&include_adult=false`
  );
};
