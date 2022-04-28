import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';

function Auth() {
  const [toggleAuthComponent, setToggleAuthComponent] = useState(true);

  const { user } = useContext(AuthContext);
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  // when user is logged in, redirect to home page
  // logged in user cannot access to this page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const testAccountUserLogin = async () => {
    const email = 'john@test.com';
    const password = 'asdasd123123';
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const testAccountAdminLogin = async () => {
    const email = 'admin@test.com';
    const password = 'asdasd123123';
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className=' mx-auto'>
      {/* Customer demo login */}
      <h2 className='text-3xl mb-4 lg:mb-10 text-center'>
        Click{' '}
        <span
          className=' underline cursor-pointer'
          onClick={() => testAccountUserLogin()}
        >
          HERE
        </span>{' '}
        for customer demo account.
      </h2>

      {/* Admin demo login */}
      <h2 className='text-3xl mb-4 lg:mb-10 text-center'>
        Click{' '}
        <span
          className=' underline cursor-pointer'
          onClick={() => testAccountAdminLogin()}
        >
          HERE
        </span>{' '}
        for admin demo account.
      </h2>

      {/* Toggle login / register components */}
      {toggleAuthComponent ? <Login /> : <Register />}

      {toggleAuthComponent ? (
        <p className=' text-center my-6'>
          No account?{' '}
          <button
            className='underline'
            onClick={() => setToggleAuthComponent(false)}
          >
            Register here
          </button>
        </p>
      ) : (
        <p className=' text-center my-6'>
          Already have an account?{' '}
          <button
            className='underline'
            onClick={() => setToggleAuthComponent(true)}
          >
            Login here
          </button>
        </p>
      )}
    </section>
  );
}

export default Auth;
