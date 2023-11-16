import { gql } from "@apollo/client";

export const UPDATE_BASIC_ADDRESS = gql`
mutation updateAddress(
    $province: String!
    $addressLine1: String!
    $addressLine2: String
    $canton: String!
    $postCode: String
    $id: ID!
  ) {
    updateUsersAddress(
      id: $id
      data: {
        province: $province
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        canton: $canton
        postCode: $postCode
      }
    ) {
      data: data {
        id
      }
    }
  }
`;
