import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      return;
    } else if (cart.length === 1) {
      setCartTotal(cart[0].price);
    } else {
      setCartTotal(
        cart
          .map((item) => Number(item.price))
          .reduce((prev, next) => prev + next)
      );
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevState) => [...prevState, product]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartTotal,
        error,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
