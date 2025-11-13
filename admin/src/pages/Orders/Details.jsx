import { 
    Grid, 
    Stack, 
    Typography, 
    Box, 
    Card, 
    Divider,
    Chip,
    Avatar
} from '@mui/material';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';

const ProductImage = ({ src, alt }) => {
    const [imageError, setImageError] = useState(false);

    if (imageError || !src) {
        return (
            <Typography variant="caption" color="secondary">
                No Image
            </Typography>
        );
    }

    return (
        <img
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
            src={`${process.env.REACT_APP_API_URL}/uploads/${src}`}
            alt={alt}
            onError={() => setImageError(true)}
        />
    );
};

ProductImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

const Details = ({ data }) => {
    const products = data?.products?.item || [];
    const totalItems = products.reduce((sum, item) => sum + (item?.qty || 0), 0);

    return (
        <Grid container spacing={3}>
            {/* Products Section - Left Side (Main Content) */}
            <Grid item xs={12} lg={8}>
                <Card
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        mb: 3,
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1} mb={3}>
                        <ShoppingBagIcon sx={{ color: '#1976d2' }} />
                        <Typography variant="h6" fontWeight="bold">
                            Order Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />

                    {products.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                            <Typography color="secondary">No products in this order</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {products.map((product, index) => {
                                const productData = product?.product_id;
                                const productImage = productData?.image?.[0];
                                const productName = productData?.name || 'Product Name N/A';
                                const productPrice = product?.price || 0;
                                const productQty = product?.qty || 0;
                                const subtotal = productPrice * productQty;

                                return (
                                    <Card
                                        key={productData?._id || index}
                                        elevation={0}
                                        sx={{
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        <Box sx={{ p: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                {/* Product Image */}
                                                <Grid item xs={12} sm={3}>
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            height: 140,
                                                            borderRadius: 2,
                                                            overflow: 'hidden',
                                                            border: '1px solid #e0e0e0',
                                                            backgroundColor: '#f5f5f5',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <ProductImage src={productImage} alt={productName} />
                                                    </Box>
                                                </Grid>

                                                {/* Product Details */}
                                                <Grid item xs={12} sm={6}>
                                                    <Typography 
                                                        variant="body1" 
                                                        fontWeight="600" 
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        {productName}
                                                    </Typography>
                                                    
                                                    {productData?.brand && (
                                                        <Typography
                                                            variant="caption"
                                                            color="secondary"
                                                            display="block"
                                                            sx={{ mb: 1 }}
                                                        >
                                                            Brand: {productData.brand}
                                                        </Typography>
                                                    )}

                                                    {productData?.category && (
                                                        <Chip
                                                            label={productData.category}
                                                            size="small"
                                                            sx={{ 
                                                                height: 20, 
                                                                fontSize: '0.7rem',
                                                                mb: 1,
                                                                mr: 1
                                                            }}
                                                        />
                                                    )}

                                                    <Box display="flex" flexDirection="column" gap={0.5} mt={1.5}>
                                                        <Typography variant="body2" color="text">
                                                            <strong>Price:</strong> ₹{productPrice.toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2" color="text">
                                                            <strong>Quantity:</strong> {productQty}
                                                        </Typography>
                                                        <Typography 
                                                            variant="body2" 
                                                            color="primary" 
                                                            fontWeight="600"
                                                            sx={{ mt: 0.5 }}
                                                        >
                                                            <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                {/* Additional Product Images */}
                                                <Grid item xs={12} sm={3}>
                                                    {productData?.image && productData.image.length > 0 && (
                                                        <>
                                                            <Typography
                                                                variant="caption"
                                                                color="secondary"
                                                                fontWeight="600"
                                                                display="block"
                                                                sx={{ mb: 1 }}
                                                            >
                                                                More Images ({productData.image.length})
                                                            </Typography>
                                                            <Box display="flex" flexWrap="wrap" gap={1}>
                                                                {productData.image.slice(0, 4).map((image, idx) => (
                                                                    <Avatar
                                                                        key={idx}
                                                                        component="a"
                                                                        target="_blank"
                                                                        href={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                                                                        variant="rounded"
                                                                        src={`${process.env.REACT_APP_API_URL}/uploads/${image}`}
                                                                        sx={{
                                                                            width: 50,
                                                                            height: 50,
                                                                            cursor: 'pointer',
                                                                            border: '2px solid #e0e0e0',
                                                                            transition: 'all 0.2s ease',
                                                                            '&:hover': {
                                                                                transform: 'scale(1.1)',
                                                                                borderColor: '#1976d2',
                                                                            },
                                                                        }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Card>
                                );
                            })}
                        </Box>
                    )}
                </Card>
            </Grid>
            
            {/* Right Side - Shipping Address & Payment Details */}
            <Grid item xs={12} lg={4}>
                {/* Shipping Address */}
                <Card
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        mb: 3,
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <LocalShippingIcon sx={{ color: '#1976d2' }} />
                        <Typography variant="h6" fontWeight="bold">
                            Shipping Address
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box>
                        <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                            {data?.address?.firstname?.toUpperCase()}{' '}
                            {data?.address?.lastname?.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="secondary" sx={{ lineHeight: 1.7 }}>
                            {data?.address?.address_line_1}
                            {data?.address?.address_line_2 && (
                                <>, {data?.address?.address_line_2}</>
                            )}
                            <br />
                            {data?.address?.city}, {data?.address?.state}
                            <br />
                            {data?.address?.country} - {data?.address?.zip}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="body2" color="text">
                            <strong>Phone:</strong> {data?.address?.mobile}
                        </Typography>
                        {data?.email && (
                            <Typography variant="body2" color="text" sx={{ mt: 0.5 }}>
                                <strong>Email:</strong> {data?.email}
                            </Typography>
                        )}
                    </Box>
                </Card>

                {/* Payment Details */}
                <Card
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <PaymentIcon sx={{ color: '#1976d2' }} />
                        <Typography variant="h6" fontWeight="bold">
                            Payment Summary
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2" color="secondary">
                                Order Subtotal
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                                ₹{data?.subtotal?.toFixed(2) || data?.products?.totalPrice?.toFixed(2) || '0.00'}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2" color="secondary">
                                Shipping charges
                            </Typography>
                            {data?.delivery_fee === 0 || data?.delivery_fee === null ? (
                                <Chip
                                    label="FREE"
                                    size="small"
                                    color="success"
                                    sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                            ) : (
                                <Typography variant="body2" fontWeight="600">
                                    ₹{data?.delivery_fee?.toFixed(2) || '0.00'}
                                </Typography>
                            )}
                        </Stack>
                        {data?.tax_amount > 0 && (
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" color="secondary">
                                    Tax
                                </Typography>
                                <Typography variant="body2" fontWeight="600">
                                    ₹{data?.tax_amount?.toFixed(2) || '0.00'}
                                </Typography>
                            </Stack>
                        )}
                        {data?.discount_amount > 0 && (
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" color="secondary">
                                    Discount
                                </Typography>
                                <Typography variant="body2" fontWeight="600" color="success.main">
                                    -₹{data?.discount_amount?.toFixed(2) || '0.00'}
                                </Typography>
            </Stack>
                        )}
                        <Divider sx={{ my: 1 }} />
                        <Stack direction="row" justifyContent="space-between" pt={1}>
                            <Typography variant="body1" fontWeight="bold">
                                Total
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" color="primary">
                                ₹{data?.amount?.toFixed(2) || '0.00'}
                            </Typography>
            </Stack>
                        {data?.payment_mode && (
                            <>
                                <Divider sx={{ my: 1 }} />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color="secondary">
                                        Payment Mode
                                    </Typography>
                                    <Chip
                                        label={data.payment_mode}
                                        size="small"
                                        variant="outlined"
                                        color={data.payment_mode === 'COD' ? 'warning' : 'success'}
                                        sx={{ fontWeight: 600 }}
                                    />
            </Stack>
                            </>
                        )}
            </Stack>
                </Card>
            </Grid>
    </Grid>
    );
};

Details.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Details;