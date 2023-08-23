// HomePage.js
import { useCart } from '../CartContext';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/HomePage.css';

const baseURL = 'http://localhost:8080/api/products'
const cartaddURL = 'http://localhost:8080/api/cart/add'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { user_id } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try{
      const response = await axios.get(baseURL);
      setProducts(response.data); 
    }
    catch (error){
      console.log('error',error);
    }
  
  };


  const handleAddToCart = (product) => {
    const cartData = {
      productId: product.id,
      userId: user_id
    };
    axios.post(cartaddURL, cartData ,{ headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log('Item added to cart', response);
      })
      .catch(error => {
        console.error('Error adding item to cart', error);
      });
  };
  
  return (
    <div className="home-page">
      <h1 className="page-title">Welcome to the E-commerce Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            {/* Use Link to ProductDetailsPage for product name and image */}
            <Link to={`/product/${product.id}`}>
              <img src={product.Image} alt={product.name} />
              <h2>{product.name}</h2>
            </Link>
            <p className="product-price">Price: ${product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
