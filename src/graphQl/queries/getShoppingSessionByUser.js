
import { gql } from '@apollo/client';

const GET_SHOPPING_SESSION_BY_USER = gql`
query GetShoppingSessionByUser ($userId: ID!) {
    shoppingSessions(filters: {users_permissions_user:{id:{eq:$userId}}}) {
      data{
         id
           attributes {
                total
        }
      }
    }
  }
  
`;

export default GET_SHOPPING_SESSION_BY_USER;
