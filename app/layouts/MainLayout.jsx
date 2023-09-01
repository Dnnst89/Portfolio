'use client';

import Navbar from '@/app/layouts/includes/Navbar';
import TopMenu from '@/app/layouts/includes/TopMenu';
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
