import { URL } from "./constans";
import useAxios from "../config/axios.config";

export async function getMovieDetail(payload) {
  let url = `${URL.GET_MOVIE_DETAIL}`;
  url = url.replace("[MOVIE]", payload.movie_id);
  const header = {
    contentType: "application/json",
  };
  const AXIOS = useAxios(header);
  return AXIOS.get(
    `${process.env.API_HOST}/${url}?api_key=${process.env.API_KEY}&language=en-US`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export async function markAsFavorite(payload) {
  let url = `${URL.MARK_AS_FAVORITE}`;
  url = url.replace("[ACCOUNT]", payload.account_id);
  const header = {
    contentType: "application/json",
  };
  const AXIOS = useAxios(header);
  return AXIOS.post(
    `${process.env.API_HOST}/${url}?api_key=${process.env.API_KEY}&session_id=${payload.session_id}`,
    payload.body
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export async function listFavoriteMovies(payload) {
  let url = `${URL.FAVORITE_MOVIES}`;
  url = url.replace("[ACCOUNT]", payload.account_id);
  const header = {
    contentType: "application/json",
  };
  const AXIOS = useAxios(header);
  return AXIOS.get(
    `${process.env.API_HOST}/${url}?api_key=${process.env.API_KEY}&language=en-US&sort_by=created_at.asc&page=${payload.page}&session_id=${payload.session_id}`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

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
