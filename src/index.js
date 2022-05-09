import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { ImageProvider } from './context/ImageContext';
import { CartProvider } from './context/CartContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <ImageProvider>
              <App />
            </ImageProvider>
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
