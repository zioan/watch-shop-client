import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import ProductContext from '../../context/ProductContext';
import server from '../../util/server';
import toDecimal from '../../util/toDecimal';

function Card({ product }) {
  const navigate = useNavigate();

  const { getSingleProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const productPageHandler = () => {
    getSingleProduct(product.id);
    navigate(`/product/${product.id}`);
    window.scrollTo({ left: 0, top: 0 });
  };

  const addToCartHandler = () => {
    addToCart(product);
    console.log('product from cart: ', product);
  };

  return (
    <>
      {product.quantity > 0 && (
        <div className=' relative mx-2 md:m-0'>
          <div className='relative overflow-hidden shadow-md rounded-md h-full '>
            <img
              className='relative object-cover w-full h-full  cursor-pointer hover:scale-110 transition duration-300 ease-in-out'
              src={`${server}/files/${product.image}`}
              alt={product.image}
              onClick={productPageHandler}
            />
          </div>

          <div className='absolute bottom-0 left-0 w-full text-heading-colo  bg-base-200 p-4'>
            <div className=' flex justify-between items-center'>
              <h3 className=' text-xl '>{product.name}</h3>
              <div>
                <p className=' text-2xl inline'>
                  &euro; {toDecimal(product.price)}
                </p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 mb-2 ml-2 inline cursor-pointer hover:scale-150 transition duration-300 ease-in-out'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  onClick={addToCartHandler}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
