'use client';
import React from "react";
import Link from "next/link";

import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { Autocomplete } from './Autocomplete';
import SearchItem from './SearchItem';
import "@algolia/autocomplete-theme-classic";


const APPLICATION_ID = '6TQCC8J5LB';
const SEARCH_API_KEY = '5a6490a15e1b2c9a3c53d7f8328c3f8d';
const ALGOLIA_INDEX = 'development_api::product.product';

const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = searchClient.initIndex(ALGOLIA_INDEX);

const Nav = ({ products }) => {
  return (
    <div>
      <nav className="uk-navbar-container px-2 sm:px-0" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
               
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-center">
          <Autocomplete
            openOnFocus={false}
            placeholder="Busca aquí lo que quieras..."
            getSources={({ query }) => [
              {
                sourceId: "articles",
               // getItemUrl( {item} ) { return `/article/${item.slug}`},
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: "development_api::product.product",
                        query,
                      }
                    ]
                  })
                },
                templates: {
                  item({ item, components}) {
                    return <SearchItem hit={item} components={components} />;
                  }
                }
              },
            ]}
          />
        </div>
        {/* <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {products ? products.map((result) => {
                const { key, href, name } = result
              return (
                <li key={category.id}>
                  <Link href={`/category/${category.attributes.slug}`}>
                    <a className="uk-link-reset">{name}</a>
                  </Link>
                </li>
              );
            }): null}
          </ul>
        </div> */}
      </nav>
    </div>
  );
};

export default Nav;