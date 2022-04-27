import { useState } from 'react';
import Modal from '../components/Modal';
import Register from '../components/Register';
import Login from '../components/Login';

function Home() {
  return (
    <>
      <h2>Home Page</h2>

      <Modal modalNumber='modal-1' type='register'>
        <Register />
      </Modal>

      <Modal modalNumber='modal-2' type='login'>
        <Login />
      </Modal>
    </>
  );
}

export default Home;
