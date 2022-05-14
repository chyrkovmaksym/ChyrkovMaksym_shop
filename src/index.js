import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider} from '@apollo/client';
import { client } from './assets/config';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  requestInitialData,
  requestCurrentProduct,
  currencyChange,
  cartChange,
} from './Redux/reducers';
const rootReducer = combineReducers({
  requestInitialData,
  requestCurrentProduct,
  currencyChange,
  cartChange,
  
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
reportWebVitals();
