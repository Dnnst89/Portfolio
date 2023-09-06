'use client';
import Image from 'next/image';
import Product from '../../../components/Product';
import productsData from '../../data/products.json'
const ProductContainer = ({ products }) => {
console.log(products)
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full">
        {products ? products.map((item) => {
          return (<Product
            key={item.key}
            name={item.name}
          />)
        }): null}
      </div>
    </>

  )
}
export default ProductContainer
