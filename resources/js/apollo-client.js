// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const apolloClient = new ApolloClient({
//     uri: 'https://graphql-pokemon2.vercel.app', 
//     cache: new InMemoryCache(),
//   });

// export default apolloClient;


import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://graphql-pokemon2.vercel.app',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider;