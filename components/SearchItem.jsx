import React from "react";
import Link from "next/link";
import Image from "next/image";

function SearchItem({ hit, components }) {
  return (
    <Link href={{ pathname: "/detail", query: { id: hit.id } }}>
      <div className="hover:bg-blue-300 flex gap-4 p-4">
        <Image
          priority={true}
          width="100"
          height="100"
          src={
            hit.coverImage
              ? `${hit.coverImage.url}`
              : `https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/undefined_76582dee58.png`
          }
          alt="undefined"
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
