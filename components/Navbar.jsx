import Link from 'next/link';

const Navbar = () => {
    const menuItems = [
        { id: 1, name: 'Home', route: '/' },
        { id: 2, name: 'Saved', route: '/login' },
        { id: 3, name: 'Electronics', route: '/' },
        { id: 4, name: 'Motors', route: '/' },
        { id: 5, name: 'Fashion', route: '/' },
        { id: 6, name: 'Collectables and Art', route: '/' },
        { id: 7, name: 'Sports', route: '/' },
        { id: 8, name: 'Health & Beauty', route: '/' },
        { id: 9, name: 'Industrial Equipment', route: '/' },
        { id: 10, name: 'Home & Garden', route: '/' },
        { id: 11, name: 'Sell', route: '/' },
    ];
    return (
        <div className="bg-floralwhite shadow-sm">
            <div className="flex items-center  w-full mx-auto  max-w-[1200px] py-5 ">
                <ul className="flex items-center text-[13px] text-[#333333] px-2 h-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className="px-3 hover:underline cursor-pointer font-bold"
                        >
                            <Link href={item.route}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
