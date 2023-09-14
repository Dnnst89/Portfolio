"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {

  const [menuItems, setMenuItems] = useState([])

	useEffect(() => {
		fetch(
      `https://6tqcc8j5lb.algolia.net/1/indexes/development_api::category.category/`,
      {
        headers: {
          "X-Algolia-Api-Key": "5a6490a15e1b2c9a3c53d7f8328c3f8d",
          "X-Algolia-Application-Id": "6TQCC8J5LB",
        },
      }
    )
		.then(response => response.json())
		.then(datos => {
			setMenuItems(datos.hits)
		})
	}, [])
/*
  const menuItems = [
    { id: 1, name: "Home", route: "/" },
    { id: 2, name: "Saved", route: "/login" },
    { id: 3, name: "Electronics", route: "/" },
    { id: 4, name: "Motors", route: "/" },
    { id: 5, name: "Fashion", route: "/" },
    { id: 6, name: "Home", route: "/" },
    { id: 7, name: "Saved", route: "/login" },
    { id: 8, name: "Electronics", route: "/" },
    { id: 9, name: "Motors", route: "/" },
    { id: 10, name: "Fashion", route: "/" },
  ];
  */
  return (
    <>
      <div className="grid grid-cols-1 h-[50px] mt-[0.5px] bg-resene">
        <ul className="flex justify-center content-center text-[#333333]  overflow-y-scroll scrollbar scrollbar-none">
        
         
          {menuItems && menuItems.length && menuItems.map((item) => (
         <li
              key={item.id}
              className="px-3 hover:underline font-bold cursor-grab flex justify-center items-center"
            >
              <Link href={"#"}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
  
};

export default Navbar;
