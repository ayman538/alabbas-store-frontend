import { apiClient } from "./apiClient";
import type {  Product } from "../types/product";
import type {  PageResponse } from "../types/common";
export async function getProductsByCategory(
  categoryId: number,
  page = 0,
  size = 50
): Promise<PageResponse<Product>> {
  const response = await apiClient.get(
    `/public/products/category/${categoryId}`,
    {
      params: {
        page,
        size,
      }
    }
  );

  return response.data;
}