import React from 'react' 
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We are a leading streetwear brand, delivering the latest trends and
            styles for the fashion-forward generation.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: info@fitme.com</p>
          <p>Phone: +20 123 456 789</p>
          <p>Address: 123 New Cairo, Cairo</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} FITME. All Rights Reserved.
        <br/>Developed by : Dina Eltounsi
      </div>
    </footer>
  )
}

export default Footer