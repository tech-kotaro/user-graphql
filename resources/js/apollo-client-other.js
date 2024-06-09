import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:8080/pokemongraphql/pokemongraphqllaravel/public/graphql',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider;