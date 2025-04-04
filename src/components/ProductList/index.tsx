'use client';

import ProductCard from '@/components/ProductCard';
import { Container, Grid, Button, Typography} from '@mui/material';
import styles from './styles.module.scss';
import CardSkeleton from '../CardSkeleton';
import useProducts from '@/hooks/useProducts';
import { useEffect, useState } from 'react';

const ProductList = () => {

    const { paginatedProducts, hasMore, status, handleViewMore } = useProducts();
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (status === 'succeeded') {
          const timer = setTimeout(() => {
            setShowSkeleton(false);
          }, 800); 
    
          return () => clearTimeout(timer);
        }
      }, [status]);

    return (
        <Container className={styles['main']}>
            <Grid container spacing={3} justifyContent="center">
                {status === 'loading' || showSkeleton ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <CardSkeleton key={`skeleton-${i}`} />
                    ))
                ) : paginatedProducts.length === 0 ? (
                    <Typography variant="h6" className={styles['notfound']}>
                        No products found.
                    </Typography>
                ) : (
                    paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    ))
                )}
            </Grid>
            {hasMore && (
                <Button
                    onClick={handleViewMore}
                    variant="outlined"
                    className={styles['view-more']}
                >
                    View More
                </Button>
            )}
        </Container>
    );
}

export default ProductList;