import type { PurchaseOrder } from "../../types/PurchaseOrder";

type Props = {
  purchaseOrders: PurchaseOrder[];
   language: "en" | "ar";
};

function PurchaseOrdersTable({ purchaseOrders,language }: Props) {
       const isArabic = language === "ar";
  return (
    <table className="table-wrapper">
      <thead>
        <tr>
         <th>{isArabic ? "إجمالي المبلغ" : "Total Amount"}</th>
         <th>{isArabic ? "إجمالي الكمية" : "Total Quantity"}</th>
         <th>{isArabic ? "عدد الأصناف" : "Items Count"}</th>
         <th>{isArabic ? "تاريخ الإنشاء" : "Created At"}</th>
         <th>{isArabic ? "رقم المعاملة" : "Transaction ID"}</th>
        </tr>
      </thead>

      <tbody>
        {purchaseOrders.map((purchaseOrder) => (
          <tr key={purchaseOrder.transactionId}>
            <td>{purchaseOrder.totalAmount}</td>
            <td>{purchaseOrder.totalQuantity}</td>
            <td>{purchaseOrder.itemsCount}</td>
             <td dir="ltr">{new Date(purchaseOrder.createdAt).toLocaleString()}</td>
              <td>{purchaseOrder.transactionId}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PurchaseOrdersTable;