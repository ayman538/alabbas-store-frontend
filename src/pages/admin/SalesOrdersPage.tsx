import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Order } from "../../types/order";
import OrdersTable from "../../components/admin/OrdersTable";
import { getOrders, searchOrders } from "../../api/orderApi";
import Select from "react-select";



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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const orderStatusOptions = [
    { value: "NEW", labelEn: "New", labelAr: "جديد" },
    { value: "PREPARING", labelEn: "Preparing", labelAr: "قيد التحضير" },
    { value: "SHIPPED", labelEn: "Shipped", labelAr: "تم الشحن" },
    { value: "DELIVERED", labelEn: "Delivered", labelAr: "تم التسليم" },
    { value: "CANCELLED", labelEn: "Cancelled", labelAr: "ملغي" },
  ];

  const paymentStatusOptions = [
    { value: "UNPAID", labelEn: "Unpaid", labelAr: "غير مدفوع" },
    { value: "PARTIALLY_PAID", labelEn: "Partially Paid", labelAr: "مدفوع جزئياً" },
    { value: "PAID", labelEn: "Paid", labelAr: "مدفوع" },
    { value: "REFUNDED", labelEn: "Refunded", labelAr: "تم الاسترداد" },
  ];

  const paymentMethodOptions = [
    { value: "CASH", labelEn: "Cash", labelAr: "نقدي" },
    { value: "CARD", labelEn: "Card", labelAr: "بطاقة" },
    { value: "WALLET", labelEn: "Wallet", labelAr: "محفظة" },
    { value: "INSTAPAY", labelEn: "Instapay", labelAr: "إنستاباي" },
  ];

const toSelectOptions = (
  options: { value: string; labelEn: string; labelAr: string }[]
) =>
  options.map((option) => ({
    value: option.value,
    label: isArabic ? option.labelAr : option.labelEn,
  }));

const orderStatusSelectOptions = toSelectOptions(orderStatusOptions);
const paymentStatusSelectOptions = toSelectOptions(paymentStatusOptions);
const paymentMethodSelectOptions = toSelectOptions(paymentMethodOptions);

const selectStyles = {
  control: (base: any) => ({
    ...base,
    minWidth: "220px",
    minHeight: "42px",
    borderRadius: "8px",
    borderColor: "#d1d5db",
    boxShadow: "none",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#2563eb",
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
        fontWeight: 600,
    backgroundColor: state.isSelected
      ? "#0b1f4d"
      : state.isFocused
        ? "#eef4ff"
        : "white",
    color: state.isSelected ? "white" : "#1e293b",
    cursor: "pointer",
    fontSize: "14px",
  }),
};
  useEffect(() => {
    async function loadOrders() {
      try {
        setLoadingOrders(true);
        setError("");

       const data = isSearchMode
         ? await searchOrders(
             {
               customerName: customerName.trim(),
               customerPhone: customerPhone.trim(),
               status,
               paymentStatus,
               paymentMethod,
               createdFrom: createdFrom ? `${createdFrom}T00:00:00` : "",
               createdTo: createdTo ? `${createdTo}T23:59:59` : "",
             },
             page,
             pageSize
           )
         : await getOrders(page, pageSize);

        setOrders(data.content);
        setTotalPages(data.totalPages);
      } catch {
        setError(isArabic ? "فشل تحميل طلبات البيع" : "Failed to load sales orders");
      } finally {
        setLoadingOrders(false);
      }
    }

    loadOrders();
  }, [page,isSearchMode,searchTrigger]);

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

      <div className="filter-section">
        <button
          className="filter-toggle"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          {isSearchOpen
            ? isArabic
              ? "▴ إخفاء البحث"
              : "▴ Hide Search"
            : isArabic
              ? "✚ البحث والفلاتر"
              : "✚ Search & Filters"}
        </button>

        {isSearchOpen && (
          <div className="filter-content">
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={isArabic ? "اسم العميل" : "Customer name"}
            />

            <input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder={isArabic ? "رقم الهاتف" : "Customer phone"}
            />

           <Select
             styles={selectStyles}
             options={orderStatusSelectOptions}
             value={
               orderStatusSelectOptions.find((option) => option.value === status) || null
             }
             onChange={(selectedOption) =>
               setStatus(selectedOption?.value || "")
             }
             placeholder={isArabic ? "حالة الطلب" : "Order status"}
             isRtl={isArabic}
             isClearable
             isSearchable={false}

           />

          <Select
            styles={selectStyles}
            options={paymentStatusSelectOptions}
            value={
              paymentStatusSelectOptions.find((option) => option.value === paymentStatus) || null
            }
            onChange={(selectedOption) =>
              setPaymentStatus(selectedOption?.value || "")
            }
            placeholder={isArabic ? "حالة الدفع" : "Payment status"}
            isRtl={isArabic}
            isClearable
            isSearchable={false}
          />

          <Select
            styles={selectStyles}
            options={paymentMethodSelectOptions}
            value={
              paymentMethodSelectOptions.find((option) => option.value === paymentMethod) || null
            }
            onChange={(selectedOption) =>
              setPaymentMethod(selectedOption?.value || "")
            }
            placeholder={isArabic ? "طريقة الدفع" : "Payment method"}
            isRtl={isArabic}
            isClearable
            isSearchable={false}
          />


         <div className="date-filter-row">
           <div className="date-input-group">
             <label>
               {isArabic ? "تاريخ الإنشاء من" : "Created From"}
             </label>

             <input
               type="date"
               value={createdFrom}
               onChange={(e) => setCreatedFrom(e.target.value)}
             />
           </div>

           <div className="date-input-group">
             <label>
               {isArabic ? "تاريخ الإنشاء إلى" : "Created To"}
             </label>

             <input
               type="date"
               value={createdTo}
               onChange={(e) => setCreatedTo(e.target.value)}
             />
           </div>

           <button
             className="action-button"
             onClick={() => {
               setPage(0);
               setIsSearchMode(true);
               setSearchTrigger((current) => current + 1);
             }}
           >
             {isArabic ? "بحث" : "Search"}
           </button>

           <button
             className="secondary-button"
             onClick={() => {
               setCustomerName("");
               setCustomerPhone("");
               setStatus("");
               setPaymentStatus("");
               setPaymentMethod("");
               setCreatedFrom("");
               setCreatedTo("");
               setPage(0);
               setIsSearchMode(false);
             }}
           >
             {isArabic ? "مسح" : "Reset"}
           </button>
         </div>



          </div>
        )}
      </div>



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