import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Credentials from './Credentials';
import Orders from './Orders';
import Profile from './Profile';

function Menu() {
  const [activeComponent, setActiveComponent] = useState('comp1');
  const { user } = useContext(AuthContext);
  return (
    <>
      <ul className='flex mx-auto gap-2 flex-wrap justify-center mb-8 pb-8 shadow-sm'>
        <li
          className={
            activeComponent === 'comp1'
              ? 'tab active-tab rounded-lg'
              : ' tab rounded'
          }
          onClick={() => setActiveComponent('comp1')}
        >
          Profile
        </li>
        <li
          className={
            activeComponent === 'comp2'
              ? 'tab active-tab rounded-lg'
              : ' tab rounded'
          }
          onClick={() => setActiveComponent('comp2')}
        >
          Credentials
        </li>
        {/* <li
          className={
            activeComponent === 'comp3'
              ? 'tab active-tab rounded-lg'
              : ' tab rounded'
          }
          onClick={() => setActiveComponent('comp3')}
        >
          Payment methods
        </li> */}
        <li
          className={
            activeComponent === 'comp4'
              ? 'tab active-tab rounded-lg'
              : ' tab rounded'
          }
          onClick={() => setActiveComponent('comp4')}
        >
          {' '}
          Orders
        </li>
      </ul>

      <section>
        {activeComponent === 'comp0' && (
          <p className=' text-center'>
            {user && user.name.toUpperCase()}, welcome to your profile page
          </p>
        )}
        {activeComponent === 'comp1' && <Profile />}
        {activeComponent === 'comp2' && <Credentials />}
        {/* {activeComponent === 'comp3' && < />} */}
        {activeComponent === 'comp4' && <Orders />}
      </section>
    </>
  );
}

export default Menu;
