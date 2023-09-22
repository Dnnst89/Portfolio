import React from 'react'
import Image from "next/image";


const loaderImage = ({ src }) => {
    return `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337${src}`;
};

function ProductImage({ url, width, height, className }) {

    return (
        <Image
            loader={loaderImage}
            priority={true}
            width={width}
            height={height}
            src={url}
            alt="tailwind logo"
            className={className}
        />
    )
}

export default ProductImage