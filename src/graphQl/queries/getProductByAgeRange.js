import { gql } from '@apollo/client';

const getProductByAgeRange = gql`
query GetByAge($initialAge: Float, $finalAge: Float, $page: Int!, $pageSize: Int!){
  products(filters:{ variants: {finalAge: {gte: $finalAge}, initialAge:{lte: $initialAge }}} pagination: { page: $page, pageSize: $pageSize }) {
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

export default getProductByAgeRange