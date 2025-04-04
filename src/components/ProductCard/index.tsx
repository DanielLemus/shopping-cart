'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity } from '@/store/slices/cartSlice';
import styles from './styles.module.scss';
import { TRootState } from '@/store';
import { IProduct } from '@/store/slices/productsSlice';

const ProductCard = ({ id, title, description, price, image }: IProduct) => {
    const dispatch = useDispatch();
    const [openToast, setOpenToast] = useState(false);

    const quantityInCart = useSelector((state: TRootState) =>
        state.cart.items.find((item) => item.id === id)?.quantity
    ) || 0;

    const handleAddToCart = () => {
        dispatch(addToCart({ id, title, price, image }));
        setOpenToast(true);

    };

    return (
    <>
        <Snackbar
            open={openToast}
            autoHideDuration={2000}
            onClose={() => setOpenToast(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={() => setOpenToast(false)}
                severity="success"
                sx={{ width: '100%' }}
            >
                {title} added to cart!
            </Alert>
        </Snackbar>
        <Card className={styles['card']}>
            <div className={styles['price-label']}>${price.toFixed(2)}</div>
            <CardMedia component="img" image={image} alt={title} className={styles['image']} />
            <CardContent className={styles['info']}>
                <Typography className={styles['title']}>{title}</Typography>
                <Typography className={styles['description']}>{description}</Typography>
            </CardContent>
            {quantityInCart === 0 ? (
                <Button onClick={handleAddToCart} className={styles['add-button']}>
                    Add to cart
                </Button>
            ) : (
                <div className={styles['quantity-control']}>
                    <IconButton
                        className={styles['qty-btn']}
                        onClick={() => dispatch(decreaseQuantity({ id }))}
                    >
                     -
                    </IconButton>
                    <span className={styles['qty-number']}>{quantityInCart}</span>
                    <IconButton
                        className={styles['qty-btn']}
                        onClick={handleAddToCart}
                    >
                     +
                    </IconButton>
                </div>
            )}
        </Card>
    </>
    );
};

export default ProductCard;
