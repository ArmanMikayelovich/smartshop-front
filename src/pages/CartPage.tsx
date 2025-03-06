import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Divider, Button, Box } from '@mui/material';
import { Delete, Remove, Add } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

    const handleCheckout = () => {
        // Implement checkout logic
        clearCart();
    };

    if (cartItems.length === 0) {
        return (
            <Container sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h5">Your cart is empty</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>

            <List>
                {cartItems.map((item) => (
                    <div key={item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    src={`data:image/png;base64,${item.image}`}
                                    variant="square"
                                    sx={{ width: 80, height: 80, mr: 2 }}
                                />
                            </ListItemAvatar>

                            <ListItemText
                                primary={item.name}
                                secondary={`${item.price.toFixed(2)} AMD`}
                                sx={{ flex: 2 }}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <Remove />
                                </IconButton>
                                <Typography mx={1}>{item.quantity}</Typography>
                                <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <Add />
                                </IconButton>
                            </Box>

                            <Typography sx={{ mx: 3 }}>
                                {(item.price * item.quantity).toFixed(2)} AMD
                            </Typography>

                            <IconButton onClick={() => removeFromCart(item.id)} color="error">
                                <Delete />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>

            <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Typography variant="h5" gutterBottom>
                    Total: {totalPrice.toFixed(2)} AMD
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleCheckout}
                    sx={{ minWidth: 200 }}
                >
                    Checkout
                </Button>
            </Box>
        </Container>
    );
}