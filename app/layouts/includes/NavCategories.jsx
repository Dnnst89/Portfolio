"use client";
import { useState,useEffect } from "react";
import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import Link from "next/link";


const NavCategories = () => {
  const [clickedItem, setClickedItem] = useState(null);

  const [menuItems, setMenuItems] = useState([])

const getData = async ()=> {
  const { data } = await algoliaInstace.get("development_api::category.category/")
    setMenuItems(data.hits)
}

	useEffect(() => {
    getData()

	}, [])

  const handleItemClick = (id) => {
    if (clickedItem === id) {
      // Si se hace clic nuevamente en el mismo elemento, deselecciona
      setClickedItem(null);
    } else {
      setClickedItem(id);
    }
  };

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

export default NavCategories;
// flex items-center text-[13px] text-[#333333] px-2 h-2 overflow-y-scroll scrollbar scrollbar-none
