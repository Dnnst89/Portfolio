'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const SideBar = () => {
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
        { id: 51, name: 'Home', route: '/home', description: 'lorem inpsun' },
        { id: 99, name: 'Saved', route: '/login', description: 'lorem inpsun' },
        {
            id: 13,
            name: 'Electronics',
            route: '/',
            description: 'lorem inpsun',
        },
        { id: 14, name: 'Motors', route: '/', description: 'lorem inpsun' },
        { id: 15, name: 'Fashion', route: '/', description: 'lorem inpsun' },
        { id: 50, name: 'Home', route: '/home', description: 'lorem inpsun' },
        { id: 12, name: 'Saved', route: '/login', description: 'lorem inpsun' },
        {
            id: 16,
            name: 'Electronics',
            route: '/',
            description: 'lorem inpsun',
        },
        { id: 17, name: 'Motors', route: '/', description: 'lorem inpsun' },
        { id: 18, name: 'Fashion', route: '/', description: 'lorem inpsun' },
        { id: 30, name: 'Home', route: '/home', description: 'lorem inpsun' },
        { id: 19, name: 'Saved', route: '/login', description: 'lorem inpsun' },
        {
            id: 20,
            name: 'Electronics',
            route: '/',
            description: 'lorem inpsun',
        },
        { id: 21, name: 'Motors', route: '/', description: 'lorem inpsun' },
        { id: 22, name: 'Fashion', route: '/', description: 'lorem inpsun' },
    ];

    const [windowDimension, setwindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const detectSize = () => {
        setwindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };
    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => window.removeEventListener('resize', detectSize);
    }, [windowDimension]);
    return (
        <>
            {windowDimension.width >= 980 ? (
                <aside className="max-w-[300px] h-screen bg-white border-t-[1px] overflow-y-scroll scrollbar-thin">
                    <ul>
                        {menuItems.map((item) => (
                            <div key={item.id}>
                                <p className="px-3  cursor-pointer font-bold">
                                    {item.description}
                                </p>
                                <li className="hover:underline ml-8">
                                    <Link href={item.route}>{item.name}</Link>
                                </li>
                            </div>
                        ))}
                    </ul>
                </aside>
            ) : (
                ''
            )}
        </>
    );
};

export default SideBar;
