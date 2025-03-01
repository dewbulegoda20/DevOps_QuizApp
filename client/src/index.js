import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App1 from './components/App1';

import App from './App';
import reportWebVitals from './reportWebVitals';


import store from './redux/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <App1 /> 
    </Provider>
    
  </React.StrictMode>

);

reportWebVitals();


