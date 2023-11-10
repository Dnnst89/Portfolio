import { gql } from '@apollo/client';

export const CREATE_ORDER_EMAIL = gql`

mutation CreateOrderEmail($date: Date!, $totalProducts: Int!, $order_detail: ID!) {
  createOrderEmail(
    data: {
     date:$date,
     totalProducts:$totalProducts,
     order_detail: $order_detail
    }
  ) {
      data {
        id,
      }
    }
  }
`;