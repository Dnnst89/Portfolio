
import { gql } from "@apollo/client";

export const UPDATE_SHOPPING_SESSION_ACTIVE = gql`
mutation UpdateShoppingSession($id: ID!, $active: Boolean!) {
    updateShoppingSession(id: $id, data: { active: $active }) {
      data {
        id
        attributes {
          active
        }
      }
    }
  }
`;
