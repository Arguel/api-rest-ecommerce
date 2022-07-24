import express from 'express';
import products from '../components/product/product.routes.config';

const router = express.Router();

router.use('/products', products);

export default router;
