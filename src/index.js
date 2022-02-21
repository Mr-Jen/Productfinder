import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import rootReducer from './reducers';
import middleware from './middleware'
import './index.css'
import { loadState, saveState } from './sessionStorage';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeWithDevTools(middleware));

store.subscribe(() => {
  saveState(store.getState().filter);
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


