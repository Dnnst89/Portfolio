import { gql } from "@apollo/client";

export const AddGiftInfo = gql`
  mutation AddGiftInfo($id: ID!, $desc: String!) {
    updatePaymentDetail(id: $id, data: { gift: { description: $desc } }) {
      data {
        id
      }
    }
  }
`;
