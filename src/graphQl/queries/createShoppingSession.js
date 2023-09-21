import { gql } from "@apollo/client";

const CREATE_SHOPPING_SESSION_MUTATION = gql`
mutation CreateShoppingSession( $publishedAt: DateTime!,$userId: ID!) {
    createShoppingSession(
      data: {
        publishedAt: $publishedAt
        users_permissions_user:$userId
        total:0
      }
    ) {
      data{
        id
        attributes{
            total
            active
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