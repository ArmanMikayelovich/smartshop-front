import { Minus, Plus, Trash2 } from "lucide-react";
import {useCart} from "../context/CartContext";
import {CartItem, Product, ProductDetails} from "../services/types";
import { Button, IconButton, Stack, Box, Typography } from '@mui/material';
import { Add, Remove, DeleteOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface AddToCartButtonProps {
    product: Omit<CartItem, 'quantity'>;
}

const AddToCartButton = ({ product }: { product: Product | ProductDetails }) => {
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const cartItem = cartItems.find(item => item.id === product.id);
    const quantity = cartItem?.quantity || 0;

    const handleIncrement = () => addToCart(product);

    const handleDecrement = () => {
        quantity > 1
            ? updateQuantity(product.id, quantity - 1)
            : removeFromCart(product.id);

    };

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            {quantity > 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 8,
                            bgcolor: 'background.paper',
                            overflow: 'hidden',
                            width: 'fit-content'
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={handleDecrement}
                            sx={{
                                color: 'primary.main',
                                borderRadius: 0,
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                }
                            }}
                        >
                            <Remove fontSize="small" />
                        </IconButton>

                        <Typography
                            variant="body1"
                            sx={{
                                minWidth: 32,
                                textAlign: 'center',
                                fontWeight: 500,
                                color: 'text.primary'
                            }}
                        >
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={handleIncrement}
                            sx={{
                                color: 'primary.main',
                                borderRadius: 0,
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                }
                            }}
                        >
                            <Add fontSize="small" />
                        </IconButton>

                        <Box
                            sx={{
                                borderLeft: 1,
                                borderColor: 'divider',
                                height: 32,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={() => removeFromCart(product.id)}
                                sx={{
                                    color: 'error.main',
                                    borderRadius: 0,
                                    px: 1.5,
                                    '&:hover': {
                                        bgcolor: 'error.light',
                                    }
                                }}
                            >
                                <DeleteOutline fontSize="small" />
                            </IconButton>
                        </Box>
                    </Stack>
                </motion.div>
            ) : (
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleIncrement}
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0.5,
                        transition: 'all 0.2s ease',
                        boxShadow: (theme) => theme.shadows[1],
                        '&:hover': {
                            boxShadow: (theme) => theme.shadows[3],
                            transform: 'translateY(-1px)'
                        }
                    }}
                >
                    Add to Cart
                </Button>
            )}
        </Box>
    );
};

export default AddToCartButton;