import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import SpringCollection from './Collections/Spring';
import SummerCollection from './Collections/Summer';
import FallCollection from './Collections/Fall';
import WinterCollection from './Collections/Winter';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Registration';
import Cart from './Components/Cart';
import { CartProvider } from './Context/CartContext';
import ProductList from './Pages/ProductList';
import AdminLogin from './Admin/AdminLogin';
import AdminRegistration from './Admin/AdminRegistration';
import ProductForm from './Admin/ProductForm';
import Onsale from './Pages/Sections/Onsale';
import Men from './Pages/Sections/Men';
import Women from './Pages/Sections/Women';
import React, { useState } from 'react';
import Kids from './Pages/Sections/Kids';
import Footer from './Components/Footer';




function App() {
  const [userName, setUserName] = useState('');

  return (
    <div className="App">
      
      <>

      <CartProvider>
          
          <Router>

          <Navbar userName={userName} />
          
            <Routes>
              <Route path="/" element={<Home/>} ></Route>
              <Route path="/shop" element={<Shop/>}></Route>
              <Route path="/collections/spring" element={<SpringCollection />} />
              <Route path="/collections/summer" element={<SummerCollection />} />
              <Route path="/collections/fall" element={<FallCollection />} />
              <Route path="/collections/winter" element={<WinterCollection />} />
              <Route path="/about" element={<About/>} ></Route>
              <Route path="/contact" element={<Contact/>} ></Route>
              <Route path="/login"  element={<Login setUserName={setUserName} />}/>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path='/admin/adminlogin' element={<AdminLogin/>}/>
              <Route path='/admin/adminregistration' element={<AdminRegistration/>}/>
              <Route path='/admin/productform' element={<ProductForm/>}/>
              <Route path='/pages/shop' element={<Shop/>}></Route>
              <Route path='/pages/onsale' element={<Onsale/>}></Route>
              <Route path='/pages/sections/men' element={<Men/>}></Route>
              <Route path='/pages/sections/women' element={<Women/>}></Route>
              <Route path='/pages/sections/kids' element={<Kids/>}></Route>

            </Routes>

          </Router>

        </CartProvider>
      
      </>
      <Footer/>
        


      

    </div>
  );
}

export default App;
