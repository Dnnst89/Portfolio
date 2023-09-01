'use client';
import React from 'react';
import { useState, useEffect } from 'react';


const SearchProduct = ({ results }) => {
    console.log(results)

    return (
        <div>
            {/* {results === null ? null : (
                <div className="grid-cols-1 sm:grid md:grid-cols-3">

                    {results.map((result) => {
                        const { key, href, name } = result;

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

export default SearchProduct;