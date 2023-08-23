import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/ShoppingCart.css';
import axios from 'axios';
import { useCart } from '../CartContext';

const baseURL = 'http://localhost:8080/api/cart';
const cartaddURL = 'http://localhost:8080/api/cart/add';
const cartdecURL = 'http://localhost:8080/api/cart/decrement';
const cartdelURL = 'http://localhost:8080/api/cart/delete';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user_id, isAuthenticated } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.get(baseURL, { params: { user_id } })
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items', error);
      });
  };

  const handleIncrement = (productId) => {
    const cartData = {
      productId: productId,
      userId: user_id,
    };

    axios.post(cartaddURL, cartData, { headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        fetchCartItems();
      })
      .catch(error => {
        console.error('Error incrementing item', error);
      });
  };

  const handleDecrement = (productId) => {
    const cartData = {
      productId: productId,
      userId: user_id,
    };

    axios.delete(cartdecURL, { data: cartData, headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        fetchCartItems();
      })
      .catch(error => {
        console.error('Error decrementing item', error);
      });
  };

  const handleRemoveItem = (productId) => {
    const cartData = {
      productId: productId,
      userId: user_id,
    };

    axios.delete(cartdelURL, { data: cartData, headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        fetchCartItems();
      })
      .catch(error => {
        console.error('Error removing item', error);
      });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items to your cart before checking out.');
      return;
    }

    if (!isAuthenticated) {
      alert('Please log in before proceeding to checkout.');
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="shopping-cart">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className="cart-item">
            <h2>{cartItem.product.name}</h2>
            <Link to={`/product/${cartItem.product.id}`}>
              <img src={cartItem.product.Image} alt={cartItem.product.name} />
            </Link>
            <div className="item-details">
              <h3>{cartItem.product.name}</h3>
              <p>Price: ${cartItem.product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(cartItem.product.id)}>-</button>
                <p>Quantity: {cartItem.quantity}</p>
                <button onClick={() => handleIncrement(cartItem.product.id)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveItem(cartItem.product.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <p>Total Price: ${getTotalPrice()}</p>
      </div>
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default ShoppingCart;
