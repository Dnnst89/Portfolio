import { gql } from "@apollo/client";

const CREATE_PAYMENT_DETAIL = gql`
  mutation (
    $status: String
    $subTotal: Float
    $taxes: Float
    $total: Float
    $invoiceRequired: Boolean
    $publishedAt: DateTime
  ) {
    createPaymentDetail(
      data: {
        status: $status
        subtotal: $subTotal
        taxes: $taxes
        total: $total
        invoiceRequired: $invoiceRequired
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
          invoiceRequired
          publishedAt
        }
      }
    }
  }
`;
export default CREATE_PAYMENT_DETAIL;
