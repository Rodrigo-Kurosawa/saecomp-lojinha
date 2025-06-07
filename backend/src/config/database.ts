import * as fs from 'fs';
import * as path from 'path';

// Simulated database using JSON files
const DB_DIR = path.join(__dirname, '../../data');
const PRODUCTS_FILE = path.join(DB_DIR, 'products.json');
const ORDERS_FILE = path.join(DB_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize JSON files if they don't exist
const initializeDatabase = () => {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    const initialProducts = [
      {
        _id: "1",
        name: "Brigadeiro Gourmet",
        description: "Delicioso brigadeiro feito com chocolate belga",
        price: 3.50,
        imageUrl: "/images/brigadeiro.jpg",
        category: "doces",
        stock: 50,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: "2",
        name: "Coxinha de Frango",
        description: "Coxinha tradicional com frango desfiado",
        price: 4.00,
        imageUrl: "/images/coxinha.jpg",
        category: "salgados",
        stock: 30,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: "3",
        name: "Refrigerante Lata",
        description: "Refrigerante gelado 350ml",
        price: 3.00,
        imageUrl: "/images/refrigerante.jpg",
        category: "bebidas",
        stock: 100,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: "4",
        name: "Pastel de Queijo",
        description: "Pastel crocante recheado com queijo",
        price: 5.00,
        imageUrl: "/images/pastel.jpg",
        category: "salgados",
        stock: 25,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: "5",
        name: "Beijinho",
        description: "Doce tradicional de coco",
        price: 3.00,
        imageUrl: "/images/beijinho.jpg",
        category: "doces",
        stock: 40,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
  }
};

// Database operations
export const db = {
  // Products
  getProducts: () => {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  },
  
  saveProducts: (products: any[]) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  },
  
  getProductById: (id: string) => {
    const products = db.getProducts();
    return products.find((p: any) => p._id === id);
  },
  
  addProduct: (product: any) => {
    const products = db.getProducts();
    const newProduct = {
      ...product,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    db.saveProducts(products);
    return newProduct;
  },
  
  updateProduct: (id: string, updates: any) => {
    const products = db.getProducts();
    const index = products.findIndex((p: any) => p._id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      db.saveProducts(products);
      return products[index];
    }
    return null;
  },
  
  deleteProduct: (id: string) => {
    const products = db.getProducts();
    const filtered = products.filter((p: any) => p._id !== id);
    db.saveProducts(filtered);
    return filtered.length < products.length;
  },

  // Orders
  getOrders: () => {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(data);
  },
  
  saveOrders: (orders: any[]) => {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  },
  
  getOrderById: (id: string) => {
    const orders = db.getOrders();
    return orders.find((o: any) => o._id === id);
  },
  
  addOrder: (order: any) => {
    const orders = db.getOrders();
    const newOrder = {
      ...order,
      _id: Date.now().toString(),
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.push(newOrder);
    db.saveOrders(orders);
    return newOrder;
  },
  
  updateOrder: (id: string, updates: any) => {
    const orders = db.getOrders();
    const index = orders.findIndex((o: any) => o._id === id);
    if (index !== -1) {
      orders[index] = {
        ...orders[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      db.saveOrders(orders);
      return orders[index];
    }
    return null;
  },

  findOrderByPaymentId: (paymentId: string) => {
    const orders = db.getOrders();
    return orders.find((o: any) => o.paymentId === paymentId);
  }
};

export const connectToDatabase = async (): Promise<void> => {
  try {
    initializeDatabase();
    console.log('✅ Connected to JSON database successfully');
    console.log(`📁 Database directory: ${DB_DIR}`);
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
};

// No graceful shutdown needed for JSON files
process.on('SIGINT', () => {
  console.log('📴 Database connection closed');
  process.exit(0);
});