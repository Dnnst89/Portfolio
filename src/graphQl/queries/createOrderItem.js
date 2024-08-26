import { gql } from "@apollo/client";

const CREATE_ORDER_ITEM_MUTATION = gql`
mutation CreateOrderItem(
  $imagesIds: [ID],
  $quantity: Int!,
  $variantId: Int!,
  $price: Float!,
  $totalPrice: Float!,
  $ivaAmount: Float!,
  $name: String!,
  $brand: String,
  $cabys: Long!,
  $orderDetailId: ID!,
  $currency: String!,
  $publishedAt: DateTime!,
  $features: JSON,
) {
  createOrderItem(
    data: {
      features: $features,
      quantity: $quantity,
      variantId: $variantId,
      price: $price,
      totalPrice: $totalPrice,
      ivaAmount: $ivaAmount,
      name: $name,
      brand: $brand,
      cabys: $cabys,
      images: $imagesIds,
      order_details: [$orderDetailId],
      currency: $currency
      publishedAt: $publishedAt,
    }
  ) {
    data {
      id
      attributes {
        quantity
        name
        brand
        price
        totalPrice
        ivaAmount
        cabys
        variantId
        features
        currency
        images {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}

`;

export default CREATE_ORDER_ITEM_MUTATION