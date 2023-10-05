import React from "react";
import Image from "next/image";

const baseURL = "http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337";

function ProductImage({ url, width, height, className }) {
  return (
    <Image
      priority={true}
      width={width}
      height={height}
      src={`${baseURL}${url}`}
      alt="tailwind logo"
      className={className}
    />
  );
}

export default ProductImage;
