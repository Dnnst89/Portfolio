"use client";
import React from "react";
import Link from "next/link";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { Autocomplete } from "./Autocomplete";
import SearchItem from "./SearchItem";
import "@algolia/autocomplete-theme-classic";
import useStoreInformation from "../helpers/useStoreInformation";

const APPLICATION_ID = "DGPT78XWPO";
const SEARCH_API_KEY = "b609a499a2da96e45f662b177464f423";
const ALGOLIA_INDEX = "development_api::product.product";

const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = searchClient.initIndex(ALGOLIA_INDEX);

const Searchbar = () => {

  const { storeInformation, storeInformationError} = useStoreInformation(1);
  const currency = storeInformation?.storeInformation?.data?.attributes?.currency;

  const onSubmit = (data) => {
    if (data.state.query.trim() != "") {
      const query = data.state.query
      window.location.href = `/results/?query=${query}`
    }
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
                return <SearchItem hit={item} currency={currency} components={components} />;
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
