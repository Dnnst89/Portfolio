'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowDownShort } from 'react-icons/bs';
import { img9, img10, img11, img12, img13 } from '../app/assets/images';
const products = [
    {
        id: 1,
        title: 'Brown Leather Bag',
        description: `Lorem ipsum dolor sit amet`,
        url: 'http://picsum.photos/id/7',
        price: 2500,
        currency: 'USD',
    },
    {
        id: 2,
        title: 'School Books',
        description: `Lorem ipsum dolor sit amet`,
        url: 'http://picsum.photos/id/20',
        price: 1900,
        currency: 'USD',
    },
];
const Product = ({ product }) => {
    return (
        <>
            <div className="grid grid-cols-5">
                <div>
                    <Image
                        src={img9}
                        alt="Logo de la página"
                        width={'100%'}
                        height={'100%'}
                        priority
                    />
                </div>
                <div>
                    <Image
                        src={img10}
                        alt="Logo de la página"
                        width={'100%'}
                        height={'100%'}
                        priority
                    />
                    <h1>precio</h1>
                    <p>caracteristicas</p>
                </div>
                <div>
                    <Image
                        src={img11}
                        alt="Logo de la página"
                        width={'100%'}
                        height={'100%'}
                        priority
                    />
                </div>
                <div>
                    <Image
                        src={img12}
                        alt="Logo de la página"
                        width={'100%'}
                        height={'100%'}
                        priority
                    />
                </div>
                <div>
                    <Image
                        src={img13}
                        alt="Logo de la página"
                        width={'100%'}
                        height={'100%'}
                        priority
                    />
                </div>
            </div>
        </>
    );
};

export default Product;
