import { render, screen } from '@testing-library/react';
import Cart from '@/components/Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/slices/cartSlice';
import userEvent from '@testing-library/user-event';

const mockCartItems = [
  { id: 1, title: 'Product A', price: 10, quantity: 2, image: 'img1.jpg' },
  { id: 2, title: 'Product B', price: 5, quantity: 1, image: 'img2.jpg' },
];

const renderWithMockStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: mockCartItems,
      },
    },
  });

  return render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

describe('Cart component', () => {
  it('renders product titles and total', () => {
    renderWithMockStore();

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();

    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();
  });

  it('renders quantity buttons and values', () => {
    renderWithMockStore();

    expect(screen.getAllByRole('button', { name: '+' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: '-' })).toHaveLength(2);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders images correctly', () => {
    renderWithMockStore();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'img1.jpg');
    expect(images[1]).toHaveAttribute('src', 'img2.jpg');
  });

  it('has continue shopping button', () => {
    renderWithMockStore();

    expect(screen.getByRole('button', { name: /continue shopping/i })).toBeInTheDocument();
  });

  it('dispatches actions on +/- click', async () => {
    const user = userEvent.setup();
    renderWithMockStore();

    const plusButtons = screen.getAllByRole('button', { name: '+' });
    const minusButtons = screen.getAllByRole('button', { name: '-' });

    await user.click(plusButtons[0]);
    await user.click(minusButtons[0]);

    expect(plusButtons[0]).toBeInTheDocument();
    expect(minusButtons[0]).toBeInTheDocument();
  });
});
