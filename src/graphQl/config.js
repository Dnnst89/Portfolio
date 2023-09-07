import { ApolloClient, InMemoryCache } from "@apollo/client";
const URL_API = process.env.URL_API;
const client = new ApolloClient({
  uri: URL_API,
  cache: new InMemoryCache(),
});

export default client;
