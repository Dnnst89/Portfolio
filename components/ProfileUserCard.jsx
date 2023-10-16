"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProfileUserCard({ image, alt, description, link }) {
  return (
    
    <div className="">
      
      <div className="bg-resene w-6/6  m-10 border-2 border-dashed border-grey-200 p-10 rounded-xl flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-floralwhite ">
      <Link href={link}>
        <Image
          src={image}
          alt={alt}
          style={{ width: "130px", height: "150px" }}
          className=""
        />
        
          <h1 className="whitespace-nowrap  pt-5 text-xl text-center hover:text-pink-200">
            {description}
          </h1>
          </Link>
      </div>
    </div>
  );
}
