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
      return Promise.reject(error.response);
    }
  );

  return AXIOS;
}
