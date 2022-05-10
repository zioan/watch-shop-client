import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalNumberOfProductsInCart, setTotalNumberOfProductsInCart] =
    useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateOrderTotal();
    calculateTotalProductsOrdered();
  }, [cart]);

  const addToCart = (product) => {
    if (cart.includes(product)) {
      console.log('product already in cart');
      return;
    }

    setCart((prevState) => [...prevState, product]);
  };

  const updateProductQuantityAndSubtotal = (id, quantity) => {
    cart.filter((product) => {
      if (product.id === id) {
        console.log(cart);
        product.ordered_quantity = quantity;
        product.subtotal = product.price * quantity;
      }
      return product;
    });
  };

  const calculateOrderTotal = () => {
    if (cart.length === 0) {
      return;
    } else if (cart.length === 1) {
      setCartTotal(cart[0].subtotal);
    } else {
      setCartTotal(
        cart
          .map((item) => Number(item.subtotal))
          .reduce((prev, next) => prev + next)
      );
    }
  };

  const calculateTotalProductsOrdered = () => {
    if (cart.length === 0) {
      return;
    } else if (cart.length === 1) {
      setTotalNumberOfProductsInCart(cart[0].ordered_quantity);
    } else {
      setTotalNumberOfProductsInCart(
        cart
          .map((item) => Number(item.ordered_quantity))
          .reduce((prev, next) => prev + next)
      );
    }
  };

  const deleteProductFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartTotal,
        updateProductQuantityAndSubtotal,
        calculateOrderTotal,
        calculateTotalProductsOrdered,
        totalNumberOfProductsInCart,
        deleteProductFromCart,
        error,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
