import { useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import ProductSingle from './ProductSingle';

function Products() {
  const { products } = useContext(ProductContext);
  return (
    <>
      <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>Products</h2>

      <div className='flex flex-col gap-4'>
        {products.map((product) => {
          return <ProductSingle key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}

export default Products;
