import { gql } from "@apollo/client";

export const UPDATE_ID_CARD = gql`
  mutation updateIdCard($id: ID!, $idNumber: Long!, $idType: String!) {
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
