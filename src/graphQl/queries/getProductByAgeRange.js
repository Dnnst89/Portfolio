import { gql } from '@apollo/client';

const getProductByAgeRange = gql`
query getProductsByAgeRange($ageRange: String!, $page: Int!, $pageSize: Int!){
    variants(filters: {ageRange: {contains: $ageRange}} pagination: { page: $page, pageSize:$pageSize }){
      data{id
        attributes{
          color
          product{
            data{
              id
              attributes{
              name
              brand
              defaultPrice
              coverImage{data{attributes{url}}}
            }}
          }
        }
      }
      meta{
        pagination{
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }  
`;

export default getProductByAgeRange