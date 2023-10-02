import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthState from './Context/AuthCOntext/AuthState.tsx';
import { onError } from '@apollo/client/link/error';
import { logout } from './helper/index.ts';
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

const errorLink = onError((error) => {
  const { message, statusCode } = JSON.parse(error?.graphQLErrors[0]?.message)
  if (statusCode === 403) {
    // Handle the network error globally, e.g., log it or show a notification
    console.log('Network Error:', error);
    logout()
  }
});

const link = new HttpLink({ uri: "http://localhost:3000/graphql" });
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(link)),
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
