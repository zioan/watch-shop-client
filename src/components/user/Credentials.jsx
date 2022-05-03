import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import UserContext from '../../context/UserContext';

function Credentials() {
  const { updateUserEmail, updateUserPassword, error } =
    useContext(UserContext);
  const { user } = useContext(AuthContext);

  const [updateEmailField, setUpdateEmailField] = useState(false);
  const [updatePasswordField, setUpdatePasswordField] = useState(false);

  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showError, setShowError] = useState('');

  const updateEmail = (e) => {
    e.preventDefault();

    if (!email) {
      setShowError('Email cannot be empty!');
      return;
    } else {
      setShowError('');
    }

    updateUserEmail(email);
  };

  const updatePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setShowError('Your new password does not match!');
      return;
    } else {
      setShowError('');
    }

    updateUserPassword(currentPassword, newPassword);
  };

  return (
    <section className='flex flex-col items-center'>
      <h2 className=' text-center text-2xl mb-6'>Update your Credentials</h2>
      <h3 className='text-xl text-warning my-6'>
        After updating you need to log in again!
      </h3>

      {/* Update user email */}
      <div className='divider my-6'>
        <button
          className='btn btn-ghost mb-4 underline'
          onClick={() => setUpdateEmailField(!updateEmailField)}
        >
          {updateEmailField ? 'Cancel email update' : 'Update your email'}
        </button>
      </div>

      {updateEmailField && (
        <form onSubmit={updateEmail}>
          <p>
            Current email address:{' '}
            <span className='font-bold'>{user && user.email}</span>
          </p>
          {/* Email field */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='email'
              required
              className='input input-bordered'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {showError && <p className=' text-red-400'>{showError}</p>}
          <button className='btn my-4' type='submit'>
            Update Email
          </button>
        </form>
      )}

      {/* Update user password */}
      <div className='divider my-6'>
        <button
          className='btn btn-ghost mb-4 underline'
          onClick={() => setUpdatePasswordField(!updatePasswordField)}
        >
          {updatePasswordField
            ? 'Cancel password update'
            : 'Update your password'}
        </button>
      </div>

      {updatePasswordField && (
        <form onSubmit={updatePassword}>
          {/* Password field */}
          <div className='form-control mb-6'>
            <label className='label'>
              <span className='label-text'>Current password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm current password'
              required
              className='input input-bordered'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>New password</span>
            </label>
            <input
              type='password'
              placeholder='New password'
              required
              className='input input-bordered'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm password field */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Confirm new password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm new password'
              required
              className='input input-bordered'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          {showError && <p className=' text-red-400'>{showError}</p>}
          {error && <p className=' text-red-400'>{error}</p>}

          <button className='btn my-4' type='submit'>
            Update Password
          </button>
        </form>
      )}
    </section>
  );
}

export default Credentials;
