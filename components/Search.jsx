"use client";
import React from "react";
import { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import styles from "../styles/Home.module.css";
import ProductContainer from "@/app/layouts/includes/ProductContainer";

const id = process.env.NEXT_PUBLIC_APPLICATION_ID;
const key = process.env.NEXT_PUBLIC_SEARCH_API_KEY;
const indexAlgolia = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

const searchClient = algoliasearch(id, key);
const index = searchClient.initIndex(indexAlgolia);

index.search('query', {
    page: 0,
  }).then(({ hits }) => {
    console.log(hits);
  });

const Search = () => {
  const [results, setResults] = useState(null);

  const performSearch = async (value) => {
    const { hits } = await index.search(value, {});

    const results = hits.map((hit) => {
      const { objectID: key, href, _highlightResult } = hit;
      const {
        name: { value: name },
      } = _highlightResult;
      return { key, href, name };
    });

    setResults(results);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    value === "" ? setResults(null) : performSearch(value);
  };

  return (
    <div>
      <form className={styles.search}>
        <input
          placeholder="Busca aquí lo que quieras..."
          onChange={handleChange}
          type="search"
        />
      </form>
      <div className="py-20">
        <ProductContainer products={results} />
      </div>
    </div>
  );
};

export default Search;
