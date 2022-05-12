import { useContext, useEffect } from 'react';
import OrderContext from '../../context/OrderContext';
import SingleOrder from './SingleOrder';

function Orders() {
  const { userOrders, getUserOrders } = useContext(OrderContext);

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <h2 className='text-center text-2xl mb-6'>My Orders</h2>
      {userOrders.map((order) => {
        return <SingleOrder key={order.id} order={order} />;
      })}
    </>
  );
}

export default Orders;
