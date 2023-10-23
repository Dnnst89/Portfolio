
import { gql } from '@apollo/client';

const GET_USER_ORDERS = gql`
query GetUserOrders($userId: ID!, $page: Int!, $pageSize: Int! ) {
  orderDetails(filters: {
   users_permissions_user: {
     id: { eq: $userId }
     
   }and:{status:{ne:"P"}}
 }
 pagination: { page: $page, pageSize: $pageSize })
 {  
   meta{
pagination{
 total
 page
 pageSize
 pageCount
}
}
     data{
       id
       attributes{
         payment_detail{
           data{
             attributes{
               subtotal
               taxes
               total
             }
           }
         }
         users_permissions_user{
           data{
             id
             attributes{
               firstName
               lastName
               users_address{
                 data{
                   id
                   attributes{
                     province
                     canton
                   }
                 }
               }
             }
           }
         }
         status
       }
       
     }
   }
 }
`;

export default GET_USER_ORDERS;
