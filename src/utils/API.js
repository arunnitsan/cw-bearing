// Load Core of React.js and Next.js
import React from "react";

// Load Core Axios
import Axios from "axios";

// Create get method with draft mode support
const fetchData = async (url, isDraftMode = false) => {
  const config = {
    headers: {},
    // Add cache control for draft mode
    ...(isDraftMode && {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  };

  // Add draft mode headers if enabled
  if (isDraftMode) {
    config.headers['X-Draft-Mode'] = 'true';
    config.headers['X-Preview-Mode'] = 'true';
    config.headers['X-No-Cache'] = 'true';

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}_t=${timestamp}`;

    // Add any other draft-specific headers your CMS requires
    // For example, Contentful might use: config.headers['Authorization'] = `Bearer ${process.env.CONTENTFUL_PREVIEW_TOKEN}`;
    // For Strapi: config.headers['Authorization'] = `Bearer ${process.env.STRAPI_PREVIEW_TOKEN}`;
  }

  return await Axios.get(url, config)
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch((err) => ({
      error: true,
      data: null,
    }));
};

// Asyn Component
export async function getAPIData(url, isDraftMode = false) {
  const data = await fetchData(process.env.NEXT_PUBLIC_API_URL + url, isDraftMode);
  return data;
}

export default getAPIData;
