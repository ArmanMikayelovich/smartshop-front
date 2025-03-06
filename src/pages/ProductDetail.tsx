import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Alert, Button, Chip, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {productService} from '../services/api';
import {ProductDetails} from '../services/types';
import ImageGallery from '../components/ImageGallery';
import {useCart} from '../context/CartContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Add this helper function at the top
const getImageType = (base64?: string | null) => {
    if (!base64 || false) return 'png';
    const trimmed = base64.trim();
    if (trimmed.startsWith('iVBORw')) return 'png';
    if (trimmed.startsWith('/9j/4')) return 'jpeg';
    return 'png';
};

export default function ProductDetail() {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const {addToCart} = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await productService.getProductById(id!);
                // Verify image exists in response
                if (!product.mainImage) {
                    console.warn('No mainImage found for product:', product);
                }
                setProduct(product);
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <CircularProgress sx={{display: 'block', margin: '2rem auto'}}/>;
    if (error) return <Alert severity="error" sx={{m: 2}}>{error}</Alert>;
    if (!product) return null;

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Button
                startIcon={<ArrowBackIcon/>}
                onClick={() => navigate(-1)}
                sx={{mb: 3}}
            >
                Back to Products
            </Button>
            <Grid container spacing={4}>
                {/* Image Gallery */}
                <Grid item xs={12} md={6}>
                    <ImageGallery images={product.images}/>
                </Grid>

                {/* Product Info */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom>
                        {product.name}
                    </Typography>

                    <Chip
                        label={product.categoryName}
                        color="primary"
                        sx={{mb: 3}}
                    />

                    <Typography variant="h4" color="primary" gutterBottom>
                         {product.price.toFixed(2)} AMD
                    </Typography>

                    <Typography variant="body1" paragraph sx={{mb: 3}}>
                        {product.description || 'No description available'}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product?.images?.[0] || '' // Add fallback
                        })}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}