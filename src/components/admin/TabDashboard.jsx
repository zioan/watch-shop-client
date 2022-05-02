import { useState } from 'react';
import Media from './Media';
import NewProductTemplate from './NewProductTemplate';
import Products from './Products';

function TabDashboard() {
  const [activeTab, setActiveTab] = useState('tab0');

  return (
    <>
      <h2>TabDashboard</h2>
      <div className=' flex flex-col md:flex-row border-2 border-base-200 md:min-h-[500px] m-2'>
        <div className=' md:max-w-xs md:mr-4 border-b-2 md:border-b-0 md:border-r-2 border-base-200 md:w-48'>
          <ul className='flex flex-col gap-2'>
            <li
              onClick={() => setActiveTab('tab1')}
              className={activeTab === 'tab1' ? 'tab active-tab' : ' tab'}
            >
              Products
            </li>
            <li
              onClick={() => setActiveTab('tab2')}
              className={activeTab === 'tab2' ? 'tab active-tab' : ' tab'}
            >
              New Product
            </li>
            <li
              onClick={() => setActiveTab('tab3')}
              className={activeTab === 'tab3' ? 'tab active-tab' : 'tab'}
            >
              Media Gallery
            </li>
          </ul>
        </div>
        <div className='p-4 w-full '>
          {activeTab === 'tab1' && <Products />}
          {activeTab === 'tab2' && <NewProductTemplate />}
          {activeTab === 'tab3' && <Media />}
        </div>
      </div>
    </>
  );
}

export default TabDashboard;
