"use client";
import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import GiftIdeasCard from "@/components/GiftIdeasCard";
import heart from "../assets/heart.png";
import wood from "../assets/wood.png";
import brush from "../assets/brush.png";
import guitar from "../assets/guitar.png";
import libro from "../assets/libro.png";
import BodyComponent from "@/components/BodyComponent";
import FeaturedProducts from "@/components/FeaturedProducts";
import NavCategories from "@/app/layouts/includes/NavCategories";
import toast from "react-hot-toast";
const MainLayout = ({ children }) => {
  const name = "Juguete";
  const defaultPrice = 8900;
  const url = "/uploads/juguete4_36d71de373.jpg";

  return (
    <>
      <BodyComponent>
        <NavCategories />
        <div className="flex justify-center pt-10">
          <h1 className="text-lg">Top de productos</h1>
        </div>
        <div className="flex  justify-center pt-10">
          <FeaturedProducts />
        </div>
        <div className="flex justify-center mt-10 text-lg">
          <h1>Ideas de regalo para todas las edades</h1>
        </div>
        <div className="flex justify-center pt-10">
          <GiftIdeasCard
            ageRange={"1-2"}
            image={heart}
            age={"Menores de 2 años"}
            button={"bg-aquamarine rounded-lg text-white text-sm p-2"}
            border={
              "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-aquamarine"
            }
          />
          <GiftIdeasCard
            ageRange={"2-3"}
            image={wood}
            age={"De 2 a 3 años"}
            button={"bg-lightblue rounded-lg text-white text-sm p-2"}
            border={
              "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-lightblue"
            }
          />
          <GiftIdeasCard
            ageRange={"4-5"}
            image={brush}
            age={"De 4 a 5 años"}
            button={"bg-yellow-200 rounded-lg text-white text-sm p-2"}
            border={
              "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-yellow-200"
            }
          />
          <GiftIdeasCard
            ageRange={"6-7"}
            image={guitar}
            age={"De 6 a 7 años"}
            button={"bg-pink-200 rounded-lg text-white text-sm p-2"}
            border={
              "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-pink-200"
            }
          />
          <GiftIdeasCard
            ageRange={"8-9"}
            image={libro}
            age={"De 8 años o mas"}
            button={"bg-yellow-300 rounded-lg text-white text-sm p-2"}
            border={
              "w-[245px] h-[355px] bg-white rounded-[15px] transition-transform transform hover:scale-105 duration-1000 hover:cursor-pointer border-2 border-yellow-300"
            }
          />
        </div>
        <main className="bg-pink">{children}</main>
      </BodyComponent>
    </>
  );
};

export default MainLayout;
