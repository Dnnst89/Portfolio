import { gql } from '@apollo/client';

export const AddSpecificId = gql`
    mutation AddSpecificId($user: ID!, $idNumber:Int!, $idType: String!){
        updateUsersPermissionsUser(id: $user
        data:{
          idCard: {
            idNumber: $idNumber
            idType:  $idType
          }
        }
        )
        {data: data { id }}
        }
    `;