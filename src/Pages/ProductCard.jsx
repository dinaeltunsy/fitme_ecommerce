import React, { useState, useEffect } from 'react';
import './ProductCard.css'; // Optional: Custom styling for product cards
import { useCart } from '../Context/CartContext'; // Import Cart Context
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // State to keep track of selected color, size, and quantity
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Default to first color
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);



  const { addToCart } = useCart(); // Access addToCart function from Cart Context



  const navigate = useNavigate(); // For navigation

  // Function to handle size selection
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  // Function to handle color selection and update image
  const handleColorChange = (e) => {
    const selectedColorName = e.target.value;
    const selectedColorObject = product.colors.find(color => color.colorName === selectedColorName);
    setSelectedColor(selectedColorObject);
  };

  const handleQuantity = (e) => {
    setSelectedQuantity(e.target.value);
  };

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, selectedQuantity); // Add the product with selected options to the cart
  };

  // Function to get background color based on product type
  const getBackgroundColor = () => {
    if (product.category === 'Men') {
      return 'black';
    } else if (product.category === 'Women') {
      return 'pink';
    } else if (product.category === 'Kids') {
      return 'lightblue'; // Baby blue for kids
    } else {
      return 'white'; // Default background color
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`); // Navigate to product-specific page
  };

  return (
    <div className="product-card">
      {/* Display the first image of the selected color */}
      <img
        src={selectedColor.images[0]} // Using the first image of the selected color
        alt={`${product.name} - ${selectedColor.colorName}`}
        className="product-image" onClick={handleCardClick}
      />
      <h3 className='product-name'style={{backgroundColor:getBackgroundColor()}}>{product.name}</h3>

      {/* Conditional rendering for price with discount */}
      <div className="product-price-section">
        {product.discountprice ? (
          <>
            {/* Original price crossed out */}
            <span className="product-original-price">${product.price}</span>
            {/* Discount price */}
            <span className="product-discount-price">${product.discountprice}</span>
          </>
        ) : (
          <span className="product-price">${product.price}</span>
        )}
      </div>

      {/* Dropdown for color selection */}
      <div className="product-colors">
        <label htmlFor={`color-${product.id}`}>Color:</label>
        <select
          id={`color-${product.id}`}
          value={selectedColor.colorName}
          onChange={handleColorChange}
        >
          {product.colors.map((color, index) => (
            <option key={index} value={color.colorName}>
              {color.colorName}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for size selection */}
      <div className="product-sizes">
        <label htmlFor={`size-${product.id}`}>Size:</label>
        <select
          id={`size-${product.id}`}
          value={selectedSize}
          onChange={handleSizeChange}
        >
          {product.sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="product-quantity">
        <label htmlFor={`quantity-${product.id}`}>Quantity</label>
        <input type='number' max={10} min={1} defaultValue={1} onChange={handleQuantity} required/>
      </div>

      {/* Add to Cart button */}
      {(selectedQuantity > 10 || selectedQuantity <1) ? <p style={{color: 'red'}}>Your quantity should be between 1 to 10 item(s) for more info contact our team. </p>: 
          <button className="buy-button" onClick={handleAddToCart}>
          Add to Cart <br />
          <span>(Color: {selectedColor.colorName}, Size: {selectedSize})</span>
        </button>
    
    }

    </div>
  );
};

export default ProductCard;
