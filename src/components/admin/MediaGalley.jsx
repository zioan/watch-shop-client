import { useContext } from 'react';
import ImageContext from '../../context/ImageContext';
import server from '../../util/server';

function MediaGalley({ clickHandler }) {
  const { images } = useContext(ImageContext);

  return (
    <div className=' flex flex-wrap gap-2'>
      {images.map((image) => {
        return (
          <img
            key={image.id}
            className=' object-cover w-28 h-28  cursor-pointer '
            src={`${server}/files/${image.name}`}
            alt={image.image}
            onClick={() => clickHandler(image.name, image.id)}
          />
        );
      })}
    </div>
  );
}

export default MediaGalley;
