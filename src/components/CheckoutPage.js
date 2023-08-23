import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/CheckoutPage.css';
import axios from 'axios';
import { useCart } from '../CartContext';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [creditCardNo, setCreditCardNo] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCVV] = useState('');
  const { user_id, isAuthenticated } = useCart();
  const navigate = useNavigate();

  const handlePay = () => {
    if (!address || !creditCardNo || !expiryMonth || !expiryYear || !cvv) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/^\d{16}$/.test(creditCardNo)) {
      alert('Credit card number must be 16 digits.');
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert('CVV must be a 3-digit number.');
      return;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    const parsedExpiryMonth = Number(expiryMonth);
    const parsedExpiryYear = Number(expiryYear);
    if (parsedExpiryYear < currentYear || (parsedExpiryYear === currentYear && parsedExpiryMonth < currentMonth)) {
      alert('Invalid expiry date.');
      return;
    }

    // Check if the expiry month is smaller than 12
    if (parsedExpiryMonth > 12) {
      alert('Expiry month must be smaller than 12.');
      return;
    }


    axios.post('http://localhost:8080/api/order', user_id, {headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        // Redirect to the "Thank You" page after successful payment
        navigate('/thank-you');
      })
      .catch(error => {
        console.error('Error creating order', error);
      });
  };

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="address-block">
        <h2>Shipping Address</h2>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="payment-block">
        <h2>Payment Information</h2>
        <input
          type="text"
          placeholder="Credit Card Number"
          value={creditCardNo}
          onChange={(e) => setCreditCardNo(e.target.value.replace(/\D/g, ''))}
        />
        <div className="expiry-cvv-block">
          <input
            type="text"
            placeholder="MM"
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
          />
          <span>/</span>
          <input
            type="text"
            placeholder="YY"
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 2))}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCVV(e.target.value.replace(/\D/g, '').slice(0, 3))}
          />
        </div>
      </div>
      <button className="pay-btn" onClick={handlePay}>
        Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
