import { Link } from 'react-router-dom';
import sliderImg1 from '../../assets/slider1.jpg';

function HomeHeader() {
  return (
    <div className='hero min-h-[500px] bg-base-200 mb-6'>
      <div className='hero-content flex-col lg:flex-row-reverse lg:gap-20'>
        <img
          src={sliderImg1}
          alt='watch in beautiful nature landscape'
          className='max-w-sm rounded-lg shadow-2xl'
        />
        <div>
          <h1 className='text-5xl font-bold'>Watch Store Demo</h1>
          <p className='pt-6 pb-4'>
            Watch Store is a shopping application built with React and Tailwind
            CSS, while backend is powered by Node and MySQL.
          </p>
          <p className='pb-6'>
            Demo accounts are avilable{' '}
            <Link to='/auth' className='underline'>
              here
            </Link>
            . Enjoy!
          </p>

          <Link className='btn btn-primary' to='/about'>
            Find More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
