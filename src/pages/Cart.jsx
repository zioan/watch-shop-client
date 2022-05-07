import { useContext } from 'react';
import CartContext from '../context/CartContext';
import server from '../util/server';

function Cart() {
  const { cart } = useContext(CartContext);

  console.log(cart);
  return (
    <>
      {cart.length > 0 ? (
        <section className='flex flex-col lg:flex-row gap-20'>
          <div className='flex-1'>
            {cart.map((product) => {
              return (
                <div
                  className='flex flex-col md:flex-row p-2 md:p-0 md:pr-4  gap-4 items-center border-2  '
                  key={product.id}
                >
                  <img
                    className=' object-cover w-16 h-16 '
                    src={`${server}/files/${product.image}`}
                    alt={product.image}
                  />
                  <p className=' '>{product.name}</p>
                  <div className='flex-grow flex gap-4 items-center justify-end '>
                    <p>Price: &euro; {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Subtotal: &euro; {product.price * product.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <p>total</p>
          </div>
        </section>
      ) : (
        <p>Your cart is empty</p>
      )}
    </>
  );
}

export default Cart;
