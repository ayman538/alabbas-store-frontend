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

  useEffect(() => {
    async function loadPurchaseOrders() {
      try {
        setLoadingPurchaseOrders(true);
        setError("");

        const data = await getPurchaseOrders();
        setPurchaseOrders(data.content);
      } catch {
        setError(isArabic ? "فشل تحميل طلبات الشراء" : "Failed to load purchase orders");
      } finally {
        setLoadingPurchaseOrders(false);
      }
    }

    loadPurchaseOrders();
  }, [isArabic]);

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
    </>
  );
}

export default PurchaseOrdersPage;