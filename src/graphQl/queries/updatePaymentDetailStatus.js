
import { gql } from "@apollo/client";

export const UPDATE_PAYMENT_DETAIL_STATUS = gql`
mutation UpdatePaymentDetail($id: ID!, $newStatus: String!) {
    updatePaymentDetail(id: $id, data: { status: $newStatus }) {
      data {
        id
        attributes {
          status
        }
      }
    }
  }

`;
