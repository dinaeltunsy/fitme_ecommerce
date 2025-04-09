import React , {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import './Navbar.css'
import { useCart } from '../Context/CartContext';
import * as Icon from 'react-bootstrap-icons';
import { collection , getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const Navbar = ({userName}) => {

  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isSideDropDownOpen, setIsSideDropDownOpen] = useState(false);
  const [womenCategories, setWomenCategories] = useState([]);


  const handleMouseEnter = () => setIsDropDownVisible(true);
  const handleMouseLeave = () => setIsDropDownVisible(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const toggleSideDropDown = () =>{
    setIsSideDropDownOpen(!isSideDropDownOpen);
  }



  //Listing the navbar collection sub catergories as an array
  const DropDownList = [
    {label : "Spring Collection", path : '/collections/spring'},
    {label : "Summer Collection", path : '/collections/summer'},
    {label : "Fall Collection", path : '/collections/fall'},
    {label : "Winter Collection", path : '/collections/winter'},

  ];

    // Fetch categories under "Women" from Firebase Firestore
    useEffect(() => {
      const fetchWomenCategories = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          // Filter products for women and remove duplicates by type
          const womenProducts = categories.filter(product => product.category === 'Women');
          const uniqueTypes = Array.from(new Set(womenProducts.map(product => product.type)))
            .map(type => {
              return womenProducts.find(product => product.type === type);
            });
          
          setWomenCategories(uniqueTypes);
        } catch (error) {
          console.error("Error fetching women categories: ", error);
        }
      };
    
      fetchWomenCategories();
    }, []);


  
    
  return (
    <nav className='_navbar'>
        <div className="logo">FITME</div>
        <ul className={isOpen ? 'nav-links active': 'nav-links'}>
          
          <li><Link to="/">Home</Link></li>
          <li className="dropdown" onMouseEnter={toggleDropDown} onMouseLeave={toggleDropDown}>
          <Link to="/pages/shop"><span className="dropdown-toggle">Shop</span></Link>
          
              {isDropDownOpen && (
                
            <ul className="dropdown-menu">
            <li><Link to="/pages/sections/onsale">On Sale</Link></li>
            <li><Link to="/pages/sections/Kids">Kids</Link></li>

            <li><Link to="/pages/sections/men">Men</Link></li>

            {/* Women Dropdown */}
            <li className="dropdown" onMouseEnter={toggleSideDropDown} onMouseLeave={toggleSideDropDown}>
              <Link className="dropdown-toggle" to="/pages/sections/women">Women</Link>
              {isSideDropDownOpen && (
                <ul className="dropdown-menu">
                  {womenCategories.map((item) => (
                      <li key={item.id}><Link to={item.path}>{item.type}</Link></li>
                    ))}

                </ul>

                )}
            </li> 
            

          </ul>
              )}
          </li>
              
                  
          {/* Collections Drop-down */}
          <li className="dropdown" onMouseEnter={toggleDropDown} onMouseLeave={toggleDropDown}>
              <span className="dropdown-toggle">Collections</span>
              {isDropDownOpen && (
                <ul className="dropdown-menu">
                  {DropDownList.map(function(collectionList){
                    return(
                      <li key={collectionList.index}>
                        <Link to={collectionList.path}>{collectionList.label}</Link>
                      </li>
                    )
                  })}
                 
                </ul>
              )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

                    {/* Cart icon with item count */}
            <Link to="/cart" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              {cartItems.length > 0 && <span className="cart-count">{cartItems.length}🛒</span>}
            </Link>


            <div className='user-info' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {userName ? (<div><h5 className='user-title'>Welcome, {userName}</h5>
              <div className="dropdown-settings">
                  <Link to="/" className="dropdown-items"><span><Icon.PencilFill style={{fontSize:'25px', paddingRight:'10px'}}/></span>  Edit Profile</Link>
                  <Link to="/" className="dropdown-items"><span><Icon.Gear style={{fontSize:'25px', paddingRight:'10px'}}/></span>Account Settings</Link>
              </div></div>):( <div className="auth-icon"><Link to="/login"><FaUser /></Link></div>)}

              
            </div>

        
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

    </nav>
  )
}

export default Navbar