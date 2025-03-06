import { AppBar, Toolbar, IconButton, Badge, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

export default function NavBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { totalItems } = useCart(); // Get total quantity from context

    return (
        <AppBar position="sticky" sx={{ mb: 4 }}>
            <Toolbar>
                {/* Mobile Menu Button */}
                {isMobile && (
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                )}

                {/* Logo/Title */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    FreshMarket
                </Typography>

                {/* Cart Icon with Total Quantity */}
                <IconButton component={Link} to="/cart" color="inherit">
                    <Badge badgeContent={totalItems} color="error">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}