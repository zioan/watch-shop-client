import { useContext, useState } from 'react';
import ProductContext from '../../context/ProductContext';

function NewProductTemplate() {
  const [name, setName] = useState('');
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);

  const [error, setError] = useState('');

  const { createProduct, uploadImage } = useContext(ProductContext);

  const newProductHandler = (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Name or description cannot be empty');
      return;
    }

    if (!imageName) {
      setError('You need to upload the image first');
      return;
    }

    if (price == 0) {
      setError('Price cannot be 0');
      return;
    }

    if (quantity == 0) {
      setError('Quantity cannot be 0');
      return;
    }

    setError('');

    createProduct(name, imageName, description, price, quantity);

    setName('');
    setImageName('');
    setDescription('');
    setPrice(0.0);
    setQuantity(0);
  };

  const saveFile = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('imageName', imageName);

    uploadImage(formData);
  };

  return (
    <>
      <h2 className=' my-4'>Add new product</h2>

      {/* Product image */}
      <label htmlFor='image' className='block mt-2'>
        Product image
      </label>
      <input
        type='file'
        placeholder='Product image'
        required
        id='image'
        onChange={saveFile}
        className='input input-bordered w-full max-w-xs'
      />
      <button onClick={uploadFile}>Upload</button>

      <form onSubmit={newProductHandler}>
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

        <button type='submit' className=' btn'>
          Add product
        </button>
      </form>
    </>
  );
}

export default NewProductTemplate;
