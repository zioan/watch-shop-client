import { createContext, useState } from 'react';
import axios from 'axios';
import server from '../util/server';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const productRes = await axios.get(`${server}/products/all`);
      setProducts(productRes.data);
      setLoading(false);
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const getSingleProduct = async (id) => {
    try {
      setSingleProduct(null);
      setError('');
      setLoading(true);
      const singleProduct = await axios.get(`${server}/products/${id}`);
      if (singleProduct.data.length > 0) {
        setSingleProduct(singleProduct.data[0]);
        console.log(singleProduct.data[0]);
        setLoading(false);
      } else {
        setSingleProduct(null);
        setLoading(false);
        setError('no product');
      }
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

  const updateProduct = async (
    id,
    name,
    image,
    description,
    price,
    quantity
  ) => {
    try {
      const updatedData = { name, image, description, price, quantity };
      await axios.put(`${server}/products/update/${id}`, updatedData);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductQuantity = async (id, quantity) => {
    const updatedData = { quantity: quantity };
    await axios.put(`${server}/products/quantity/${id}`, updatedData);
    getProducts();
  };

  const deleteProduct = (id) => {
    try {
      axios.delete(`${server}/products/delete/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        singleProduct,
        getSingleProduct,
        createProduct,
        updateProduct,
        updateProductQuantity,
        deleteProduct,
        error,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
