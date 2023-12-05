"use client";
import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {

  const [menuItems, setMenuItems] = useState([])

const getData = async ()=> {
  const { data } = await algoliaInstace.get("development_api::category.category/")
    setMenuItems(data.hits)
}

	useEffect(() => {
    getData()

	}, [])

  return (
    <>
      <div className="grid grid-cols-1 h-[50px] mt-[0.5px] bg-resene">
        <ul className="flex justify-center content-center text-[#333333]  overflow-y-scroll scrollbar scrollbar-none">
        
         
          {menuItems && menuItems.length && menuItems.map((item) => (
         <li
              key={item.id}
              className="px-3 hover:underline font-bold cursor-grab flex justify-center items-center"
            >
              <Link href={`/results/${item.name}`}> {item.name}</Link>;
              
            </li>
          ))}
        </ul>
      </div>
    </>
  );

};

export default Navbar;
