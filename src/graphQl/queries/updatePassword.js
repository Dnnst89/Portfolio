import { gql } from "@apollo/client";

export const UPDATE_PASSWORD = gql`
  mutation ResetPassword(
    $password: String!
    $passwordConfirmation: String!
    $code: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirmation: $passwordConfirmation
      code: $code
    ) {
      jwt
      user {
        id
        username
      }
    }
  }
`;
