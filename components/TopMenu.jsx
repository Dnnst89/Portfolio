'use client';

import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Search from './Search';
const TopMenu = () => {
    return (
        <>
            <header className="grid grid-cols-3 bg-aquamarine">
                <div>Logo</div>
                <div>{<Search />}</div>
                <div>
                    <div>
                        <p>
                            Hola,{' '}
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
