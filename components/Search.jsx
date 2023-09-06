'use client';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { BsArrowDownShort } from 'react-icons/bs';
import { HiArrowSmRight } from 'react-icons/hi';
import GoProductBtn from './GoProductBtn';
import styles from '../styles/Home.module.css'
import ProductContainer from '@/app/layouts/includes/ProductContainer';
import Navbar from '@/app/layouts/includes/Navbar';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

const APPLICATION_ID = '6TQCC8J5LB';
const SEARCH_API_KEY = '5a6490a15e1b2c9a3c53d7f8328c3f8d';
const ALGOLIA_INDEX = 'development_api::product.product';

const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = searchClient.initIndex(ALGOLIA_INDEX);

function Hit({ hit }) {
    return (
      <article>
        <h1>{hit.name}</h1>
      </article>
    );
  }

const Search = () => {
    // return (
    //     <div>
    //     <InstantSearch searchClient={searchClient} indexName="development_api::product.product">
    //         <SearchBox />
    //         <Hits hitComponent={Hit} />
    //     </InstantSearch>
    //     </div>
    // )

    const [results, setResults] = useState(null);

    const performSearch = async (value) => {
        const { hits } = await index.search(value, {
           
        });

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
        value === '' ? setResults(null) : performSearch(value);
    };

    return (
        <div>
            <form className={styles.search}>
                <input placeholder='Busca aquí lo que quieras...' onChange={handleChange} type='search' />
            </form>
            <div className='py-20'>
            <ProductContainer products={results}/>
            </div>
            {/* {results === null ? null : (
                <div className="grid-cols-1 sm:grid md:grid-cols-3">

                    {results.map((result) => {
                        const { key, href, name } = result;
                            console.log(results)
                        return (
                            <div className="w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <img className="p-8 rounded-t-lg" src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg" alt="product image" />
                                </a>
                                <div className="px-5 pb-5">
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white" dangerouslySetInnerHTML={{
                                            __html: name,
                                        }}></h5>
                                    </a>

                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                    </div>
                                </div>
                            </div>

                        );
                    })}

                </div>
            )} */}
        </div>
    );
};

export default Search;
