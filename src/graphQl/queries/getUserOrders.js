
import { gql } from '@apollo/client';

const GET_USER_ORDERS = gql`
query GetUserOrders($userId: ID!) {
    usersPermissionsUser(id:$userId) {
      data {
        id
        attributes{
          firstName
          lastName
          users_address{
            data{
              attributes{
                province
                canton
              }
            }
          }
          order_details{
            data{
              id
              attributes{
                subTotal
                taxes
                total
                status
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_USER_ORDERS;
