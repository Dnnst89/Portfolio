import Link from 'next/link';

const Navbar = () => {
    const menuItems = [
        { id: 1, name: 'Home' },
        { id: 2, name: 'Saved' },
        { id: 3, name: 'Electronics' },
        { id: 4, name: 'Motors' },
        { id: 5, name: 'Fashion' },
        { id: 6, name: 'Collectables and Art' },
        { id: 7, name: 'Sports' },
        { id: 8, name: 'Health & Beauty' },
        { id: 9, name: 'Industrial Equipment' },
        { id: 10, name: 'Home & Garden' },
        { id: 11, name: 'Sell' },
    ];
    return (
        <div className="">
            <div className="flex items-center  w-full mx-auto  max-w-[1200px] py-5 ">
                <ul className="flex items-center text-[13px] text-[#333333] px-2 h-2">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className="px-3 hover:underline cursor-pointer font-bold"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
