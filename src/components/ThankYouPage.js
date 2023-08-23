// ThankYouPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/ThankYouPage.css';

const ThankYouPage = () => {
  return (
    <div>
      <h1>Thank You for Your Purchase!</h1>
      <div className="links">
        <Link to="/" className="return-link">
          Return to Shopping
        </Link>
        <Link to="/order-details" className="order-details-link">
          Order Details
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
