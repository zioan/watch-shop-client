import { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/OrderContext';
import SingleOrderComponent from './SingleOrderComponent';

function Orders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const { allOrders } = useContext(OrderContext);

  useEffect(() => {
    filterOrdersByStatus();
  }, []);

  const filterOrdersByStatus = () => {
    setPendingOrders([]);
    setCompletedOrders([]);
    allOrders.map((order) => {
      if (order.status === 'pending') {
        setPendingOrders((prevState) => [...prevState, order]);
      } else {
        setCompletedOrders((prevState) => [...prevState, order]);
      }
      return order;
    });
  };

  return (
    <>
      <h2 className='text-xl text-center mb-6'>Orders</h2>
      {pendingOrders.map((order) => {
        return <SingleOrderComponent key={order.id} order={order} />;
      })}
    </>
  );
}

export default Orders;
