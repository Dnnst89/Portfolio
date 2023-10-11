import { gql } from "@apollo/client";

export const UPDATE_ID_CARD = gql`
  mutation UPDATE_ID_CARD($id: ID!, $idNumber: Int!, $idType: String!) {
    updateUsersPermissionsUser(
      id: $id
      data: { idCard: { idNumber: $idNumber, idType: $idType } }
    ) {
      data: data {
        id
      }
    }
  }
`;
