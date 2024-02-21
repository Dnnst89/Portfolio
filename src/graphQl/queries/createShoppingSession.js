import { gql } from "@apollo/client";

const CREATE_SHOPPING_SESSION_MUTATION = gql`
mutation CreateShoppingSession( $publishedAt: DateTime!,$userId: ID!, $active: Boolean!) {
  createShoppingSession(
    data: {
      publishedAt: $publishedAt
      users_permissions_user:$userId
      active: $active
      total:0
    }
  ) {
    data{
      id
      attributes{
          total
          users_permissions_user{
              data{
                  id
              attributes{
                  username 
              }
          }
        }
      }
    }
  }
}
`;

export default CREATE_SHOPPING_SESSION_MUTATION