import React from "react";
import Image from "next/image";

function ProductImage({ url, width, height, className, altText}) {
  return (
    <Image
      priority={true}
      width={width}
      height={height}
      src={`${url}`}
      alt={altText}
      className={className}

    />
  );
}

export default ProductImage;
