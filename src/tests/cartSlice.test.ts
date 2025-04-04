import cartReducer, { addToCart, decreaseQuantity } from '@/store/slices/cartSlice';
import { ICartItem } from '@/store/slices/cartSlice';

describe('cartSlice', () => {
  const initialState = { items: [] as ICartItem[] };

  it('should handle addToCart (new item)', () => {
    const newState = cartReducer(initialState, addToCart({
      id: 1,
      title: 'Test Product',
      price: 10,
      image: 'img.jpg'
    }));

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toMatchObject({
      id: 1,
      title: 'Test Product',
      quantity: 1
    });
  });

  it('should increase quantity if product already exists', () => {
    const withItem = {
      items: [{
        id: 1,
        title: 'Test Product',
        price: 10,
        quantity: 1,
        image: 'img.jpg'
      }]
    };

    const newState = cartReducer(withItem, addToCart({
      id: 1,
      title: 'Test Product',
      price: 10,
      image: 'img.jpg'
    }));

    expect(newState.items[0].quantity).toBe(2);
  });

  it('should decrease quantity', () => {
    const state = {
      items: [{
        id: 1,
        title: 'Test Product',
        price: 10,
        quantity: 2,
        image: 'img.jpg'
      }]
    };

    const newState = cartReducer(state, decreaseQuantity({ id: 1 }));
    expect(newState.items[0].quantity).toBe(1);
  });

  it('should not go below quantity 0', () => {
    const state = {
      items: [{
        id: 1,
        title: 'Test Product',
        price: 10,
        quantity: 1,
        image: 'img.jpg'
      }]
    };

    const newState = cartReducer(state, decreaseQuantity({ id: 1 }));
    const item = newState.items.find(i => i.id === 1);
    
    if (item) {
      expect(item.quantity).toBe(0);
    } else {
      expect(newState.items).toHaveLength(0);
    }
  });
});
