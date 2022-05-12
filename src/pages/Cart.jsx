import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../components/ui/CartProduct';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import OrderContext from '../context/OrderContext';
import ProductContext from '../context/ProductContext';
import toDecimal from '../util/toDecimal';

function Cart() {
  const { user } = useContext(AuthContext);
  const { products, updateProductQuantity } = useContext(ProductContext);
  const { cart, cartTotal, emptyCartOnOrderSubmit } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  });

  const orderHandler = () => {
    const orderData = JSON.stringify(cart);
    createOrder(orderData, cartTotal);
    updateProductsQuantity();
    emptyCartOnOrderSubmit();
  };

  const updateProductsQuantity = () => {
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < cart.length; j++) {
        if (products[i].id === cart[j].id) {
          const updatedQuantity =
            products[i].quantity - cart[j].ordered_quantity;
          updateProductQuantity(products[i].id, updatedQuantity);
        }
      }
    }
  };

  return (
    <div className='mx-2'>
      {cart.length > 0 && user ? (
        <>
          {/* Cart items */}
          <section>
            {cart.map((product) => {
              return <CartProduct key={product.id} product={product} />;
            })}
          </section>

          {/* Order details (user details) */}
          <section className=' my-6 flex flex-col lg:flex-row justify-between'>
            <div>
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
            </div>
            <div>
              <p className=' text-xl font-bold mr-4 mt-4 md:mt-0'>
                Total: &euro; {toDecimal(cartTotal)}
              </p>
              <button className=' btn my-4' onClick={orderHandler}>
                Place Order
              </button>
            </div>
          </section>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
