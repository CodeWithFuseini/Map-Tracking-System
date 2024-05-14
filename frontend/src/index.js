import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "./index.css"
import "bootstrap/dist/css/bootstrap.css";
import 'mapbox-gl/dist/mapbox-gl.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from './store/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
    <Provider store={store}>
      <Routes>
      <Route path='/*' element={<App />} />
      </Routes>
    </Provider>
   </BrowserRouter>
  </React.StrictMode>
);

