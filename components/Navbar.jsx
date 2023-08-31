import Link from 'next/link';

const Navbar = () => {
    const menuItems = [
        { id: 1, name: 'Home', route: '/' },
        { id: 2, name: 'Saved', route: '/login' },
        { id: 3, name: 'Electronics', route: '/' },
        { id: 4, name: 'Motors', route: '/' },
        { id: 5, name: 'Fashion', route: '/' },
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
