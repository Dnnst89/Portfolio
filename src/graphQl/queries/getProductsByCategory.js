import { gql } from '@apollo/client';

const ProductsByCategory = gql`
query GetByCategory($category:String){
    products(filters:{ categories: {name: {eq: $category}}}) {
     data{
      id
      attributes{
        name
        brand
        defaultPrice
        coverImage{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
    meta{
      pagination {
        total
        pageCount
      }
     }
    }
   }
`;

export default ProductsByCategory;