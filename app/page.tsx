"use client"

import Dashboard from "@/components/dashboard"
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo/client';

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  ) 
}
