import { gql } from "@apollo/client";
export const CREATE_ADDRESS = gql`
  mutation addAdress(
    $postCode: String!
    $country: String!
    $addressLine1: String!
    $addressLine2: String!
    $province: String!
    $latitude: Float!
    $longitude: Float!
    $canton: String!
    $publishedAt: DateTime!
    $id: ID!
  ) {
    createUsersAddress(
      data: {
        postCode: $postCode
        country: $country
        province: $province
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        longitude: $longitude
        latitude: $latitude
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
