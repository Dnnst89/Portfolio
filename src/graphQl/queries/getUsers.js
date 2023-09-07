import { gql } from "@apollo/client";

const GET_USERS = gql`
    query GetUser {
        up_users {
            usermane,
                
            }
        }
    }
`;
export default GET_USERS;
