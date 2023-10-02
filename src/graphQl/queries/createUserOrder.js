import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrderDetail($input: OrderDetailCreateInput!) {
    createOrderDetail(input: $input) {
      orderDetail {
        id
        total
        status
      }
    }
  }
`;
