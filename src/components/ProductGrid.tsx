import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: any[] }) {
    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}