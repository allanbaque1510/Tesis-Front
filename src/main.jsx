import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa Provider desde react-redux
import store from './redux/store.js';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
