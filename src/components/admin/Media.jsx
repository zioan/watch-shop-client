import axios from 'axios';
import { useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import server from '../../util/server';

function Media() {
  const { products, getProducts } = useContext(ProductContext);

  const deleteHandler = (imageName) => {
    if (window.confirm('Are you sure you want to delete selected image?')) {
      axios
        .delete(`${server}/images/delete/${imageName}`)
        .then(getProducts())
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h2 className=' text-xl mb-6'>Product Images</h2>
      <p className='mb-2'>Click an image to remove</p>
      <div className=' flex flex-wrap gap-2'>
        {products.map((product) => {
          return (
            <img
              key={product.id}
              className=' object-cover w-28 h-28  cursor-pointer '
              src={`${server}/files/${product.image}`}
              alt={product.image}
              onClick={() => deleteHandler(product.image)}
            />
          );
        })}
      </div>
    </>
  );
}

export default Media;
