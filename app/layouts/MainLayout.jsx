'use client';


import Product from '@/components/Product';
import ProductContainer from '@/components/ProductContainer';

import ToogleSideBar from '@/components/ToogleSideBar';
import React from 'react';
import Navbar from './includes/Navbar';
import TopMenu from './includes/TopMenu';
import SideBar from './includes/SideBar';

const MainLayour = ({ children }) => {
    return (
        <>
            <div className="">
                <TopMenu />
                <Navbar />
            </div>

            <main className="bg-pink">{children}</main>
            <SideBar />
            <ProductContainer/>
            <div>footer</div>
        </>
    );
};

export default MainLayour;
