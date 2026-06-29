import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { PurchaseOrder } from "../../types/PurchaseOrder";
import { getPurchaseOrders } from "../../api/purchaseOrderApi";
import PurchaseOrdersTable from "../../components/admin/PurchaseOrdersTable";

type AdminOutletContext = {
  language: "en" | "ar";
};

function PurchaseOrdersPage() {
  const { language } = useOutletContext<AdminOutletContext>();
  const isArabic = language === "ar";

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loadingPurchaseOrders, setLoadingPurchaseOrders] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    async function loadPurchaseOrders() {
      try {
        setLoadingPurchaseOrders(true);
        setError("");

        const data = await getPurchaseOrders(page, pageSize);
        setPurchaseOrders(data.content);
        setTotalPages(data.totalPages);
      } catch {
        setError(isArabic ? "فشل تحميل طلبات الشراء" : "Failed to load purchase orders");
      } finally {
        setLoadingPurchaseOrders(false);
      }
    }

    loadPurchaseOrders();
  }, [ page]);

  return (
    <>
      <div className="admin-content-header">
        <h2>{isArabic ? "طلبات الشراء" : "Purchase Orders"}</h2>

        <button className="action-button">
          {isArabic ? "إنشاء طلب شراء" : "Create Purchase Order"}
        </button>
      </div>

      {loadingPurchaseOrders && (
        <p>{isArabic ? "جاري تحميل طلبات الشراء..." : "Loading purchase orders..."}</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <PurchaseOrdersTable purchaseOrders={purchaseOrders} language={language} />
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

export default PurchaseOrdersPage;