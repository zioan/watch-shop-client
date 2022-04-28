import { useContext, useEffect } from 'react';
import ProductContext from '../context/ProductContext';

function Home() {
  const { products, getProducts } = useContext(ProductContext);

  useEffect(() => {
    if (products.length < 1) {
      getProducts();
      console.log('home:', products);
    }
  }, []);

  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}

export default Home;
