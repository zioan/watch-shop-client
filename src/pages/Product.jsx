import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import CartContext from '../context/CartContext';
import ProductContext from '../context/ProductContext';
import server from '../util/server';
import NotFound from './NotFound';
import toDecimal from '../util/toDecimal';

function Product() {
  const { products, singleProduct, getSingleProduct, error, loading } =
    useContext(ProductContext);

  const { addToCart } = useContext(CartContext);

  const params = useParams();

  useEffect(() => {
    getSingleProduct(params.product_id);
  }, []);

  const loadingProduct = () => {
    return <Spinner />;
  };

  const addToCartHandler = () => {
    // this fix duplicated items
    // comparing id 'number' with params 'string' is right in this case !!!
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == params.product_id) {
        console.log(products[i]);
        addToCart(products[i]);
      }
    }
  };

  const goTop = () => {
    window.scrollTo({ left: 0, top: 0 });
  };

  return (
    <>
      {loading && loadingProduct()}

      {/* if product is found */}
      {singleProduct && (
        <div className='flex flex-col md:flex-row gap-6 md:gap-10 mb-10'>
          <section>
            <img
              className='relative object-cover w-full max-h-[600px] p-4 md:m-4 shadow-xl'
              src={`${server}/files/${singleProduct.image}`}
              alt={singleProduct.image}
            />
          </section>
          <section className=' flex-grow m-4'>
            <h2 className='text-2xl font-bold mb-8 mt-4 '>
              {singleProduct.name}
            </h2>
            <h3 className='text-xl mb-4 '>
              &euro; {toDecimal(singleProduct.price)}
            </h3>
            <p className='text-xl mb-4'>{singleProduct.description}</p>
            <div className='divider'>
              <button className='btn text-lg' onClick={addToCartHandler}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 mr-2'
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

      {/* if no product is found display 404 component */}
      {error === 'no product' && <NotFound />}

      {/* display sugested products if no error */}
      {!error && (
        <>
          <div className='divider my-10'>
            <h3 className='text-xl font-bold'>Featured Products</h3>
          </div>
          <section
            className=' grid md:grid-cols-2 lg:mx-10 xl:grid-cols-4 gap-8'
            onClick={goTop}
          >
            {products.slice(0, 4).map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          </section>
        </>
      )}
    </>
  );
}

export default Product;
