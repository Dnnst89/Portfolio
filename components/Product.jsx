"use client";
import Image from 'next/image';


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

        </>
    );
};

export default Product;
