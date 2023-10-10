import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation password($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;
