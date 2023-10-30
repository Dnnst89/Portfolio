import { gql } from '@apollo/client';

export const CREATE_ORDER_EMAIL = gql`
mutation CreateOrderEmail($userName: String!, $email: String!, $orderNumber: Long!,$date: Date!, $totalProducts: Int!, $subtotal: Float!, $tax: Float!, $shipping: Float!, $total: Float!, $province: String!, $canton: String!, $addressLine1: String!, $products: JSON) {
    createOrderEmail(
      data: {
       userName:$userName,
       email: $email,
       orderNumber: $orderNumber,
       date:$date,
       totalProducts:$totalProducts,
       subtotal:$subtotal,
       tax:$tax,
       shipping: $shipping,
       total:$total,
       province: $province,
       canton: $canton,
       addressLine1:$addressLine1,
       products:$products
      }
    ) {
        data {
          id
        }
      }
    }
`;