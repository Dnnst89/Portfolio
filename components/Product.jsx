'use client';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowSmRight } from 'react-icons/hi';
import GoProductBtn from './GoProductBtn';

const Product = ({ id,name, brand, url,price }) => {
    return (
        <>

<div className="bg-white rounded-lg  p-4 m-4">
<div className="w-full h-56 mb-2 relative">
        <Image src={url} alt={name} layout="fill" fill />
        </div>
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="mt-2">
        <span className="text-green-600 font-semibold">${price}</span>
        <span className="ml-2 text-gray-600">{brand}</span>
        
      </div>
      <button className="bg-black hover:bg-blue-600 text-aquamarine font-semibold py-2 px-4 rounded">
        Detalles
      </button>
    </div>




{/* 


                    <div key={id} className="shadow-lg p-5 m-2 rounded-md">
                        <div className="shadow-lg cursor-pointer">
                            <Image
                                src={url}
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
                                    {name}
                                </div>
                                <div className="font-extrabold">
                                   
                                    <span className="">{price}</span>
                                </div>
                                <div className="relative flex items-center text-[12px] text-gray-500 ">
                                    <div className="flex">
                                            {brand}
                                    </div>
                                    <div className=" ml-6 hover:text-lightblue">
                                        <GoProductBtn
                                            name={'mas detalles'}
                                            icon={<HiArrowSmRight size={20} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            */}
        </>
    );
};

export default Product;
