'use client';

import Product from '@/components/ProductCard';
import ProductContainer from '@/app/layouts/includes/ProductContainer';

import ToogleSideBar from '@/components/ToogleSideBar';
import React from 'react';
import Navbar from './includes/Navbar';
import TopMenu from './includes/TopMenu';
import SideBar from './includes/SideBar';
import { useQuery } from '@apollo/client';

const MainLayour = ({ children }) => {
    return (
        <>
            <div className="">
                <TopMenu />
                <Navbar />
            </div>

            <main className="bg-pink">{children}</main>

            <div>foot</div>
        </>
    );
};

export default MainLayour;
