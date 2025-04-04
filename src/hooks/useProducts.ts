import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState, TAppDispatch } from '@/store';
import { fetchProducts } from '@/store/slices/productsSlice';
import useSearchStore from './useSearchStore';

const INITIAL_COUNT = 3;

export default function useProducts() {
  const dispatch = useDispatch<TAppDispatch>();
  const { items: products, status } = useSelector((state: TRootState) => state.products);
  const { query } = useSearchStore();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + INITIAL_COUNT);
  };

  return {
    paginatedProducts,
    hasMore,
    status,
    handleViewMore,
  };
}
