import { apiClient } from "./apiClient";
import type { Order } from "../types/order";
import type {  PageResponse } from "../types/common";

export async function getOrders(
  page = 0,
  size = 100
): Promise<PageResponse<Order>> {
  const response = await apiClient.get("/private/orders", {
    params: {
      page,
      size,
    },
  });

  return response.data;
}