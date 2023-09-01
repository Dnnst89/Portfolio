import Image from 'next/image';
import Link from 'next/link';
import { BsArrowDownShort } from 'react-icons/bs';
import { HiArrowSmRight } from 'react-icons/hi';
import GoProductBtn from './GoProductBtn';
import { img1 } from '../app/assets/images';
const product = [
    {
        id: 1,
        title: 'Brown Leather Bag',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
        url: { img1 },
        price: 2500,
        currency: 'USD',
    },
    {
        id: 2,
        title: 'School Books',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
        url: { img1 },
        price: 1900,
        currency: 'USD',
    },
];
const Product = () => {
    return (
        <>
            <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 w-full">
                {product.map((item) => (
                    <div key={item.id} className="shadow-lg p-5 m-2 rounded-md">
                        <div className="shadow-lg cursor-pointer">
                            <Image
                                src={item.url}
                                alt="Logo de la página"
                                width={100}
                                height={100}
                                priority
                            />
                        </div>

                        <div>
                            <div className="pt-2 px-1 ">
                                {' '}
                                <div className="font-semibold text-[15px]  cursor-pointer">
                                    {item.title}
                                </div>
                                <div className="font-extrabold">
                                    <span className="bg-aquamarine rounded-lg text-[12px] p-1 mr-1">
                                        {item.currency}
                                    </span>
                                    <span className="">{item.price}</span>
                                </div>
                                <div className="relative flex items-center text-[12px] text-gray-500 ">
                                    <div className="flex">
                                        <div className="line-through">
                                            {item.discount}
                                        </div>
                                        <div className="px-2">
                                            <BsArrowDownShort
                                                color="orange"
                                                size="20px"
                                            />
                                        </div>
                                        <div className="line-throught">
                                            {`${item.discount} % off`.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className=" ml-6 hover:text-lightblue">
                                        <GoProductBtn
                                            title={'mas detalles'}
                                            icon={<HiArrowSmRight size={20} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;
