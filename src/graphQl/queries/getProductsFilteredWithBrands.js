import { gql } from "@apollo/client";

const getProductsFilteredWithBrands = gql`
query GetProductsFiltered(
    $initialAge: Float
    $finalAge: Float
    $minPrice: Float
    $maxPrice: Float
    $category: String
    $brands : [String!]!
    $page: Int!
    $pageSize: Int!
  ) {
    products(
        filters: {
            categories: { name: { containsi: $category } }
            and: {
                variants: {
                    finalAge: { gte: $initialAge }
                    initialAge: { lte: $finalAge }
                    price: { gte: $minPrice, lte: $maxPrice }
                }
            }
            brand: { in: $brands }
        }
        pagination: { page: $page, pageSize: $pageSize }
    ) {
        data {
            id
            attributes {
                name
                brand
                defaultPrice
                variants {
                    data {
                        attributes {
                            initialAge
                            finalAge
                            price
                        }
                    }
                }
                coverImage {
                    data {
                        attributes {
                            url
                        }
                    }
                }
            }
        }
        meta {
            pagination {
                total
                pageCount
            }
        }
    }
  }
`;

export default getProductsFilteredWithBrands;
