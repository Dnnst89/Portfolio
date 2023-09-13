import React from "react";
import Link from "next/link";
import Image from "next/image";

function SearchItem({ hit, components }) {
  return (
    <Link href={`/detail/${hit.id}`}>
      <div className="hover:bg-blue-300 flex gap-4 p-4">
        <Image
          priority={true}
          width="50"
          height="50"
          src="https://didactoysperu.com/wp-content/uploads/2020/04/circuito-3-en-1.jpg"
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
