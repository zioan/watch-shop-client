import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/user/Menu';
import AuthContext from '../context/AuthContext';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Menu />
    </>
  );
}

export default UserProfile;
