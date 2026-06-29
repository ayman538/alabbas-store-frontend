import { apiClient } from "./apiClient";
import type { PurchaseOrder } from "../types/PurchaseOrder";
import type { PageResponse } from "../types/common";

export async function getPurchaseOrders(
  page: number,
  size: number
): Promise<PageResponse<PurchaseOrder>> {
  const response = await apiClient.get(
    "/private/products/received-products",
    {
      params: {
        page,
        size,
      },
    }
  );

  return response.data;
}