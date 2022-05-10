import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import server from '../util/server';
import AuthContext from './AuthContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllOrders();
    // getUserOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const orderRes = await axios.get(`${server}/orders/all`);
      setAllOrders(orderRes.data);
      setLoading(false);
      setError('');
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  const getUserOrders = async () => {
    try {
      setLoading(true);
      const orderRes = await axios.get(`${server}/orders/user/${user.id}`);

      // Newest order first
      const sortedOrdersByDate = await orderRes.data.sort((a, b) => {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      });
      setUserOrders(sortedOrdersByDate);
      setLoading(false);
      setError('');
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  const createOrder = async (cart, cartTotal) => {
    const orderData = {
      user_id: user.id,
      status: 'pending',
      order_data: cart,
      total: cartTotal,
    };
    console.log(orderData);
    try {
      await axios.post(`${server}/orders/add`, orderData);

      getAllOrders();
      getUserOrders();
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  const updateOrderStatus = async (id, status) => {
    const newStatus = { status };
    try {
      await axios.put(`${server}/orders/update/${id}`, newStatus);
      getAllOrders();
      getUserOrders();
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  const deleteOrder = (id) => {
    try {
      axios.delete(`${server}/orders/delete/${id}`);
      getAllOrders();
      getUserOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        allOrders,
        userOrders,
        getAllOrders,
        getUserOrders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        error,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
