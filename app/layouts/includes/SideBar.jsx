'use client';
import Link from 'next/link';

const SideBar = () => {
    const menuItems = [
        { id: 1, name: 'Home', route: '/home', description: 'lorem inpsun' },
        { id: 2, name: 'Saved', route: '/login', description: 'lorem inpsun' },
        { id: 3, name: 'Electronics', route: '/', description: 'lorem inpsun' },
        { id: 4, name: 'Motors', route: '/', description: 'lorem inpsun' },
        { id: 5, name: 'Fashion', route: '/', description: 'lorem inpsun' },
        { id: 6, name: 'Sports', route: '/', description: 'lorem inpsun' },
    ];

    //overflow-y-scroll scrollbar-thin
    return (
        <>
            <aside className=" grid grid-cols-1max-w-[300px] h-screen ">
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
        </>
    );
};

export default SideBar;
