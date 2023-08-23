import React from 'react';
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { useCart } from '../CartContext'; // Update the path to your CartContext

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, setUser_id } = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser_id(0)
    navigate('/')

  };
  
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/cart" className="nav-link">
            Go to Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
