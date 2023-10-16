import { gql } from "@apollo/client";
export const UPDATE_ORDER = gql`
  mutation CreateOrderDetail(
    $order_Id: ID!
    $subTotal: Float
    $taxes: Float
    $total: Float
  ) {
    updateOrderDetail(
      id: $order_Id
      data: { subTotal: $subTotal, taxes: $taxes, total: $total }
    ) {
      data {
        id
        attributes {
          subTotal
          taxes
          total
        }
      }
    }
  }
`;
