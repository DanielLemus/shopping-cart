'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { TRootState } from '@/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './styles.module.scss';
import useSearchStore from '@/hooks/useSearchStore';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { query, setQuery } = useSearchStore();
  const pathname = usePathname();
  const isCartPage = pathname === '/cart';
  
  const cartItemsCount = useSelector((state: TRootState) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <AppBar position="fixed" className={styles['header']}>
      <Toolbar className={styles['nav']}>
        <Link href="/" className={styles['logo']}>
          <ShoppingBagIcon fontSize="large" />
        </Link>
        {
            !isCartPage ? (
                <Box className={styles['search-wrapper']}>
                <InputBase
                  name='search'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Products..."
                  className={styles['search-input']}
                  inputProps={{ 'aria-label': 'search products' }}
                />
                <SearchIcon className={styles['search-icon']} />
              </Box>
            ) : null
        }
        <Link href="/cart" className={styles['cart']}>
          <Badge
            badgeContent={cartItemsCount}
            color="secondary"
            overlap="circular"
            className={styles['badge-wrapper']}
          >
            <ShoppingCartIcon className={styles['cart-icon']} />
          </Badge>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
