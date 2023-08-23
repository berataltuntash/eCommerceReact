import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { CartProvider } from '../CartContext';

// Mock the CartContext
jest.mock('../CartContext', () => ({
  useCart: () => ({
    cartState: { items: [] }, // Set an empty cart for testing purposes
    cartDispatch: jest.fn(),
  }),
}));

// Sample products data for testing
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    Image: 'sample-image-url-1',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 15,
    Image: 'sample-image-url-2',
  },
  // Add more sample products if needed
];

// Mock the data module that provides the products
jest.mock('../data/products', () => products);

test('renders home page with products', () => {
  render(
    <CartProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </CartProvider>
  );

  // Assert that the page title is rendered
  expect(screen.getByText(/Welcome to the E-commerce Store/i)).toBeInTheDocument();

  // Assert that the products are displayed on the page
  expect(screen.getAllByRole('img')).toHaveLength(products.length);
  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
});

test('clicking "Add to Cart" button adds the product to cart', () => {
  const { cartDispatch } = jest.requireMock('../CartContext').useCart();

  render(
    <CartProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </CartProvider>
  );

  // Click on the "Add to Cart" button for the first product
  const addToCartButton = screen.getAllByText(/Add to Cart/i)[0];
  fireEvent.click(addToCartButton);

  // Assert that the cartDispatch function was called with the correct action
  expect(cartDispatch).toHaveBeenCalledWith({
    type: 'ADD_TO_CART',
    payload: { ...products[0], quantity: 1 },
  });
});
