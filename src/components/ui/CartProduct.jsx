import { useContext, useState } from 'react';
import server from '../../util/server';
import { BiUpArrow, BiDownArrow, BiTrash } from 'react-icons/bi';
import CartContext from '../../context/CartContext';
import toDecimal from '../../util/toDecimal';
import ProductContext from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

function CartProduct({ product }) {
  const [quantity, setQuantity] = useState(product.ordered_quantity);
  const {
    updateProductQuantityAndSubtotal,
    calculateOrderTotal,
    calculateTotalProductsOrdered,
    deleteProductFromCart,
  } = useContext(CartContext);
  const { getSingleProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const increaseQuantity = () => {
    if (quantity <= product.quantity - 1) {
      setQuantity(quantity + 1);
      product.ordered_quantity = quantity + 1;
      updateProductQuantityAndSubtotal(product.id, product.ordered_quantity);
      calculateOrderTotal();
      calculateTotalProductsOrdered();
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      product.ordered_quantity = quantity - 1;
      updateProductQuantityAndSubtotal(product.id, product.ordered_quantity);
      calculateOrderTotal();
      calculateTotalProductsOrdered();
    }
  };

  const productPageHandler = () => {
    getSingleProduct(product.id);
    navigate(`/product/${product.id}`);
    window.scrollTo({ left: 0, top: 0 });
  };

  return (
    <div className='flex flex-col md:flex-row p-2 md:p-0 md:pr-4 mb-2  gap-4 items-center  justify-between border-2  '>
      <div className='flex gap-6 items-center '>
        <img
          className=' object-cover w-28 h-28 cursor-pointer'
          src={`${server}/files/${product.image}`}
          alt={product.image}
          onClick={productPageHandler}
        />
        <p className=' cursor-pointer' onClick={productPageHandler}>
          {product.name}
        </p>
      </div>
      <div className=' flex flex-col md:flex-row gap-8 items-center justify-between md:w-[600px]'>
        <p>Price: &euro; {toDecimal(product.price)}</p>

        {/* quantity selector */}
        <div className='flex gap-2 items-center'>
          Quantity:{' '}
          <div className='flex items-center gap-4 border-2 p-2'>
            {quantity}
            <span className='flex flex-col'>
              <BiUpArrow onClick={increaseQuantity} />
              <BiDownArrow onClick={decreaseQuantity} />
            </span>
          </div>
        </div>
        <p>Subtotal: &euro; {toDecimal(product.subtotal)}</p>
        <button
          className=' text-xl'
          onClick={() => deleteProductFromCart(product.id)}
        >
          <BiTrash />
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
