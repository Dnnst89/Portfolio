"use client";
import Image from "next/image";

const loader = ({ src }) => {
  return `https://didactoysperu.com/wp-content/uploads/2020/04/${src}`;
};

const Product = ({ key, name }) => {

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 " key={key}>
        <a href="#">
          <Image
            loader={loader}
            priority={true}
            width="240"
            height="240"
            src="circuito-3-en-1.jpg"
            alt="tailwind logo"
            className="p-8 rounded-t-lg"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5
              className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
              dangerouslySetInnerHTML={{
                __html: name,
              }}
            ></h5>
          </a>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              $599
            </span>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </a>
          </div>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Ver Detalle
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
