import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {Product} from "../services/types";
import {Link} from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({product}: { product: Product }) {

    return (
        <Card sx={{
            maxWidth: 345,
            m: 2,
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)'
            }
        }}>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/png;base64,${product.mainImage}`}
                    alt={product.name}
                    sx={{objectFit: 'contain', backgroundColor: '#f5f5f5'}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold'}}>
                        {product.name}
                    </Typography>

                    {product.categoryName && (
                        <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                            Category: {product.categoryName}
                        </Typography>
                    )}

                    <Typography variant="h6" color="primary" sx={{fontWeight: 'bold'}}>
                        {product.price.toFixed(2)} AMD
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                        Category: {product.categoryName}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <AddToCartButton product={product}/>
        </Card>
    );
}