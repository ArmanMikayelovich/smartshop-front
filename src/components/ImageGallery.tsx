import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

export default function ImageGallery({ images }: { images: string[] }) {
    const validImages = images.filter(img => img != null);

    if (validImages.length === 0) {
        return (
            <Box sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                height: 300,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2
            }}>
                <Typography variant="body1" color="text.secondary">
                    No image available
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            height: 'auto',
            aspectRatio: '1 / 1',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#f5f5f5'
        }}>
            <Swiper
                modules={[Navigation, Pagination, Zoom]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                zoom
                style={{ width: '100%', height: '100%' }}
            >
                {validImages.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-zoom-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                            <img
                                src={`data:image/jpeg;base64,${img}`}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    borderRadius: 10
                                }}
                                alt="Product"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}