import { useContext, useEffect } from 'react';
import Card from '../components/ui/Card';
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
      <section className=' grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </section>
    </>
  );
}

export default Home;
