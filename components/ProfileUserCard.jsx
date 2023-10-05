"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProfileUserCard({ image, alt, description, link }) {
  return (
    <div>
      <div className="bg-resene w-6/6  m-10 border-2 border-dashed border-grey-200 p-10 rounded-xl flex flex-col items-center">
        <Image
          src={image}
          alt={alt}
          style={{ width: "130px", height: "150px" }}
          className=""
        />
        <Link href={link}>
          <h1 className="whitespace-nowrap  pt-5 text-xl hover:text-pink-200">
            {description}
          </h1>
        </Link>
      </div>
    </div>
  );
}
