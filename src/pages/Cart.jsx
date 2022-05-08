import { useContext } from 'react';
import CartProduct from '../components/ui/CartProduct';
import CartContext from '../context/CartContext';

function Cart() {
  const { cart } = useContext(CartContext);

  console.log(cart);

  return (
    <>
      {cart.length > 0 ? (
        <section className='flex flex-col lg:flex-row gap-20'>
          <div className='flex-1'>
            {cart.map((product) => {
              return <CartProduct key={product.id} product={product} />;
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
