"use client";
import { useState, useEffect } from "react";
import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavCategories = () => {
  const [clickedItem, setClickedItem] = useState(null);

  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const getData = async () => {
    const { data } = await algoliaInstace.get(
      "development_api::category.category/"
    );
    setMenuItems(data.hits);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleItemClick = (item) => {
    // if (clickedItem === id) {
    //   // Si se hace clic nuevamente en el mismo elemento, deselecciona
    //   setClickedItem(null);
    // } else {
    //   setClickedItem(id);
    // }
    console.log(window.location.pathname, "pathname");
    console.log(window.location.search, "search");

    return (window.location.href = `/results/?query=${item.name}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 h-[50px] mt-[0.5px] bg-resene">
        <ul className="flex md:justify-center content-center text-[#333333]  overflow-y-scroll scrollbar scrollbar-none">
          {menuItems &&
            menuItems.length &&
            menuItems.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className="px-3 hover:underline font-bold cursor-grab flex justify-center items-center"
                >
                  <button
                    id={index}
                    // href={{ pathname: "/results", query: { query: item.name } }}
                    onClick={() => {
                      handleItemClick(item);
                    }}
                    className="w-max"
                  >
                    {" "}
                    {item.name}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default NavCategories;
// flex items-center text-[13px] text-[#333333] px-2 h-2 overflow-y-scroll scrollbar scrollbar-none
