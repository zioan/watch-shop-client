import { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';

function Navbar() {
  const [togglerResponsiveNav, setTogglerResponsiveNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user } = useContext(AuthContext);
  const { logoutUser } = useContext(UserContext);

  const navigate = useNavigate();

  const hamburgerHandler = () => {
    setTogglerResponsiveNav(!togglerResponsiveNav);
  };

  // If no user, hide user dropdown and navigate to login page
  const checkUser = () => {
    if (!user) {
      setUserDropdown(false);
      navigate('/auth');
    } else {
      setUserDropdown(true);
    }
  };

  const logoutHandler = () => {
    setUserDropdown(false);
    logoutUser();
  };

  return (
    <div className=' h-auto md:h-24 p-2 shadow-lg  '>
      <nav className='navbar container mx-auto flex justify-between md:items-center'>
        {/* Logo */}
        <Link to='/' className=' flex items-center gap-2 self-start'>
          <AiOutlineFieldTime className=' text-4xl inline' />
          <p className='inline text-2xl'>Watch Store</p>
        </Link>

        {/* Nav links */}
        <div
          className={
            togglerResponsiveNav
              ? 'flex flex-col gap-4 md:inline'
              : 'hidden md:inline'
          }
        >
          <NavLink className=' btn btn-ghost mx-2' to='/'>
            Home
          </NavLink>
          <NavLink className=' btn btn-ghost mx-2' to='/about'>
            About
          </NavLink>
          <NavLink className=' btn btn-ghost mx-2' to='/contact'>
            Contact
          </NavLink>
        </div>

        {/* Cart */}
        <div className='self-start'>
          <div className='dropdown dropdown-end'>
            <label tabIndex='0' className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <span className='badge badge-sm indicator-item'>8</span>
              </div>
            </label>
            <div
              tabIndex='0'
              className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
            >
              <div className='card-body'>
                <span className='font-bold text-lg'>8 Items</span>
                <span className='text-info'>Subtotal: $999</span>
                <div className='card-actions'>
                  <button className='btn btn-primary btn-block'>
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User */}
          <div className='dropdown dropdown-end'>
            {user ? (
              <button className=' btn btn-ghost' onClick={checkUser}>
                {user.name}
              </button>
            ) : (
              <button
                className=' btn btn-ghost rounded-full'
                onClick={checkUser}
              >
                <FaRegUser className='mx-auto text-xl ' />
              </button>
            )}
            {/* <label
              tabIndex='0'
              className='btn btn-ghost btn-circle min-w-[48px] w-auto avatar'
              // onClick check if user.
              onClick={checkUser}
            >
              <div className='w-10 rounded-full'>
                {user ? (
                  <p className=' mt-3 mx-auto'>{user.name}</p>
                ) : (
                  <FaRegUser className='mx-auto text-xl mt-[10px]' />
                )}
              </div>
            </label> */}

            {/* If user is logged in, display user dropdown */}
            {userDropdown && (
              <ul
                tabIndex='0'
                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-28'
              >
                <li>
                  <button className='justify-between'>
                    Profile
                    {/* <span className='badge'>New</span> */}
                  </button>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            )}
          </div>

          <label
            tabIndex='0'
            className='btn btn-ghost btn-circle  inline md:hidden'
            onClick={hamburgerHandler}
          >
            {togglerResponsiveNav ? (
              <p className='mx-auto text-2xl font-bold  mt-[6px]'>X</p>
            ) : (
              <FaBars className='mx-auto text-xl mt-[14px]' />
            )}
          </label>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
