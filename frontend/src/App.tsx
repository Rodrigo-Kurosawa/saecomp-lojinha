import AppRoutes from './routes';
import { CartProvider } from './hooks/useCart';

const App = () => {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
};

export default App;