"use client";
import React from "react";
import Link from "next/link";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { Autocomplete } from "./Autocomplete";
import SearchItem from "./SearchItem";
import "@algolia/autocomplete-theme-classic";
import useStoreInformation from "../helpers/useStoreInformation";
import { useLocalCurrencyContext } from "@/src/context/useLocalCurrency";

const APPLICATION_ID = process.env.NEXT_PUBLIC_APPLICATION_ID;
const SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY;
const ALGOLIA_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = searchClient.initIndex(ALGOLIA_INDEX);


const Searchbar = () => {

  const { storeInformation, storeInformationError} = useStoreInformation(1);
  const currencySymbol = storeInformation?.storeInformation?.data?.attributes?.currencySymbol;
    // if true send LocalCurrencyPrice as price for products else send variant price
    const useLocalCurrency = useLocalCurrencyContext();

  const onSubmit = (data) => {
    if (data.state.query.trim() != "") {
      const query = data.state.query
      window.location.href = `/results/?query=${query}`
    }
  };
  console.log("getAlgoliaResults",getAlgoliaResults());
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
                    indexName: ALGOLIA_INDEX,
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
                {console.log("item",item)}
                return <SearchItem hit={item} currencySymbol={currencySymbol} useLocalCurrency = {useLocalCurrency}  components={components} />;
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
