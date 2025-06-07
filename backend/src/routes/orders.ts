import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getOrdersByStatus
} from '../controllers/orderController';
import {
  createOrderValidation,
  updateOrderStatusValidation,
  getOrderByIdValidation,
  getOrdersValidation,
  getOrdersByStatusValidation
} from '../validators/orderValidators';

const router = Router();

// GET /api/orders - Get all orders with pagination
router.get('/', getOrdersValidation, getOrders);

// GET /api/orders/status/:status - Get orders by status
router.get('/status/:status', getOrdersByStatusValidation, getOrdersByStatus);

// GET /api/orders/:id - Get order by ID
router.get('/:id', getOrderByIdValidation, getOrderById);

// POST /api/orders - Create new order
router.post('/', createOrderValidation, createOrder);

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', updateOrderStatusValidation, updateOrderStatus);

export default router;