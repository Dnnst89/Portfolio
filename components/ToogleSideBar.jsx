'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import { Disclosure } from '@headlessui/react';
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaRegComments } from 'react-icons/fa';
import { BiMessageSquareDots } from 'react-icons/bi';
import Image from 'next/image';
import { img1 } from '../app/assets/images.js';
const ToogleSideBar = () => {
    const menuItems = [
        { id: 1, name: 'Home', route: '/home', description: 'lorem inpsun' },
        { id: 2, name: 'Saved', route: '/login', description: 'lorem inpsun' },
        { id: 3, name: 'Electronics', route: '/', description: 'lorem inpsun' },
        { id: 4, name: 'Motors', route: '/', description: 'lorem inpsun' },
        { id: 5, name: 'Fashion', route: '/', description: 'lorem inpsun' },
        {
            id: 6,
            name: 'Collectables and Art',
            route: '/',
            description: 'lorem inpsun',
        },
        { id: 7, name: 'Sports', route: '/', description: 'lorem inpsun' },
        {
            id: 8,
            name: 'Health & Beauty',
            route: '/',
            description: 'lorem inpsun',
        },
        {
            id: 9,
            name: 'Industrial Equipment',
            route: '/',
            description: 'lorem inpsun',
        },
        {
            id: 10,
            name: 'Home & Garden',
            route: '/',
            description: 'lorem inpsun',
        },
        { id: 11, name: 'Sell', route: '/', description: 'lorem inpsun' },
    ];
    return (
        <div className="lg:invisible">
            <Disclosure as="nav">
                <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-black  group">
                    <GiHamburgerMenu
                        className="block sm:hidden h-6 w-6"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex justify-center items-center">
                        <Image
                            src={img1}
                            alt="Logo de la página"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center item-center">
                        <div className=" my-4 border-b border-gray-100 pb-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black ">
                                    Dashboard
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <CgProfile className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black  ">
                                    Profile
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <FaRegComments className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black  ">
                                    Comments
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black ">
                                    Analytics
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black  ">
                                    Messages
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black  ">
                                    Integration
                                </h3>
                            </div>
                        </div>
                        {/* setting  */}
                        <div className=" my-4 border-b border-gray-100 pb-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black  ">
                                    Settings
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black  ">
                                    More
                                </h3>
                            </div>
                        </div>
                        {/* logout */}
                        <div className=" my-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-black " />
                                <h3 className="text-base text-gray-800 group-hover:text-black font-semibold ">
                                    Logout
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
};

export default ToogleSideBar;
