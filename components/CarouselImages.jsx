
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Asegúrate de importar los estilos


function CarouselImages({ images, widthImg, heightImg, classStyle }) {
    return (
        <Carousel className={"col-span-6"} showArrows={true} showThumbs={false} showStatus={false}>
            {images.map((img, index) => (
                <div key={index}>
                    <div>
                        <Image
                            key={img.id}
                            src={"http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337" + img}
                            alt={img}
                            style={{ width: `${widthImg}px`, height: `${heightImg}px` }}
                            width={widthImg} // Establecer el ancho
                            height={heightImg} // Establecer el alto
                            className={classStyle}
                        />
                    </div>
                </div>
            ))}
        </Carousel>
    );
}
export default CarouselImages