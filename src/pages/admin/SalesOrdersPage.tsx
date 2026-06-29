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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoadingOrders(true);
        setError("");

        const data = await getOrders(page, pageSize);
        setOrders(data.content);
        setTotalPages(data.totalPages);
      } catch {
        setError(isArabic ? "فشل تحميل طلبات البيع" : "Failed to load sales orders");
      } finally {
        setLoadingOrders(false);
      }
    }

    loadOrders();
  }, [page]);

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
       { totalPages > 1 && (
             <div className="pagination">
               <button
                 className="pagination-button"
                 disabled={page === 0}
                 onClick={() => setPage(page - 1)}
               >
                 {isArabic ? "السابق" : "Previous"}
               </button>

               <span className="pagination-info">
                 {isArabic
                   ? `صفحة ${page + 1} من ${totalPages}`
                   : `Page ${page + 1} of ${totalPages}`}
               </span>

               <button
                 className="pagination-button"
                 disabled={page + 1 >= totalPages}
                 onClick={() => setPage(page + 1)}
               >
                 {isArabic ? "التالي" : "Next"}
               </button>
             </div>
           )}
    </>
  );
}

export default SalesOrdersPage;