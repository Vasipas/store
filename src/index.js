import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import {StateProvider} from './components/StateContext'

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}
const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
})

root.render(
    <ApolloProvider client={client}>
        <StateProvider>
            <App />
        </StateProvider>
    </ApolloProvider>

);

reportWebVitals();
