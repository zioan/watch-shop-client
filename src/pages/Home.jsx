import { useContext, useEffect } from 'react';
import Card from '../components/ui/Card';
import HomeHeader from '../components/ui/HomeHeader';
import Spinner from '../components/ui/Spinner';
import ProductContext from '../context/ProductContext';

function Home() {
  const { products, getProducts, loading } = useContext(ProductContext);

  useEffect(() => {
    if (products.length < 1) {
      getProducts();
    }
  }, []);

  const loadingProduct = () => {
    return <Spinner />;
  };

  return (
    <>
      <HomeHeader />
      {loading && loadingProduct()}
      <section className=' grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-2'>
        {products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </section>
    </>
  );
}

export default Home;
