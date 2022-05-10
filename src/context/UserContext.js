import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import server from '../util/server';
import AuthContext from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const { user, getUser } = useContext(AuthContext);

  const login = async (email, password) => {
    const loginDetails = {
      email,
      password,
    };
    try {
      const userRes = await axios.post(`${server}/users/login`, loginDetails);
      getUser();
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const registerUser = async (
    isAdmin,
    name,
    surname,
    address,
    email,
    password
  ) => {
    const registerData = {
      admin: isAdmin,
      name,
      surname,
      address,
      email,
      password,
    };
    try {
      const userRes = await axios.post(
        `${server}/users/register`,
        registerData
      );
      getUser();
      setError('');
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const updateUserProfile = async (name, surname, address) => {
    const userData = { name, surname, address };
    try {
      await axios.put(`${server}/users/update/${user.id}`, userData);
      logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserEmail = async (email) => {
    const userData = { email };
    try {
      await axios.put(`${server}/users/update/email/${user.id}`, userData);
      logoutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const userData = {
      email: user.email,
      password: currentPassword,
      newPassword: newPassword,
    };
    try {
      await axios.put(`${server}/users/update/password/${user.id}`, userData);
    } catch (error) {
      console.log(error);
      setError('Your current password is incorrect');
      return;
    }
    setError('');
    logoutUser();
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${server}/users/logout`);
      getUser();
      setError('');
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerDetails = async (id) => {
    setCustomerDetails(null);
    try {
      const customerRes = await axios.get(`${server}/users/find/${id}`);
      setCustomerDetails(customerRes.data[0]);
      console.log(customerRes.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        login,
        logoutUser,
        registerUser,
        updateUserProfile,
        updateUserEmail,
        updateUserPassword,
        getCustomerDetails,
        customerDetails,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
