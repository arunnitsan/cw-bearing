// Load Core of React.js and Next.js
import React from "react";

// Load Core Axios
import Axios from "axios";

// Create get method
const fetchData = async (url) =>
  await Axios.get(url)
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch((err) => ({
      error: true,
      data: null,
    }));

// Asyn Component
export async function getAPIData(url) {
  const data = await fetchData(process.env.NEXT_PUBLIC_API_URL + url);
  return data;
}

export default getAPIData;
