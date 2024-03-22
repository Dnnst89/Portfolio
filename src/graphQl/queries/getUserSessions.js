import { gql } from "@apollo/client";

export const GET_USER_SESSIONS = gql`
  query GetUserSessions($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          shopping_sessions(filters: { active: { eq: true } }) {
            data {
              id
              attributes {
                active
              }
            }
          }
        }
      }
    }
  }
`;
