import React from "react";
import Link from "next/link";
import Image from "next/image";
const loader = ({ src }) => {
  return `http://localhost:1337${src}`;
};

function SearchItem({ hit, components }) {
  const {coverImage} = hit
  let primero = coverImage[0];
  const {url} = primero
  console.log(url)
  return (
    <Link href={`/detail/${hit.id}`}>
      <div className="hover:bg-blue-300 flex gap-4 p-4">
        <Image
          loader={loader}
          priority={true}
          width="100"
          height="100"
          src={url}
          alt="tailwind logo"
          className="rounded-xl object-contain"
        />
        <div>
          <h3 className="text-sm font-semibold">{hit.name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default SearchItem;
