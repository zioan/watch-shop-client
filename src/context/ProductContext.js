import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import server from '../util/server';
import AuthContext from './AuthContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const getProducts = async () => {
    try {
      const productRes = await axios.get(`${server}/products/all`);
      setProducts(productRes.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const createProduct = async (name, image, description, price, quantity) => {
    const productData = {
      name,
      image,
      description,
      price,
      quantity,
    };
    try {
      const productRes = await axios.post(
        `${server}/products/add`,
        productData
      );
      getProducts();
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, getProducts, createProduct, error }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
