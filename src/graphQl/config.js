import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
    uri: 'https://api.detinmarin.cr/graphql',
    cache: new InMemoryCache(),
});

export default client;
