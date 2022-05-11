import { useEffect, useState } from 'react';
import server from '../../util/server';
import toDecimal from '../../util/toDecimal';

function SingleOrder({ order }) {
  const [orderedItems, setOrderedItem] = useState([]);

  useEffect(() => {
    setOrderedItem(JSON.parse(order.order_data));
  }, []);

  return (
    <div className='border-2 p-1 md:p-4 my-2 md:my-6 border-base-200'>
      <h3>
        <span className='font-bold'>Order date: </span>
        {order.timeStamp.substring(8, 10)}.{order.timeStamp.substring(5, 7)}.
        {order.timeStamp.substring(0, 4)} {order.timeStamp.substring(11, 16)}
      </h3>

      <p>Ordered Items:</p>
      {orderedItems.map((product) => {
        return (
          <div
            className='flex flex-col md:flex-row p-2 md:p-0 md:pr-4 mb-2 gap-4 items-center  justify-between border-2  '
            key={product.id}
          >
            <div className='flex gap-6 items-center '>
              <img
                className=' object-cover w-16 h-16 '
                src={`${server}/files/${product.image}`}
                alt={product.image}
              />
              <p className=' '>{product.name}</p>
            </div>
            <div className=' flex gap-8 items-center justify-between md:w-[400px]'>
              <p>Price: &euro; {toDecimal(product.price)}</p>

              {/* quantity selector */}
              <div className='flex gap-2 items-center'>
                Quantity:{' '}
                <div className='flex items-center gap-4 p-2'>
                  {product.ordered_quantity}
                </div>
              </div>
              <p>Subtotal: &euro; {toDecimal(product.subtotal)}</p>
            </div>
          </div>
        );
      })}
      <div className='flex justify-between mt-4 mb-8'>
        <h3 className='font-bold'>
          Order status: {order.status.toUpperCase()}
        </h3>
        <p className='text-xl font-bold text-right  mr-6'>
          Total: &euro; {toDecimal(order.total)}
        </p>
      </div>
    </div>
  );
}

export default SingleOrder;
