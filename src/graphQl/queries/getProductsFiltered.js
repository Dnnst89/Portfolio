import { gql } from "@apollo/client";

const getProductsFiltered = gql`
query GetProductsFiltered($initialAge: Float, $finalAge: Float, $category: String, $page: Int!, $pageSize: Int!){
  products(filters:{ categories: {name: {containsi:$category}}, and:{variants: {finalAge: {gte: $initialAge},initialAge:{lte: $finalAge }}} } pagination: { page: $page, pageSize: $pageSize }) {
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

export default getProductsFiltered;
