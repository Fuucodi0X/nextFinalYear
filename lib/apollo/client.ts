// lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_HASURA_GRAPHQL || "";
const client = new ApolloClient({
  uri, // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
