import { apiClient } from "./apiClient";
import type { Order } from "../types/order";
import type {  PageResponse } from "../types/common";

export async function getOrders(
  page : number,
  size : number
): Promise<PageResponse<Order>> {
  const response = await apiClient.get("/private/orders", {
    params: {
      page,
      size,
    },
  });
  return response.data;
  }

export type OrderSearchCriteria = {
  customerName?: string;
  customerPhone?: string;
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  createdFrom?: string;
  createdTo?: string;
};

export async function searchOrders(
  criteria: OrderSearchCriteria,
  page = 0,
  size = 10
): Promise<PageResponse<Order>> {
  const response = await apiClient.get("/public/orders/search", {
    params: {
      customerName: criteria.customerName || undefined,
      customerPhone: criteria.customerPhone || undefined,
      status: criteria.status || undefined,
      paymentStatus: criteria.paymentStatus || undefined,
      paymentMethod: criteria.paymentMethod || undefined,
      createdFrom: criteria.createdFrom || undefined,
      createdTo: criteria.createdTo || undefined,
      page,
      size,
    },
  });

  return response.data;
}