// ProductDetailsPage.js
import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styling/ProductDetails.css';
import axios from 'axios';
import { useCart } from '../CartContext';

const cartaddURL = 'http://localhost:8080/api/cart/add'
const baseURL = 'http://localhost:8080/api/products';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user_id } = useCart();

  useEffect(() => {
    // Fetch product details from the backend based on the provided id
    axios.get(`${baseURL}/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cartData = {
      productId: product.id,
      userId: user_id
    };
    axios.post(cartaddURL, cartData, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log('Item added to cart', response);
      })
      .catch(error => {
        console.error('Error adding item to cart', error);
      });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <div className="product-details">
        <div className="image-block">
          <img src={product.Image} alt={product.name} />
        </div>
        <div className="info-block">
          <h2 className="item-name">{product.name}</h2>
          <p className="price">${product.price}</p>
          <p className="description">{product.describtion}</p>
          <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
