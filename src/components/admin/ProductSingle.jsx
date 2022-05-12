import { useContext, useState, useEffect } from 'react';
import server from '../../util/server';
import { FiEdit3 } from 'react-icons/fi';
import { BiTrash } from 'react-icons/bi';
import ProductContext from '../../context/ProductContext';
import Modal from '../Modal';
import toDecimal from '../../util/toDecimal';

function ProductSingle({ product }) {
  const { updateProduct, deleteProduct } = useContext(ProductContext);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [error, setError] = useState('');

  const [productUpdatedMessage, setProductUpdatedMessage] = useState(false);

  useEffect(() => {
    setProductUpdatedMessage(false);
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Name and description cannot be empty');
      return;
    }

    if (quantity == 0 || price == 0) {
      setError('Price or quantity cannot be 0');
      return;
    }

    updateProduct(
      product.id,
      name,
      product.image,
      description,
      price,
      quantity
    );

    setProductUpdatedMessage(true);
  };

  const deleteHandler = () => {
    if (window.confirm(`Are you sure you wnat to delete ${product.name}?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className='flex flex-col md:flex-row p-2 md:p-0 md:pr-4 justify-between gap-4 items-center border-2  '>
      {/* <div className=' flex flex-col md:flex-row gap-8 items-center justify-between md:w-[600px]'> */}
      <img
        className=' object-cover w-16 h-16 '
        src={`${server}/files/${product.image}`}
        alt={product.image}
      />
      <p>{product.name}</p>
      <div className='flex gap-4 items-center'>
        <p>Quantity: {product.quantity}</p>
        <p>Price: &euro; {toDecimal(product.price)}</p>

        {/* Modal for updating product */}
        <Modal
          modalNumber={product.id}
          type={<FiEdit3 className=' text-xl cursor-pointer' />}
        >
          {/* Modal content */}
          <div>
            {productUpdatedMessage ? (
              // Display message if product updated
              <div className=' flex justify-between items-center'>
                <p className=' text-success text-2xl inline'>
                  Product updated !
                </p>
                <button
                  className='btn btn-ghost text-xl'
                  onClick={() => setProductUpdatedMessage(false)}
                >
                  Update Again?
                </button>
              </div>
            ) : (
              // Display update form until product is updated
              <>
                <h3 className='text-xl text-center'>
                  Updating: {product.name}
                </h3>
                <form onSubmit={updateHandler}>
                  {/* Product name */}
                  <label htmlFor='title' className='block mt-2'>
                    Product title
                  </label>
                  <input
                    type='text'
                    placeholder='Product title'
                    required
                    id='title'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='input input-bordered w-full max-w-xs'
                  />

                  {/* Product description */}
                  <label htmlFor='description' className='block mt-2'>
                    Product description
                  </label>
                  <textarea
                    type='text'
                    placeholder='Product description'
                    required
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='textarea textarea-bordered w-full max-w-xs'
                  />

                  {/* Product price */}
                  <label htmlFor='price' className='block mt-2'>
                    Product price
                  </label>
                  <input
                    type='number'
                    placeholder='Product price'
                    required
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className='input input-bordered w-full max-w-xs'
                  />

                  {/* Product quantity */}
                  <label htmlFor='quantity' className='block mt-2'>
                    Product quantity
                  </label>
                  <input
                    type='number'
                    placeholder='Product quantity'
                    required
                    id='quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className='input input-bordered w-full max-w-xs'
                  />
                  {error && <p className=' my-2 text-red-500'>{error}</p>}

                  <button type='submit' className='btn block mt-4'>
                    Update product
                  </button>
                </form>
              </>
            )}
          </div>
        </Modal>
        <button className='btn ' onClick={deleteHandler}>
          <BiTrash className=' text-xl' />
        </button>
      </div>
    </div>
  );
}

export default ProductSingle;
