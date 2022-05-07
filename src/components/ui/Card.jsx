import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../context/ProductContext';

import server from '../../util/server';

function Card({ product }) {
  const [imageOverlay, setimageOverlay] = useState(false);
  const navigate = useNavigate();

  const { getSingleProduct } = useContext(ProductContext);

  const redirectHandler = () => {
    getSingleProduct(product.id);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className=' relative mx-2 md:m-0'>
      <div className='relative overflow-hidden shadow-md rounded-md h-full '>
        <img
          // width='100%'
          // height='100%'
          className='relative object-cover w-full h-full  cursor-pointer hover:scale-110 transition duration-300 ease-in-out'
          src={`${server}/files/${product.image}`}
          alt={product.image}
          onClick={redirectHandler}
        />
      </div>

      <div className='absolute bottom-0 left-0 w-full text-heading-colo  bg-base-200 p-4'>
        <div className=' flex justify-between'>
          <h3 className=' text-xl '>{product.name}</h3>
          <div>
            <p className=' text-2xl inline'>&euro; {product.price}</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 mb-2 ml-2 inline cursor-pointer hover:scale-150 transition duration-300 ease-in-out'
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
