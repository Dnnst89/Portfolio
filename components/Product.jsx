'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowDownShort } from 'react-icons/bs';
import { HiArrowSmRight } from 'react-icons/hi';
import GoProductBtn from './GoProductBtn';
const products = [
    {
        id: 1,
        title: 'Brown Leather Bag',
        discount: 20,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 2500,
        currency: 'USD',
    },
    {
        id: 2,
        title: 'School Books',
        discount: 25,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 1900,
        currency: 'USD',
    },
    {
        id: 3,
        title: 'Brown Leather Bag',
        discount: 20,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 2500,
        currency: 'USD',
    },
    {
        id: 4,
        title: 'School Books',
        discount: 25,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 1900,
        currency: 'USD',
    },
    {
        id: 5,
        title: 'Brown Leather Bag',
        discount: 20,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 2500,
        currency: 'USD',
    },
    {
        id: 6,
        title: 'School Books',
        discount: 25,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 1900,
        currency: 'USD',
    },
    {
        id: 7,
        title: 'Brown Leather Bag',
        discount: 20,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 2500,
        currency: 'USD',
    },
    {
        id: 8,
        title: 'School Books',
        discount: 25,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 1900,
        currency: 'USD',
    },
    {
        id: 9,
        title: 'School Books',
        discount: 25,
        url: 'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80',
        price: 1900,
        currency: 'USD',
    },
];
const Product = ({ product }) => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full">
                {products.map((item) => (
                    <div key={item.id} className="shadow-lg p-5 m-2 rounded-md">
                        <div className="shadow-lg cursor-pointer">
                            <Image
                                src={item.url}
                                alt="Logo de la página"
                                width={400}
                                height={400}
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
