import { ApolloClient, InMemoryCache } from '@apollo/client';

// We create a new apollo client with the URI of our GraphQL API
const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
});

export default client;
