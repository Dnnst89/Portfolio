'use client';

import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';
import Search from './Search';
import Image from 'next/image';
import { img2 } from '../app/assets/images';
const TopMenu = () => {
    return (
        <>
            <header className="grid grid-cols-3 grid-rows-2 gap-4 items-center h-[100px] mt-10">
                <div className="flex justify-start ml-10 ">
                    <div>
                        <Image
                            src={img2}
                            alt="Logo de la página"
                            width={150}
                            height={150}
                            priority
                        />
                    </div>
                </div>

                <div>{<Search />}</div>
                <div className="flex w-full justify-between py-2 h-full">
                    <div className="ml-5">
                        <span className="text-white hover:underline pr-1">
                            <Link href="/signin">Registrase</Link>{' '}
                        </span>{' '}
                        <span className="text-white hover:underline">
                            <Link href="/login">Ingresar</Link>{' '}
                        </span>{' '}
                    </div>
                    <div className="mr-5 relative">
                        <BsCart4 size={30} />
                        <div className="absolute text-[10px] -top-[7px] left-[8px] bg-yellow w-[14px] h-[14px] rounded-full text-white">
                            <div className="flex items-center justify-center -mt-[1px] ">
                                3
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default TopMenu;
