
import { gql } from '@apollo/client';

const GET_ACTIVE_SHOPPING_SESSION_BY_USER = gql`
query GetShoppingSessionByUser ($userId: ID!, $active: Boolean!) {
  shoppingSessions(filters: {users_permissions_user:{id:{eq:$userId}},and:{active:{eq:$active}}}sort: "id:desc") {
    data{
       id
         attributes {
              total
      }
    }
  }
}
`;

export default GET_ACTIVE_SHOPPING_SESSION_BY_USER;
