import { render, screen } from '@testing-library/react';
import ProductList from '@/components/ProductList';
import useProducts from '@/hooks/useProducts';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { ICartState } from '@/store/slices/cartSlice';
import productsReducer, { IProductsState } from '@/store/slices/productsSlice';

jest.mock('@/hooks/useProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

const renderWithProvider = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
    preloadedState: {
      cart: { items: [] } as ICartState,
      products: {
        items: [],
        status: 'idle',
        error: null,
      } as IProductsState,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('ProductList', () => {
  it('renders skeletons when loading', async () => {
    mockedUseProducts.mockReturnValue({
      paginatedProducts: [],
      hasMore: false,
      status: 'loading',
      handleViewMore: jest.fn(),
    });

    renderWithProvider(<ProductList />);
    expect(await screen.findAllByTestId('skeleton-product')).toHaveLength(3);
  });

  it('renders product when loaded', async () => {
    mockedUseProducts.mockReturnValue({
      paginatedProducts: [
        {
          id: 1,
          title: 'Mock Product',
          description: 'A description',
          price: 20,
          image: 'mock.jpg',
        },
      ],
      hasMore: false,
      status: 'succeeded',
      handleViewMore: jest.fn(),
    });

    renderWithProvider(<ProductList />);
    expect(await screen.findByText(/mock product/i)).toBeInTheDocument();
  });

  it('renders "no products found" when product list is empty', async () => {
    mockedUseProducts.mockReturnValue({
      paginatedProducts: [],
      hasMore: false,
      status: 'succeeded',
      handleViewMore: jest.fn(),
    });

    renderWithProvider(<ProductList />);
    expect(await screen.findByText(/no products found/i)).toBeInTheDocument();
  });
});
