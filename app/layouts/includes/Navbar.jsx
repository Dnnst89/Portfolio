import Link from 'next/link';

const Navbar = () => {
    const menuItems = [
        { id: 1, name: 'Home', route: '/' },
        { id: 2, name: 'Saved', route: '/login' },
        { id: 3, name: 'Electronics', route: '/' },
        { id: 4, name: 'Motors', route: '/' },
        { id: 5, name: 'Fashion', route: '/' },
        { id: 6, name: 'Home', route: '/' },
        { id: 7, name: 'Saved', route: '/login' },
        { id: 8, name: 'Electronics', route: '/' },
        { id: 9, name: 'Motors', route: '/' },
        { id: 10, name: 'Fashion', route: '/' },
    ];
    return (
        <>
            <div className="grid grid-cols-1 h-[50px] mt-[0.5px] bg-resene">
                <ul className="flex justify-center content-center text-[#333333]  overflow-y-scroll scrollbar scrollbar-none">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className="px-3 hover:underline font-bold cursor-grab flex justify-center items-center"
                        >
                            <Link href={item.route}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
// flex items-center text-[13px] text-[#333333] px-2 h-2 overflow-y-scroll scrollbar scrollbar-none
