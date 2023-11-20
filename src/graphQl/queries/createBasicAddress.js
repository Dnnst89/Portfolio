import { gql } from "@apollo/client";

export const CREATE_BASIC_ADDRESS = gql`
  mutation addAdress(
    $country: String!
    $postCode: String!
    $addressLine1: String!
    $addressLine2: String
    $province: String!
    $canton: String!
    $publishedAt: DateTime!
    $id: ID!
  ) {
    createUsersAddress(
      data: {
        country: $country
        postCode: $postCode
        province: $province
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        user: $id
        canton: $canton
        publishedAt: $publishedAt
      }
    ) {
      data: data {
        id
      }
    }
  }
`;
