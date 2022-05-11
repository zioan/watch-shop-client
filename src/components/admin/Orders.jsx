import { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/OrderContext';
import SingleOrderComponent from './SingleOrderComponent';

function Orders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const { allOrders } = useContext(OrderContext);

  useEffect(() => {
    filterOrdersByStatus();
  }, [allOrders]);

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
      <h2 className=' mt-4 mb-6 text-2xl text-center font-bold'>Orders</h2>
      <div className='flex justify-center mb-8'>
        <button
          className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab1')}
        >
          Pending Orders
        </button>
        <button
          className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
          onClick={() => setActiveTab('tab2')}
        >
          Completed Orders
        </button>
      </div>
      {activeTab === 'tab1' &&
        pendingOrders.map((order) => {
          return <SingleOrderComponent key={order.id} order={order} />;
        })}
      {activeTab === 'tab2' &&
        completedOrders.map((order) => {
          return <SingleOrderComponent key={order.id} order={order} />;
        })}
    </>
  );
}

export default Orders;
