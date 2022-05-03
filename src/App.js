import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className='flex flex-col gap-2 md:gap-8 min-h-screen'>
        <Navbar />
        <main className='container mx-auto grow'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
