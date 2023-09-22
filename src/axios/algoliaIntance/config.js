import axios from "axios";

const algoliaInstace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ALGOLIA_URL,
  timeout: 10000,
  headers: {
    "X-Algolia-Api-Key": process.env.NEXT_PUBLIC_SEARCH_API_KEY,
    "X-Algolia-Application-Id": process.env.NEXT_PUBLIC_APPLICATION_ID,
  },
});

const strapiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  timeout: 10000,
});

export { algoliaInstace, strapiInstance };
