import productsReducer, { fetchProducts } from '@/store/slices/productsSlice';
import { IProductsState } from '@/store/slices/productsSlice';

describe('productsSlice reducer', () => {
  const initialState: IProductsState = {
    items: [],
    status: 'idle',
    error: null,
  };

  const mockProducts = [
    { id: 1, title: 'Product A', description: 'Desc A', price: 10, image: 'img1.jpg' },
    { id: 2, title: 'Product B', description: 'Desc B', price: 20, image: 'img2.jpg' },
  ];

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(initialState, action);
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle fetchProducts.fulfilled', () => {
    const action = { type: fetchProducts.fulfilled.type, payload: mockProducts };
    const state = productsReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockProducts);
  });

  it('should handle fetchProducts.rejected', () => {
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: 'Failed to fetch' },
    };
    const state = productsReducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });
});
