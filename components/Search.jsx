"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { Autocomplete } from "./Autocomplete";
import SearchItem from "./SearchItem";
import "@algolia/autocomplete-theme-classic";

const APPLICATION_ID = "6TQCC8J5LB";
const SEARCH_API_KEY = "5a6490a15e1b2c9a3c53d7f8328c3f8d";
const ALGOLIA_INDEX = "development_api::product.product";

const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = searchClient.initIndex(ALGOLIA_INDEX);

const Searchbar = () => {
  const onSubmit = (data) => {
    console.log(data.state.query);
    const query = data.state.query
    window.location.href = `/results/?query=${query}`
  };
  return (
    <div className="border border-lightblue rounded-[4px] focus:outline-none focus:ring-2  w-full">
      <Autocomplete
        placeholder="Busca aquí lo que quieras..."
        onSubmit={onSubmit}
        openOnFocus={false}
        getSources={({ query }) => [
          {
            sourceId: "products",
            getItemUrl({ item }) {
              return `/detail/?id=${item.id}`;
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "development_api::product.product",
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return <SearchItem hit={item} components={components} />;
              },
              footer() {
                return (
                  <Link href={{ pathname: "/results", query: { query } }}>
                    Ver todos los resultados
                  </Link>
                );
              },
              enterKeyHint: 'search', // Otra opción podría ser 'go'
            },
          },
        ]}
      />
    </div>
  );
};

export default Searchbar;
