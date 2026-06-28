import type { Order } from "../../types/product";
import { getCookie, setCookie } from "../../utils/cookieUtils";

import {
  paymentMethodTranslations,
  paymentStatusTranslations,
  orderStatusTranslations,
} from "../../constants/orderTranslations";

type Props = {
  orders: Order[];
   language: "en" | "ar";
};

function OrdersTable({ orders, language } : Props) {
     const isArabic = language === "ar";
  return (
    <table className="table-wrapper">
      <thead>
        <tr>
          <th>{isArabic ? "اسم العميل" : "Customer Name"}</th>
           <th>{isArabic ? "رقم الهاتف" : "Phone"}</th>
           <th>{isArabic ? "المنطقة" : "Area"}</th>
           <th>{isArabic ? "العنوان" : "Address"}</th>
           <th>{isArabic ? "الحالة" : "Status"}</th>
           <th>{isArabic ? "إجمالي السعر" : "Total Price"}</th>
           <th>{isArabic ? "حالة الدفع" : "Payment Status"}</th>
           <th>{isArabic ? "طريقة الدفع" : "Payment Method"}</th>
           <th>{isArabic ? "المبلغ المدفوع" : "Paid"}</th>
           <th>{isArabic ? "المبلغ المتبقي" : "Remaining"}</th>
           <th>{isArabic ? "الخصم" : "Discount"}</th>
           <th>{isArabic ? "تاريخ الإنشاء" : "Created At"}</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.customerName}</td>
            <td>{order.customerPhone}</td>
            <td>{order.customerArea}</td>
            <td>{order.customerAddress}</td>
             <td>
                   {isArabic
                     ? orderStatusTranslations[order.status]
                     : order.status}
                 </td>
            <td>{order.totalPrice}</td>
          <td>
                  {isArabic
                    ? paymentStatusTranslations[order.paymentStatus]
                    : order.paymentStatus}
                </td>
           <td>
                  {isArabic
                    ? paymentMethodTranslations[order.paymentMethod]
                    : order.paymentMethod}
                </td>
            <td>{order.paidAmount}</td>
            <td>{order.remainingAmount}</td>
            <td>{order.discountAmount}</td>
            <td dir="ltr">{new Date(order.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;