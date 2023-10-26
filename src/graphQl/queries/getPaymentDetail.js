import { gql } from "@apollo/client";
export const GET_PAYMENT_DETAIL = gql`
query GetPaymentDetail($paymentId: ID!) {
    paymentDetail(id: $paymentId) {
        data{
          attributes{
            invoiceRequired
            status
            order_detail{
              data{
                id
              }
            }
          }
        }
      }
    }
`;
