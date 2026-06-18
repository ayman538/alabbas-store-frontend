import type { Order } from "../../types/product";

type Props = {
  orders: Order[];
};

function OrdersTable({ orders }: Props) {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Phone</th>
          <th>Area</th>
          <th>Address</th>
          <th>Status</th>
          <th>Total Price</th>
          <th>Payment Status</th>
          <th>Payment Method</th>
          <th>Paid</th>
          <th>Remaining</th>
          <th>Discount</th>
          <th>Created At</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.customerName}</td>
            <td>{order.customerPhone}</td>
            <td>{order.customerArea}</td>
            <td>{order.customerAddress}</td>
            <td>{order.status}</td>
            <td>{order.totalPrice}</td>
            <td>{order.paymentStatus}</td>
            <td>{order.paymentMethod}</td>
            <td>{order.paidAmount}</td>
            <td>{order.remainingAmount}</td>
            <td>{order.discountAmount}</td>
            <td>{order.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;