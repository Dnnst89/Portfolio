import React from "react";
import Link from "next/link";
import Image from "next/image";
const loader = ({ src }) => {
  return `https://didactoysperu.com/wp-content/uploads/2020/04/${src}`;
};
function SearchItem({ hit, components }) {
  return (
    <Link href={`/detail/${hit.id}`}>
      <div className="hover:bg-blue-300 flex gap-4 p-4">
        <Image
          loader={loader}
          priority={true}
          width="240"
          height="240"
          src="circuito-3-en-1.jpg"
          alt="tailwind logo"
          className="rounded-xl"
        />
        <div>
          <h3 className="text-sm font-semibold">{hit.name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default SearchItem;
