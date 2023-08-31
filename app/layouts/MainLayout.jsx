'use client';

import Navbar from '@/components/Navbar';
import Product from '@/components/Product';
import SideBar from '@/components/SideBar';
import TopMenu from '@/components/TopMenu';
import React from 'react';

const MainLayour = () => {
    return (
        <main>
            <div className=" grid grid-cols-1">
                <div className="h-[150px]  sm:h-[80px] ">
                    <TopMenu />
                </div>
                <div className="bg-black h-10  text-white">
                    <Navbar />
                </div>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-5">
                <div className=" h-full hidden sm:block ">
                    <SideBar />
                </div>
                <div className="col-span-4 h-full">
                    <Product />
                </div>
            </div>
        </main>
    );
};

export default MainLayour;
