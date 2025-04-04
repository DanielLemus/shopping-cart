import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '@/components/ProductCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/slices/cartSlice';
import { IProduct } from '@/store/slices/productsSlice';

const mockProduct: IProduct = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product',
  price: 19.99,
  image: 'https://example.com/image.jpg'
};

const renderWithProvider = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('ProductCard', () => {
  it('renders product title and price', () => {
    renderWithProvider(<ProductCard {...mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/)).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    renderWithProvider(<ProductCard {...mockProduct} />);
    const button = screen.getByRole('button', { name: /add to cart/i });
    userEvent.click(button);
  });
});
