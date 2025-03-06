import {useEffect, useState} from 'react';
import {Alert, Box, Container, Grid, Typography} from '@mui/material';
import {productService} from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import {Product} from "../services/types";

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');

                const products = searchTerm
                    ? await productService.searchProducts(searchTerm)
                    : await productService.getProducts();

                setProducts(products);
            } catch (error) {
                setError('Failed to load products. Please try again later.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchData, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    return (
        <Container sx={{ py: 4 }}>
            <Box display="flex" flexDirection="column" gap={4}>
                {/* Search Bar */}
                <Box>
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                </Box>

                {/* Content */}
                <Box flexGrow={1}>
                    {loading ? (
                        <ProductGridSkeleton />
                    ) : error ? (
                        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                    ) : products.length === 0 ? (
                        <Typography variant="h6" textAlign="center">
                            No products found{searchTerm && ` for "${searchTerm}"`}
                        </Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {products.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </Container>
    );
}