import { gql } from "@apollo/client";

const GET_USERS = gql`
    query CurrentUserForLayout {
        currentUser {
            login
            avatar_url
        }
    }
`;
export default GET_USERS;
