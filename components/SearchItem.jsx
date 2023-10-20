import React from "react";
import Link from "next/link";
import Image from "next/image";

function SearchItem({ hit, components }) {
  return (
    <div className="border-b-2 border-dashed border-grey-200 w-full">
      <Link href={{ pathname: "/detail", query: { id: hit.id } }}>
        <div className="hover:bg-blue-300 flex gap-4 p-4 items-center">
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
          <div className="grid items-center">
            <div>
              <h2 className="text-sm font-semibold">{hit.name}</h2>
              </div>
              <div>
              <h3 className="text-sm font-base text-[7px] md:text-xs  text-[#757575]">{hit.brand}</h3>
            </div>
          </div>

          <div className="flex-1">
          <p className="text-xl font-semibold text-right">${hit.defaultPrice}</p>
          </div>

        </div>
      </Link>
    </div>


  );
}

export default SearchItem;
