'use client'
import React from 'react';
import { useState } from 'react'
import algoliasearch from 'algoliasearch/lite';
import styles from '../styles/Home.module.css'

const APPLICATION_ID = '6TQCC8J5LB'
const SEARCH_API_KEY = '5a6490a15e1b2c9a3c53d7f8328c3f8d'
const ALGOLIA_INDEX = 'development_api::product.product'

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX)

const Search = () => {

    const [results, setResults] = useState(null)

    const performSearch = async (value) => {
        const { hits } = await index.search(value, {
            hitsPerPage: 5
        })

        const results = hits.map(hit => {
            const { objectID: key, href, _highlightResult } = hit
            const { name: { value: name } } = _highlightResult
            return { key, href, name }
        })

        setResults(results)
    }

    const handleChange = (e) => {
        const { value } = e.target

        value === ''
            ? setResults(null)
            : performSearch(value)
    }

    return (
        <div >
            <form className={styles.search}>
                <input placeholder='Busca aquí lo que quieras...' onChange={handleChange} type='search' />

            </form>
            {results === null
                ? null
                : <div className="ais-Hits">
                    <ul className={styles.results}>
                        {results.map(result => {
                            const { key, href, name } = result

                            return (
                                <li key={key}>
                                    <a href={href}>
                                        <h3 dangerouslySetInnerHTML={{ __html: name }} />
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    );
};

export default Search;