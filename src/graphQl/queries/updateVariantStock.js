import { gql } from "@apollo/client";

const UPDATE_VARIANT_STOCK = gql`
  mutation updateVariantStock($id: ID!, $stock: Int!) {
    updateVariant(id: $id, data: { stock: $stock }) {
      data: data {
        id
      }
    }
  }
`;

export default UPDATE_VARIANT_STOCK;
