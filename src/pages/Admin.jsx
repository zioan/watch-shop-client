import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewProductTemplate from '../components/admin/NewProductTemplate';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';

function Admin() {
  const { user } = useContext(AuthContext);
  const { products, createProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  // If no user or user is no admin redirect to home page
  useEffect(() => {
    if (!user || user.admin !== 1) {
      navigate('/');
    }
  }, [user]);

  console.log(products);

  return (
    <>
      <NewProductTemplate />
    </>
  );
}

export default Admin;
