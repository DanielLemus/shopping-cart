'use client';

import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '@/store';
import Link from 'next/link';
import styles from './styles.module.scss';

import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
    IconButton,
} from '@mui/material';
import { decreaseQuantity, addToCart } from '@/store/slices/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state: TRootState) => state.cart.items);
    const dispatch = useDispatch();
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <Container maxWidth="sm" className={styles['main']}>
            <Typography variant="h5" className={styles['title']}>
                Your Cart
            </Typography>
            <Paper className={styles['table-wrapper']} elevation={3}>
                <Table>
                    <TableBody>
                        {cartItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className={styles['qty']}>
                                    <div className={styles['quantity-control']}>
                                        <IconButton
                                            size="small"
                                            className={styles['qty-btn']}
                                            onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                                        >
                                            -
                                        </IconButton>
                                        <span className={styles['qty-number']}>{item.quantity}</span>
                                        <IconButton
                                            size="small"
                                            className={styles['qty-btn']}
                                            onClick={() => dispatch(addToCart({ id: item.id, title: item.title, price: item.price, image: item.image }))}
                                        >
                                            +
                                        </IconButton>
                                    </div>
                                </TableCell>
                                <TableCell className={styles['table-cell']}>{item.title}</TableCell>
                                <TableCell className={styles['table-cell']} align="right">
                                    ${(item.quantity * item.price).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <img src={`${item.image}`} alt={item.title} className={styles['product-image']} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <hr className={styles['divider']} />
            <Typography className={styles['total']} align="right">
                Total: <span className={styles['value-total']}>${total.toFixed(2)}</span>
            </Typography>
            <div className={styles['button-wrapper']}>
                <Link href="/" passHref>
                    <Button variant="outlined" className={styles['back-button']}>
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </Container>
    );
}

export default Cart;