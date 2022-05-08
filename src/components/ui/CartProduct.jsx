import { useState } from 'react';
import server from '../../util/server';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';

function CartProduct({ product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = (stockQuantity) => {
    if (quantity <= stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='flex flex-col md:flex-row p-2 md:p-0 md:pr-4  gap-4 items-center  justify-between border-2  '>
      <div className='flex gap-6 items-center '>
        <img
          className=' object-cover w-16 h-16 '
          src={`${server}/files/${product.image}`}
          alt={product.image}
        />
        <p className=' '>{product.name}</p>
      </div>
      <div className=' flex gap-8 items-center justify-between md:w-[400px]'>
        <p>Price: &euro; {product.price}</p>

        {/* quantity selector */}
        <div className='flex gap-2 items-center'>
          Quantity:{' '}
          <div className='flex items-center gap-4 border-2 p-2'>
            {quantity}
            <span className='flex flex-col'>
              <BiUpArrow onClick={() => increaseQuantity(product.quantity)} />
              <BiDownArrow onClick={decreaseQuantity} />
            </span>
          </div>
        </div>
        <p>Subtotal: &euro; {product.price * quantity}</p>
      </div>
    </div>
  );
}

export default CartProduct;
