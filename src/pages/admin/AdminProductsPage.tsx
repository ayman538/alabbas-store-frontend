import { useEffect, useState } from "react";
import type { Category } from "../../types/category";
import type { Order } from "../../types/order";
import type {  Product } from "../../types/product";
import type {  PurchaseOrder } from "../../types/PurchaseOrder";
import { getCategories } from "../../api/categoryApi";
import { getProductsByCategory } from "../../api/productApi";

import CategorySidebar from "../../components/admin/CategorySidebar";
import ProductsTable from "../../components/admin/ProductsTable";
import "./AdminProductsPage.css";

import { getOrders } from "../../api/orderApi";
import OrdersTable from "../../components/admin/OrdersTable";

import { getPurchaseOrders } from "../../api/purchaseOrderApi";
import PurchaseOrdersTable from "../../components/admin/PurchaseOrdersTable"

function AdminProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const selectedCategory = categories.find(
    category => category.id === selectedCategoryId
  );
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");

  const [selectedMenuItem, setSelectedMenuItem] = useState<
    "products" | "orders" | "purchaseOrders"
  >("products");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loadingPurchaseOrders, setLoadingPurchaseOrders] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoadingCategories(true);

        const data = await getCategories();

        setCategories(data);


      } catch {
        setError("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      if (selectedCategoryId === null) {
        return;
      }

      try {
        setLoadingProducts(true);

        const data = await getProductsByCategory(selectedCategoryId);

        setProducts(data.content);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, [selectedCategoryId]);

useEffect(() => {
  async function loadOrders() {
    if (selectedMenuItem !== "orders") {
      return;
    }

    try {
      setLoadingOrders(true);

      const data = await getOrders();

      setOrders(data.content);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  }

  loadOrders();
}, [selectedMenuItem]);



useEffect(() => {
  async function loadPurchaseOrders() {
    if (selectedMenuItem !== "purchaseOrders") {
      return;
    }

    try {
      setLoadingPurchaseOrders(true);

      const data = await getPurchaseOrders();

      setPurchaseOrders(data.content);
    } catch {
      setError("Failed to load purchase orders");
    } finally {
      setLoadingPurchaseOrders(false);
    }
  }

  loadPurchaseOrders();
}, [selectedMenuItem]);




  return (
     <div className="admin-products-page">
        <aside className="admin-sidebar">
<div className="sidebar-brand">
  <h2>EL ABBAS</h2>
</div>

         <CategorySidebar
           categories={categories}
           selectedCategoryId={selectedCategoryId ?? 0}
            isProductsActive={selectedMenuItem === "products"}
           onCategorySelect={(categoryId) => {
             setSelectedMenuItem("products");
             setSelectedCategoryId(categoryId);
           }}
         />
            <button
                      className={
                        selectedMenuItem === "orders"
                          ? "category-button active"
                          : "category-button"
                      }
                      onClick={() => setSelectedMenuItem("orders")}
                    >
                       🧾 Sales Orders
                    </button>
          <button
            className={
              selectedMenuItem === "purchaseOrders"
                ? "category-button active"
                : "category-button"
            }
            onClick={() => setSelectedMenuItem("purchaseOrders")}
          >
🚚  Purchase Orders
          </button>
 <div className="sidebar-spacer"></div>
  <button className="logout-button">
     🚪 Logout
   </button>

        </aside>
        <main className="admin-content">
          {selectedMenuItem === "products" && (
            <>
              <div className="admin-content-header">
                <h2>{selectedCategory?.nameEn ?? "Products"}</h2>
                <button>Add New Product</button>
              </div>

              {loadingCategories && <p>Loading categories...</p>}
              {loadingProducts && <p>Loading products...</p>}

              <ProductsTable products={products} />
            </>
          )}

          {selectedMenuItem === "orders" && (
            <>
              <div className="admin-content-header">
                <h2>Orders</h2>
                <button>Create New Order</button>
              </div>

              {loadingOrders && <p>Loading orders...</p>}

              <OrdersTable orders={orders} />
            </>
          )}

      {selectedMenuItem === "purchaseOrders" && (
        <>
          <div className="admin-content-header">
            <h2>Purchase Orders</h2>
            <button>Create Purchase Order</button>
          </div>

          {loadingPurchaseOrders && <p>Loading purchase orders...</p>}

          <PurchaseOrdersTable purchaseOrders={purchaseOrders} />
        </>
      )}

          {error && <p style={{ color: "red" }}>{error}</p>}
        </main>
      </div>
  );
}

export default AdminProductsPage;
