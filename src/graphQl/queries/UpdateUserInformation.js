import { gql } from "@apollo/client";

export const UPDATE_USER_INFORMATION = gql`
  mutation updateUserInformation(
    $firstName: String!
    $lastName: String!
    $phone: Int!
    $id: ID!
  ) {
    updateUsersPermissionsUser(
      id: $id
      data: { firstName: $firstName, lastName: $lastName, phoneNumber: $phone }
    ) {
      data: data {
        id
      }
    }
  }
`;
