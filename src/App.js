import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { useContext, useEffect } from 'react';
import ProductContext from './context/ProductContext';

axios.defaults.withCredentials = true;

function App() {
  const { getProducts } = useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Router>
      <div className='flex flex-col gap-2 md:gap-8 min-h-screen'>
        <Navbar />
        <main className='container mx-auto grow'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/product/:product_id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/about' element={<About />} />
            {/* <Route path='/contact' element={<Contact />} /> */}
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
