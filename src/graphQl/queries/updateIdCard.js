import { gql } from '@apollo/client';

export const UPDATE_ID_CARD = gql`
mutation UPDATE_ID_CARD($user: ID!, $idNumber:Int!, $idType: String!){
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

