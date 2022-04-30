import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import server from '../util/server';
import AuthContext from './AuthContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const getProducts = async () => {
    // getImages();
    try {
      const productRes = await axios.get(`${server}/products/all`);
      setProducts(productRes.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  // const uploadImage = async (formData) => {
  //   const res = await axios.post(`${server}/products/upload`, formData);
  //   console.log(res);
  // };

  // const getImages = async () => {
  //   setImages([]);
  //   try {
  //     const imagesData = await axios.get(`${server}/files`);
  //     setImages(imagesData.data);
  //     // console.log(imagesData.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
