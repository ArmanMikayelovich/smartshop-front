import { Skeleton, Grid, Container } from '@mui/material';

export default function ProductGridSkeleton() {
    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item key={item} xs={12} sm={6} md={4}>
                        <Skeleton variant="rectangular" height={200} sx={{ mb: 1 }} />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="rectangular" width="100%" height={36} sx={{ mt: 1 }} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}