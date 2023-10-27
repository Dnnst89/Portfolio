import { gql } from '@apollo/client';

export const GET_USER_ADDRESS = gql`
query GetUserAddress($id: ID){
    usersPermissionsUser(id:$id) {
      data{
        id,
        attributes{
          users_address{
            data{
              id,
              attributes{
                canton,
                province,
                addressLine1
              }
              }
            }
          }
        }
      }
    }
    `;