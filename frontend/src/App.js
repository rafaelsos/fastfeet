import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import Routes from './routes';

import store from '~/store';

import history from './services/history';

import GlobalStyles from './styles/global';

import Header from '~/components/Header';

function App() {
  const signed = false;

  return (
    <Provider store={store}>
      <Router history={history}>
        {signed ? <Header /> : null}
        <Routes />
        <GlobalStyles />
      </Router>
    </Provider>
  );
}

export default App;
