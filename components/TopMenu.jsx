'use client';

import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';
import Search from './Search';
import Image from 'next/image';
import { img2 } from '../app/assets/images';
const TopMenu = () => {
    return (
        <>
            <header className="grid grid-cols-3 h-full w-full sm:grid-cols-8">
                <div className=" grid sm:col-span-1 col-span-1 order-1 justify-center content-center ">
                    logo
                </div>

                <div className="grid justify-center content-center  sm:col-span-6 col-span-3 order-3 sm:order-2">
                    {<Search />}
                </div>
                <div className=" grid grid-cols-2 sm:col-span-1 col-span-2 order-2 ">
                    <div className=" grid justify-center content-center  text-sm ml-6 bg-orange">
                        <span className="">
                            <Link href="/signin">Regístrate</Link>{' '}
                        </span>{' '}
                        <span className="">
                            <Link href="/login">Mi cuenta</Link>{' '}
                        </span>{' '}
                    </div>
                    <div className=" grid justify-center content-center">
                        <BsCart4 size={30} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default TopMenu;
