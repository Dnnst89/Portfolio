import { gql } from "@apollo/client";

export const ADD_WRAPPED_GIFTS_LIST = gql`
  mutation UpdateGift($id: ID!, $gift: String!) {
    updatePaymentDetail(id: $id, data: { gift: $gift }) {
      data {
        attributes {
          gift
        }
      }
    }
  }
`;
