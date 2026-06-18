export type OrderItem = {
  itemId: number;
  productId: number;
  productName: string;
  quantity: number;
  status: string;
  unitPrice: number;
  totalPrice: number;
};

export type Order = {
  id: number;
  customerName: string;
  customerPhone: string;
  customerArea: string;
  customerAddress: string;
  status: string;
  totalPrice: number;
  notes: string;
  paymentStatus: string;
  paymentMethod: string;
  paidAmount: number;
  remainingAmount: number;
  discountAmount: number;
  createdAt: string;
  items: OrderItem[];
};