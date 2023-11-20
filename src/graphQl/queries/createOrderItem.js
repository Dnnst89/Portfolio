import { gql } from "@apollo/client";

const CREATE_ORDER_ITEM_MUTATION = gql`
mutation CreateOrderItem(
  $imagesIds: [ID],
  $quantity: Int!,
  $variantId: Int!,
  $price: Float!,
  $name: String!,
  $brand: String!,
  $cabys: Long!,
  $orderDetailId: ID!,
  $publishedAt: DateTime!,
  $features: JSON,
) {
  createOrderItem(
    data: {
      features: $features,
      quantity: $quantity,
      variantId: $variantId,
      price: $price,
      name: $name,
      brand: $brand,
      cabys: $cabys,
      images: $imagesIds,
      order_details: [$orderDetailId],
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
        cabys
        variantId
        features
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