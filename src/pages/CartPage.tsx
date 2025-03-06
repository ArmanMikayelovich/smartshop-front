import { Container, Typography, Box, Button, IconButton, Stack, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Delete, Remove, Add } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCheckout = () => {
        // Implement checkout logic
        clearCart();
    };

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">
                    Your cart is empty
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                Shopping Cart
            </Typography>

            <Stack spacing={3}>
                {cartItems.map((item) => (
                    <Box key={item.id} sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2,
                        bgcolor: 'background.paper'
                    }}>
                        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                            {/* Product Image */}
                            <Box sx={{
                                width: isMobile ? '100%' : 120,
                                height: isMobile ? 160 : 120,
                                flexShrink: 0,
                                borderRadius: 2,
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <img
                                    src={item.image ? `data:image/jpeg;base64,${item.image}` : '/placeholder-product.jpg'}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>

                            {/* Product Info */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    {item.name}
                                </Typography>

                                <Typography variant="body1" color="primary" sx={{ mb: 2 }}>
                                    {(item.price * item.quantity).toFixed(2)} AMD
                                </Typography>

                                {/* Quantity Controls */}
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        size={isMobile ? 'medium' : 'small'}
                                        sx={{ border: 1, borderColor: 'divider' }}
                                    >
                                        <Remove />
                                    </IconButton>

                                    <Typography variant="body1" sx={{ minWidth: 32, textAlign: 'center' }}>
                                        {item.quantity}
                                    </Typography>

                                    <IconButton
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        size={isMobile ? 'medium' : 'small'}
                                        sx={{ border: 1, borderColor: 'divider' }}
                                    >
                                        <Add />
                                    </IconButton>
                                </Stack>
                            </Box>

                            {/* Delete Button */}
                            <Box sx={{ alignSelf: 'flex-start' }}>
                                <IconButton
                                    onClick={() => removeFromCart(item.id)}
                                    color="error"
                                    sx={{ '&:hover': { bgcolor: 'error.light' } }}
                                >
                                    <Delete fontSize={isMobile ? 'medium' : 'small'} />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>
                ))}
            </Stack>

            {/* Total and Checkout */}
            <Box sx={{
                mt: 4,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1
            }}>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" sx={{ mb: isMobile ? 2 : 0 }}>
                        Total: {totalPrice.toFixed(2)} AMD
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleCheckout}
                        sx={{
                            minWidth: 200,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: 16
                        }}
                    >
                        Proceed to Checkout
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}