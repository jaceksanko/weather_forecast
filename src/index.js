import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .error {
    color: red;
  }
  .city-name {
    font-weight: bold;
  }
`;

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
          <GlobalStyle/>
          <App />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);


