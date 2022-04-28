import { useContext, useState } from 'react';
import ProductContext from '../../context/ProductContext';

function NewProductTemplate() {
  const [name, setName] = useState('');
  const [imageName, setImageName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [error, setError] = useState('');

  const { createProduct } = useContext(ProductContext);

  const newProductHandler = () => {
    if (!name || !imageName || !description) {
      setError('Name, image or description cannot be empty');
      return;
    }

    if (price === 0) {
      setError('Price cannot be 0');
      return;
    }

    if (quantity === 0) {
      setError('Quantity cannot be 0');
      return;
    }

    createProduct(name, imageName, description, price, quantity);

    setName('');
    setImageName('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  return (
    <>
      <h2 className=' my-4'>Add new product</h2>
      <form onSubmit={newProductHandler}>
        {/* Product name */}
        <label htmlFor='title' className='block mt-2'>
          Product title
        </label>
        <input
          type='text'
          placeholder='Product title'
          id='title'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='input input-bordered w-full max-w-xs'
        />

        {/* Product image */}
        <label htmlFor='image' className='block mt-2'>
          Product image
        </label>
        <input
          type='text'
          placeholder='Product image'
          id='image'
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className='input input-bordered w-full max-w-xs'
        />

        {/* Product description */}
        <label htmlFor='description' className='block mt-2'>
          Product description
        </label>
        <textarea
          type='text'
          placeholder='Product title'
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='textarea textarea-bordered w-full max-w-xs'
        />
      </form>
    </>
  );
}

export default NewProductTemplate;
