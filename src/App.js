import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      {/* <div className='flex flex-col justify-between  min-h-[calc(100vh-96px)]'> */}
      <div className='flex flex-col justify-between  min-h-screen'>
        <Navbar />
        <main className=' container mx-auto px-3 pb-12 relative'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/auth' element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
