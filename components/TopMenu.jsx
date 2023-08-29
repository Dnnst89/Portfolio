'use client';

import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Search from './Search';
const TopMenu = () => {
    return (
        <>
            <header className="grid grid-cols-3 bg-aquamarine items-center h-12">
                <div>Logo</div>
                <div>{<Search />}</div>
                <div className="flex  bg-pink w-full justify-between py-2 h-full">
                    <div>
                        <p>
                            <span className="text-white font-bold hover:underline">
                                {' '}
                                <Link href="/login">iniciar sesión</Link>{' '}
                            </span>{' '}
                        </p>
                    </div>
                    <div>
                        <AiOutlineShoppingCart size={25} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default TopMenu;
