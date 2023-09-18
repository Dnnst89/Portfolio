"use client";

import { BsCart4 } from "react-icons/bs";
import { img2 } from "../../assets/images";
import Image from "next/image";
import AccountDropodown from "@/components/AccountDropodown";
import Searchbar from "@/components/Search";
import Link from "next/link";
import { useSelector } from "react-redux";

const NavMenu = () => {
  const { cartQtyItems } = useSelector(state => state.cart) //obtengo la cantidad de items que tengo en carrito
  return (
    <header className="grid grid-cols-2 sm:grid-cols-6">
      <div className="flex justify-center items-center mt-[15px] order-1 col-span-1 sm:col-span-1  h-[60px]">
        <Link href={"/"}>
          <Image src={img2} alt="dfskdk" width={120} height={50} />
        </Link>
      </div>

      <div className="py-5 items-center order-3 sm:order-2 col-span-2 sm:col-span-4 h-[60px]">
        {<Searchbar />}
      </div>
      <div className="grid grid-cols-2 justify-center items-center  order-2 sm:order-3 col-span-1 sm:col-span-1">
        <div className="">
          <span className=" flex justify-center items-center ">
            <AccountDropodown />
          </span>
        </div>
        <Link href={"/cart"}>
          <div className="flex justify-center items-center ">
            <BsCart4 size={30} color="#67C3AD" />
            <p className='bg-aquamarine rounded-full px-2 text-white'>{cartQtyItems}</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default NavMenu;
