'use client';

import React from 'react';

import TopMenu from '../layouts/includes/TopMenu';
import Navbar from '../layouts/includes/Navbar';

import Cart from './page';
const CartLayout = ({ children }) => {
    return (
        <>
            <div className="">
                <TopMenu />
                <Navbar />
              
            </div>

            <main >{children}</main>
            <Cart/>
        </>
    );
};

export default CartLayout;
