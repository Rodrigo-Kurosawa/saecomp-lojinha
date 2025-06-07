import { Request, Response } from 'express';
import { Order, IOrder } from '../models/Order';
import { Product, IProduct } from '../models/Product';
import { validationResult } from 'express-validator';

// Get all orders with pagination
export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    let orders = await Order.find();
    
    // Sort by createdAt descending
    orders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply pagination
    const paginatedOrders = orders.slice(skip, skip + limit);
    const total = orders.length;

    res.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedidos'
    });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedido'
    });
  }
};

// Create new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    console.log('📝 Creating order - Start');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { items, customerName, customerCourse, notes } = req.body;
    console.log('📝 Order data received:', { items, customerName, customerCourse });

    // Validate items and check stock
    console.log('🔍 Finding products...');
    const products = await Product.find();
    console.log('✅ Products found:', products.length);
    
    const validatedItems = [];
    let totalAmount = 0;

    console.log('🔍 Validating items...');
    for (const item of items) {
      console.log('🔍 Processing item:', item);
      const product = products.find((p: IProduct) => p._id === item.productId);
      
      if (!product) {
        console.log('❌ Product not found:', item.productId);
        return res.status(404).json({
          success: false,
          message: `Produto não encontrado: ${item.productId}`
        });
      }

      console.log('✅ Product found:', product.name, 'Stock:', product.stock);

      if (product.stock < item.quantity) {
        console.log('❌ Insufficient stock for:', product.name);
        return res.status(400).json({
          success: false,
          message: `Estoque insuficiente para ${product.name}. Disponível: ${product.stock}`
        });
      }

      const subtotal = product.price * item.quantity;
      validatedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal
      });
      totalAmount += subtotal;
    }

    console.log('✅ Items validated successfully');

    // Create order
    const orderData = {
      customerName,
      customerCourse,
      items: validatedItems,
      totalAmount,
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      notes
    };

    console.log('💾 Creating order with data:', orderData);

    console.log('💾 Calling Order.create...');
    const order = await Order.create(orderData);
    console.log('✅ Order created:', order._id);

    // Update product stock
    console.log('📦 Updating product stocks...');
    for (const item of validatedItems) {
      console.log('📦 Updating stock for:', item.productId, 'quantity:', item.quantity);
      await Product.updateStock(item.productId, item.quantity);
      console.log('✅ Stock updated for:', item.productId);
    }
    console.log('✅ All stocks updated');

    console.log('📝 Order creation completed successfully');
    res.status(201).json({
      success: true,
      data: order,
      message: 'Pedido criado com sucesso'
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar pedido'
    });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status inválido'
      });
    }

    const order = await Order.findByIdAndUpdate(id, { status });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    res.json({
      success: true,
      data: order,
      message: 'Status do pedido atualizado'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar status do pedido'
    });
  }
};

// Cancel order
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    if (order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Não é possível cancelar um pedido já entregue'
      });
    }

    // Update order status
    await Order.findByIdAndUpdate(id, { 
      status: 'cancelled',
      paymentStatus: 'cancelled'
    });

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        await Product.findByIdAndUpdate(item.productId, { 
          stock: product.stock + item.quantity 
        });
      }
    }

    res.json({
      success: true,
      message: 'Pedido cancelado com sucesso'
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao cancelar pedido'
    });
  }
};

// Get orders by status
export const getOrdersByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    
    let orders = await Order.find({ status });
    
    // Sort by createdAt descending
    orders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedidos por status'
    });
  }
};
