import React from "react";
import Image from "next/image";

function ProductImage({ url, width, height, className }) {
  return (
    <Image
      priority={true}
      width={width}
      height={height}
      src={`${url}`}
      alt="tailwind logo"
      className={className}
    />
  );
}

export default ProductImage;
