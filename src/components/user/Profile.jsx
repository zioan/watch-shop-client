import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import UserContext from '../../context/UserContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const { updateUserProfile } = useContext(UserContext);

  const [updateForm, setUpdateForm] = useState(false);

  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [address, setAddress] = useState(user.address);

  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  const showUpdateForm = () => {
    setUpdateForm(!updateForm);
  };

  const updateProfile = (e) => {
    e.preventDefault();

    try {
      setAddress(`${street} ${houseNumber}, ${zipCode}, ${country}`);
      const updatedAddress = `${street} ${houseNumber}, ${zipCode}, ${country}`;
      updateUserProfile(name, surname, updatedAddress);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <h2 className=' text-center text-2xl mb-6'>Profile</h2>

      {/* Display user profile */}
      {user && (
        <div
          className={
            updateForm ? 'flex flex-col md:flex-row justify-evenly' : ''
          }
        >
          <div className='mx-4 '>
            <p>
              <span className=' font-bold'>Name:</span> {name}
            </p>
            <p>
              <span className=' font-bold'>Surname:</span> {surname}
            </p>
            <p>
              <span className=' font-bold'>Delivery Address:</span> {address}
            </p>

            <h3 className='text-xl text-warning mt-6'>
              After updating your profile you need to log in again!
            </h3>

            <button
              className='btn btn-ghost mb-4 underline'
              onClick={showUpdateForm}
            >
              {updateForm ? 'Cancel update' : 'Update profile'}
            </button>
          </div>

          {/* Update user profile */}
          {updateForm && (
            <form className=' max-w-xl flex-grow mx-4' onSubmit={updateProfile}>
              <h3 className='text-xl mb-2'>Update your profile</h3>

              {/* Name field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  placeholder='name'
                  required
                  className='input input-bordered'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Surname field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Surname</span>
                </label>
                <input
                  type='text'
                  placeholder='Surname'
                  required
                  className='input input-bordered'
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>

              {/* Street field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Street</span>
                </label>
                <input
                  type='text'
                  placeholder='Street'
                  required
                  className='input input-bordered'
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              {/* House number field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>House number</span>
                </label>
                <input
                  type='text'
                  placeholder='House number'
                  required
                  className='input input-bordered'
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </div>

              {/* Zip code field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Zip code</span>
                </label>
                <input
                  type='text'
                  placeholder='Zip code'
                  required
                  className='input input-bordered'
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              {/* Country field */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Country</span>
                </label>
                <input
                  type='text'
                  placeholder='Country'
                  required
                  className='input input-bordered'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <button type='submit' className='btn my-4'>
                Update Changes
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

export default Profile;
