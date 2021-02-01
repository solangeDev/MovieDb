import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function useAxios(props) {
  const AXIOS = axios.create({
    baseURL: `${process.env.API_HOST}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: props.token ? props.token : "",
    },
    timeout: 100000,
  });

  AXIOS.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error, "aqui");
      /*const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;*/
      /*if (status === 401) {
        return AXIOS.get('/auth/refresh-token', { headers: headers() })
          .then(res => {
            sessionStorage.setItem('GeoToken', res.data.geoToken);
            originalRequest.headers['Authorization'] =
              'Bearer ' + res.data.geoToken;
            return axios(originalRequest);
          })
          .catch(error => {
            Promise.reject(error);
          });
      }
      if (status === 403) {
        window.location.href = '/';
        return Promise.reject(error);
      }*/
      return Promise.reject(error.response);
    }
  );

  return AXIOS;
}
