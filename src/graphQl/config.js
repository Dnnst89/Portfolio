import { ApolloClient, InMemoryCache } from '@apollo/client'
const client = new ApolloClient({
    uri: 'http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337/graphql',
    cache: new InMemoryCache(),
  });

export default client;