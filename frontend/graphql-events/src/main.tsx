import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthState from './Context/AuthCOntext/AuthState.tsx';
import './index.css'

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("authtoken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = new HttpLink({ uri: "http://localhost:3000/graphql" });
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({ addTypename: false }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <ApolloProvider client={client}>
      <AuthState>
        <App />
      </AuthState>
    </ApolloProvider>
  </NextUIProvider>
)
