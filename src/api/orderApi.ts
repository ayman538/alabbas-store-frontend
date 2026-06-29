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