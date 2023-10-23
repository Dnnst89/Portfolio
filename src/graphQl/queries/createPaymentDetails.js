import { gql } from "@apollo/client";

const CREATE_PAYMENT_DETAIL = gql`
  mutation (
    $status: String
    $subTotal: Float
    $taxes: Float
    $total: Float
    $publishedAt: DateTime
  ) {
    createPaymentDetail(
      data: {
        status: $status
        subtotal: $subTotal
        taxes: $taxes
        total: $total
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          total
          status
          subtotal
          taxes
          publishedAt
        }
      }
    }
  }
`;
export default CREATE_PAYMENT_DETAIL;
