import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Order } from "../../types/order";
import { getOrders } from "../../api/orderApi";
import OrdersTable from "../../components/admin/OrdersTable";

type AdminOutletContext = {
  language: "en" | "ar";
};

function SalesOrdersPage() {
  const { language } = useOutletContext<AdminOutletContext>();
  const isArabic = language === "ar";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoadingOrders(true);
        setError("");

        const data = await getOrders();
        setOrders(data.content);
      } catch {
        setError(isArabic ? "فشل تحميل طلبات البيع" : "Failed to load sales orders");
      } finally {
        setLoadingOrders(false);
      }
    }

    loadOrders();
  }, [isArabic]);

  return (
    <>
      <div className="admin-content-header">
        <h2>{isArabic ? "الطلبات" : "Orders"}</h2>

        <button className="action-button">
          {isArabic ? "إنشاء طلب جديد" : "Create New Order"}
        </button>
      </div>

      {loadingOrders && <p>{isArabic ? "جاري تحميل الطلبات..." : "Loading orders..."}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <OrdersTable orders={orders} language={language} />
    </>
  );
}

export default SalesOrdersPage;