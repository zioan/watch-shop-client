// import {} from "react";

import server from '../../util/server';

function Card({ product }) {
  return (
    <div className=' shadow-md rounded-md'>
      <h3>{product.name}</h3>
      <img
        width='100'
        height='100'
        src={`${server}/files/${product.image}`}
        alt={product.image}
        // onClick={() => deleteImage(image._id, image.img)}
      />
    </div>
  );
}

export default Card;
