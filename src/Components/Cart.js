import React from 'react';
import { useCart } from '../Context/CartContext';
import './Cart.css';
import '../Pages/ProductCard.css';
import '../Pages/ProductList.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountprice || item.price;
      return total + price * item.selectedQuantity;
    }, 0);
  };

  // Calculate total price
  const totalPrice = calculateTotalPrice();

  if (cartItems.length === 0) {
    return <div className="cart">Your cart is empty!</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="product-grid">
        <ul>
          {cartItems.map((item, index) => (
            <li className="product-card" key={index}>
              <img className="product-image" src={item.selectedColor.images[0]} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Color: {item.selectedColor.colorName}</p>
                <p>Size: {item.selectedSize}</p>
                <p>Price: ${item.discountprice || item.price}</p>
                <p>Quantity: {item.selectedQuantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="total-price">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
      <button className="clear-cart" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
