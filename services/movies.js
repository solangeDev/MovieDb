import { URL } from "./constans";
import useAxios from "../config/axios.config";

export async function listNowPlaying(payload) {
  const header = {
    contentType: "application/json",
  };
  const AXIOS = useAxios(header);
  return AXIOS.get(
    `${process.env.API_HOST}/${URL.NOW_PLAYING}?api_key=${process.env.API_KEY}&page=${payload.page}`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export async function listTopMovies(payload) {
  const header = {
    contentType: "application/json",
  };
  const AXIOS = useAxios(header);
  return AXIOS.get(
    `${process.env.API_HOST}/${URL.TOP_MOVIES}?api_key=${process.env.API_KEY}&page=${payload.page}`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export async function listPopularMovies(payload) {
  const header = {
    contentType: "application/json",
  };
  const AXIOS = useAxios(header);
  return AXIOS.get(
    `${process.env.API_HOST}/${URL.POPULAR_MOVIES}?api_key=${process.env.API_KEY}&page=${payload.page}`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
