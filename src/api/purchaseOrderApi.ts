import { apiClient } from "./apiClient";
import type {  PurchaseOrder } from "../types/PurchaseOrder";
import type { PageResponse } from "../types/common";


export async function getPurchaseOrders(): Promise<PageResponse<PurchaseOrder>> {
  const response = await apiClient.get("/private/products/received-products", {});

  return response.data;
}