import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import ProductsPage from "./pages/admin/ProductsPage";
import SalesOrdersPage from "./pages/admin/SalesOrdersPage";
import PurchaseOrdersPage from "./pages/admin/PurchaseOrdersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/products" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:categoryId" element={<ProductsPage />} />
          <Route path="sales-orders" element={<SalesOrdersPage />} />
          <Route path="purchase-orders" element={<PurchaseOrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;