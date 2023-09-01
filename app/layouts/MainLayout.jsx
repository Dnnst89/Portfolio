'use client';

import Navbar from '@/components/Navbar';
import Product from '@/components/Product';
import ProductContainer from '@/components/ProductContainer';
import SideBar from '@/components/SideBar';
import ToogleSideBar from '@/components/ToogleSideBar';
import TopMenu from '@/components/TopMenu';
import React from 'react';
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
            <div>footer</div>
        </>
    );
};

export default MainLayour;
