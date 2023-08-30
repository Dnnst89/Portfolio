'use client';

import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';
import Search from './Search';
import Image from 'next/image';
import { img2 } from '../app/assets/images';
const TopMenu = () => {
    return (
        <>
            <header className="grid grid-cols-3 grid-rows-1 gap-4 items-center h-[100px] bg-white">
                <div className="flex justify-start ml-10 ">
                    <div>
                        <Image
                            src={img2}
                            alt="Logo de la página"
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
                </div>

                <div>{<Search />}</div>
                <div className="flex w-full justify-between py-2 h-full">
                    <div className="ml-5 flex  items-center">
                        <span className="text-black hover:underline pr-1">
                            <Link href="/signin">Registrase</Link>{' '}
                        </span>{' '}
                        <span className="text-black hover:underline">
                            <Link href="/login">Ingresar</Link>{' '}
                        </span>{' '}
                    </div>
                    <div className="flex items-center mr-5 relative">
                        <BsCart4 size={30} />
                        <div className="absolute text-[12px] -top-[-15px] left-[8px] bg-yellow w-[18px] h-[18px] rounded-full text-dark ">
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
