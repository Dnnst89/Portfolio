"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProfileUserCard({ image, alt, description, link }) {
  return (

    <div className="col-span-6 md:col-span-3 mt-3 mx-3">

      <div className="bg-resene w-[160px] md:w-full border-2 border-dashed border-grey-200 
      py-10 px-10 rounded-xl flex flex-col items-center transition-transform transform hover:scale-105 
      hover:bg-floralwhite">
        <Link href={link}>
          <Image
            src={image}
            alt={alt}
            style={{ width: "auto", height: "auto" }}
            className="max-h-[80px] md:max-h-[200px] m-auto"
          />

          <h1 className="whitespace-nowrap pt-5 text-base md:text-xl text-center hover:text-pink-200">
            {description}
          </h1>
        </Link>
      </div>
    </div>
  );
}
