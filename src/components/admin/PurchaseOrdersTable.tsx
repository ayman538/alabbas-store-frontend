import type { PurchaseOrder } from "../../types/PurchaseOrder";

type Props = {
  purchaseOrders: PurchaseOrder[];
};

function PurchaseOrdersTable({ purchaseOrders }: Props) {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Total Amount</th>
          <th>Total Quantity</th>
          <th>Items Count</th>
          <th>Created At</th>
           <th>Transaction ID</th>
        </tr>
      </thead>

      <tbody>
        {purchaseOrders.map((purchaseOrder) => (
          <tr key={purchaseOrder.transactionId}>
            <td>{purchaseOrder.totalAmount}</td>
            <td>{purchaseOrder.totalQuantity}</td>
            <td>{purchaseOrder.itemsCount}</td>
             <td>{new Date(purchaseOrder.createdAt).toLocaleString()}</td>
              <td>{purchaseOrder.transactionId}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PurchaseOrdersTable;