import { gql } from '@apollo/client';

const AddReview = gql`
mutation createReview($comment: String!, $score: Int!, $product: ID!, $users_permissions_user: ID!) {
    createReview (
      data:{
        comment: $comment
        score: $score
        product: $product
        users_permissions_user: $users_permissions_user
      }
    ) {
      data {
        id
      }
    }
  }
`;

export default AddReview;