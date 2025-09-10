import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/homepage";
import BrandListPage from "./pages/brandListPage";
import ProductListPage from "./pages/productListPage";
import ProductDetailPage from "./pages/productDetailPage";
import CartPage from "./pages/cartPage";
import { CartProvider } from "./context/cartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/brands" element={<BrandListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:brandId" element={<ProductListPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="*" element={<p className="text-center py-20">Page not found</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}