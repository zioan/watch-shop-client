import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../components/ui/CartProduct';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import toDecimal from '../util/toDecimal';

function Cart() {
  const { cart, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  });

  const orderHandler = () => {};

  return (
    <>
      {cart.length > 0 && user ? (
        <>
          {/* Cart items */}
          <section className='flex flex-col lg:flex-row gap-20'>
            <div className='flex-1'>
              {cart.map((product) => {
                return <CartProduct key={product.id} product={product} />;
              })}
            </div>
            <div>
              <p>total: &euro; {toDecimal(cartTotal)}</p>
            </div>
          </section>

          {/* Order details (user details) */}
          <section className=' my-6'>
            <h3>
              Delivery to:{' '}
              <span className='font-bold'>
                {user.name} {user.surname}
              </span>
            </h3>
            <h3>
              Delivery Address:{' '}
              <span className='font-bold'>{user.address}</span>
            </h3>
            <h3>Delivery in ca. 3 working days</h3>
            <button className=' btn my-4' onClick={orderHandler}>
              Place Order
            </button>
          </section>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </>
  );
}

export default Cart;
