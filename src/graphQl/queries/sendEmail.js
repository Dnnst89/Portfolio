import { gql } from '@apollo/client';

export const CREATE_ORDER_EMAIL = gql`

mutation CreateOrderEmail($date: Date!, $totalProducts: Int!, $order_detail: ID!, $currency: String!) {
  createOrderEmail(
    data: {
     date:$date,
     totalProducts:$totalProducts,
     order_detail: $order_detail,
     currency: $currency
    }
  ) {
      data {
        id,
      }
    }
  }
`;