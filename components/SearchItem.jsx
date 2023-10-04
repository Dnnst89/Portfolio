import React from "react";
import Link from "next/link";
import Image from "next/image";
const loader = ({ src }) => {
  return `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337${src}`;
};

function SearchItem({ hit, components }) {

  return (
    <Link href={`/detail/${hit.id}`}>
      <div className="hover:bg-blue-300 flex gap-4 p-4">
        <Image
          loader={loader}
          priority={true}
          width="100"
          height="100"
          src={hit.coverImage ? hit.coverImage.url : '/uploads/large_undefined_0cd8bc924a.png'}
          alt="/uploads/large_undefined_0cd8bc924a.png"
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
