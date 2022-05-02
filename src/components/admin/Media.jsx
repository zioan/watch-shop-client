import { useContext, useEffect } from 'react';
import ImageContext from '../../context/ImageContext';
import server from '../../util/server';
import NewImage from './NewImage';

function Media() {
  const { images, getImages, deleteImageFromDB, deleteImageFile } =
    useContext(ImageContext);

  useEffect(() => {
    getImages();
  }, []);

  const deleteHandler = (imageName, id) => {
    if (window.confirm('Are you sure you want to delete selected image?')) {
      // Delete image from static folder
      deleteImageFile(imageName);
      // Delete image form DB
      deleteImageFromDB(id);
      getImages();
    }
  };

  return (
    <>
      <h2 className=' text-2xl mb-6'>Media gallery</h2>
      <p className='mb-2 text-2xl'>Upload new image.</p>
      <NewImage />
      <p className='mb-2 mt-4 pt-2 text-2xl border-t-2 border-base-200'>
        Click an image to remove.
      </p>
      <p className='mb-2 text-2xl text-red-600'>
        Removing necessary files may broke the application!
      </p>
      <div className=' flex flex-wrap gap-2'>
        {images.map((image) => {
          return (
            <img
              key={image.id}
              className=' object-cover w-28 h-28  cursor-pointer '
              src={`${server}/files/${image.name}`}
              alt={image.image}
              onClick={() => deleteHandler(image.name, image.id)}
            />
          );
        })}
      </div>
    </>
  );
}

export default Media;
