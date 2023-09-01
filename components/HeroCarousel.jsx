'use client';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { img9, img10, img11 } from '@/app/assets/images';
import { img50 } from '../app/assets/img1.jpg';
import Image from 'next/image';
const HeroCarousel = () => {
    return (
        <>
            <div className="max-w-[1200px] mx-auto h-[300px] w-full relative">
                <Carousel
                    showArrows={true}
                    autoPlay={true}
                    interval={5000}
                    infiniteLoop={true}
                    showThumbs={false}
                    width="100%"
                >
                    <div className="">
                        <Image
                            src={img10}
                            alt="dfskdk"
                            placeholder="blur"
                            width={1356}
                            height={832}
                        />
                    </div>
                    <div className="">
                        <Image
                            src={img9}
                            alt="dfskdk"
                            placeholder="blur"
                            width={1356}
                            height={832}
                        />
                    </div>
                    <div className="">
                        <Image
                            src={img11}
                            alt="dfskdk"
                            placeholder="blur"
                            width={1356}
                            height={832}
                        />
                    </div>
                </Carousel>
            </div>
        </>
    );
};

export default HeroCarousel;
