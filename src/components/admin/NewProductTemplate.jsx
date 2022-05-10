import { useContext, useState } from 'react';
import ProductContext from '../../context/ProductContext';
import NewImage from './NewImage';
import MediaGalley from './MediaGalley';

function NewProductTemplate() {
  const [name, setName] = useState('');
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);

  const [showGallery, setShowGallery] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState('');

  const { createProduct } = useContext(ProductContext);

  const newProductHandler = (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Name or description cannot be empty');
      return;
    }

    if (!fileName) {
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

    createProduct(name, fileName, description, price, quantity);

    setName('');
    setFileName('');
    setDescription('');
    setPrice(0.0);
    setQuantity(0);
    setImageUploaded(false);
  };

  const setImageNameHandler = (fileName) => {
    setFileName(fileName);
    setImageUploaded(true);
  };

  const clickHandler = (fileName) => {
    setFileName(fileName);
    setImageUploaded(true);
    setShowGallery(false);
  };

  return (
    <>
      <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>
        Add new product
      </h2>
      {/* Upload new image */}
      <div className='flex justify-center items-center'>
        <NewImage setImageNameHandler={setImageNameHandler} />
      </div>

      <div className='divider text-xl my-6'>OR select from gallery</div>

      {/* Select existing image */}
      <button
        className='btn mb-6 block mx-auto'
        onClick={() => setShowGallery(!showGallery)}
      >
        Show Gallery
      </button>
      {showGallery && <MediaGalley clickHandler={clickHandler} />}

      {/* New product form */}
      <form onSubmit={newProductHandler}>
        {/* Product image */}
        <label className='block mt-2'>Upload or select an image first</label>
        <input
          type='text'
          placeholder='Product image'
          required
          readOnly
          disabled
          value={fileName}
          className='input input-bordered w-full max-w-xs'
        />

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

        {/* Enable submit button if the image is successfully uploaded */}
        <button
          type='submit'
          className={
            imageUploaded ? 'btn block mt-4' : ' btn btn-disabled block mt-4'
          }
        >
          {imageUploaded ? 'Add product' : 'Select / upload and image'}
        </button>
      </form>
    </>
  );
}

export default NewProductTemplate;
