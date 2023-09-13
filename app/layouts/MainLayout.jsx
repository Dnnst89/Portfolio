// 'use client';

// import Product from '@/components/ProductCard';
// import ProductContainer from '@/app/layouts/includes/ProductContainer';

// import ToogleSideBar from '@/components/ToogleSideBar';
// import React from 'react';
// import Navbar from './includes/Navbar';
// import TopMenu from './includes/TopMenu';
// import SideBar from './includes/SideBar';
// import { useQuery } from '@apollo/client';

// const MainLayour = ({ children }) => {
//     return (
//         <>
//             <div className="">
//                 <TopMenu />
//                 <Navbar />
//             </div>

//             <main className="bg-pink">{children}</main>

//             <div>foot</div>
//         </>
//     );
// };

// export default MainLayour;

"use client";

import Product from "@/components/ProductCard";
import ProductContainer from "@/app/layouts/includes/ProductContainer";

import ToogleSideBar from "@/components/ToogleSideBar";
import React from "react";
import NavCategories from "./includes/NavCategories";
import NavMenu from "./includes/NavMenu";
import SideBar from "./includes/SideBar";
import { useQuery } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import GiftIdeasCard from "@/components/GiftIdeasCard";
import heart from "../assets/heart.png";
import wood from "../assets/wood.png";
import brush from "../assets/brush.png";
import guitar from "../assets/guitar.png";
import libro from "../assets/libro.png";

const MainLayour = ({ children }) => {
  return (
    <>
      <div className="flex justify-center pt-10">
        <h1 className="text-lg">Top de productos</h1>
      </div>
      <div className="flex  justify-center pt-10">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="flex justify-center mt-10 text-lg">
        <h1>Ideas de regalo para todas las edades</h1>
      </div>
      <div className="flex justify-center pt-10">
        <GiftIdeasCard
          image={heart}
          age={"Menores de 2 años"}
          button={"bg-aquamarine rounded-lg text-white text-sm p-2"}
          border={
            "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-aquamarine"
          }
        />
        <GiftIdeasCard
          image={wood}
          age={"De 2 a 3 años"}
          button={"bg-lightblue rounded-lg text-white text-sm p-2"}
          border={
            "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-lightblue"
          }
        />
        <GiftIdeasCard
          image={brush}
          age={"De 4 a 5 años"}
          button={"bg-yellow-200 rounded-lg text-white text-sm p-2"}
          border={
            "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-yellow-200"
          }
        />
        <GiftIdeasCard
          image={guitar}
          age={"De 6 a 7 años"}
          button={"bg-pink-200 rounded-lg text-white text-sm p-2"}
          border={
            "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-pink-200"
          }
        />
        <GiftIdeasCard
          image={libro}
          age={"De 8 años o mas"}
          button={"bg-yellow-300 rounded-lg text-white text-sm p-2"}
          border={
            "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-yellow-300"
          }
        />
      </div>
      <main className="bg-pink">{children}</main>
    </>
  );
};

export default MainLayour;
