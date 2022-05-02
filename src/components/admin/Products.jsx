import { useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import ProductSingle from './ProductSingle';

function Products() {
  const { products } = useContext(ProductContext);
  return (
    <div className='flex flex-col gap-4'>
      {products.map((product) => {
        return <ProductSingle key={product.id} product={product} />;
      })}
    </div>
  );
}

export default Products;
