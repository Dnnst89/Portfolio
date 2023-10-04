"use client";
import Image from "next/image";
import Link from "next/link";

const loader = ({ src }) => {
    return `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337${src}`;
};

const AgeProductCard = ({ id, name, defaultPrice, coverImage, brand }) => {
    return (
        <Link href={`/detail/${id}`}>
            <div className="m-4 max-w-sm rounded-[15px] shadow-lg w-[300px] h-[450px] transition-transform transform hover:scale-105 hover:bg-resene duration-1000 hover:cursor-pointer">
                <div className="w-[280px] h-[280px] mx-auto p-1">
                    <div href="#">
                        <Image
                            loader={loader}
                            priority={true}
                            width="600"
                            height="500"
                            src={
                                coverImage
                                    ? coverImage.attributes.url
                                    : "/uploads/large_undefined_0cd8bc924a.png"
                            }
                            alt="tailwind logo"
                            className="rounded-[15px]"
                        />
                    </div>
                </div>

                <div className="px-5 pb-5">
                    <h5
                        className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                        dangerouslySetInnerHTML={{
                            __html: name,
                        }}
                    ></h5>

                    <div className="pt-3 rounded-lg">
                        <h2 className="flex justify-end p-3 relative">
                            <div href="#" className=" text-sm ">
                                {brand}
                            </div>
                        </h2>
                    </div>
                </div>

                <div className="bg-aquamarine w-100 h-[15.6%] text-lg rounded-b-[15px] font-bold flex justify-center absolute bottom-0 left-0 right-0">
                    <button className="hover:underline text-white">
                        ₡ {defaultPrice}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default AgeProductCard;