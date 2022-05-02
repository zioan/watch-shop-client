import axios from 'axios';
import { useContext, useState } from 'react';
import ImageContext from '../../context/ImageContext';
import ProductContext from '../../context/ProductContext';
import server from '../../util/server';

function NewProductTemplate() {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState('');

  const { createProduct } = useContext(ProductContext);
  const { uploadImage, createImageInDB } = useContext(ImageContext);

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
    setFile(null);
    setFileName('');
    setDescription('');
    setPrice(0.0);
    setQuantity(0);
    setImageUploaded(false);
  };

  const saveFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    createImageInDB(fileName);
    uploadImage(formData);

    // try {
    //   const res = await axios.post(`${server}/images/upload`, formData);
    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }
    setImageUploaded(true);
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
        onChange={saveFile}
        // className='input input-bordered w-full max-w-xs'
      />
      <button className='btn' onClick={uploadFile}>
        Upload
      </button>

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

        {/* Enable submit button if the image is successfully uploaded */}
        <button
          type='submit'
          className={imageUploaded ? 'btn' : ' btn btn-disabled'}
        >
          {imageUploaded ? 'Add product' : 'No image uploaded'}
        </button>
      </form>
    </>
  );
}

export default NewProductTemplate;
