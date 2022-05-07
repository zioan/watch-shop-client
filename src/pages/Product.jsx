import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import ProductContext from '../context/ProductContext';
import server from '../util/server';
import NotFound from './NotFound';

function Product() {
  const { singleProduct, getSingleProduct, error, loading } =
    useContext(ProductContext);

  const params = useParams();

  useEffect(() => {
    console.log(params.product_id);
    getSingleProduct(params.product_id);
  }, []);

  const loadingProduct = () => {
    return <Spinner />;
  };

  // { id, name, description, image, price, quantity }

  return (
    <>
      {loading && loadingProduct()}
      {singleProduct && (
        <div className='flex flex-col md:flex-row gap-6 md:gap-10 mb-10'>
          <section>
            <img
              className='relative object-cover w-full max-h-[600px] p-4 md:m-4 shadow-xl'
              src={`${server}/files/${singleProduct[0].image}`}
              alt={singleProduct[0].image}
            />
          </section>
          <section className=' flex-grow m-4'>
            <h2 className='text-2xl font-bold mb-8 '>
              {singleProduct[0].name}
            </h2>
            <h3 className='text-xl mb-4 '>&euro; {singleProduct[0].price}</h3>
            <p className='text-xl mb-4'>{singleProduct[0].description}</p>
            <div className='flex justify-center'>
              <button className='btn btn-ghost text-xl'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </section>
        </div>
      )}
      {error === 'no product' && <NotFound />}
    </>
  );
}

export default Product;
