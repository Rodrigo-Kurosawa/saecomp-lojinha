import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Cart from "./pages/Cart";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<ProductDetails />} path="/product/:id" />
                <Route element={<Checkout />} path="/checkout" />
                <Route element={<OrderSuccess />} path="/order-success/:orderId" />
                <Route element={<Cart />} path="/cart" />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
