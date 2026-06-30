import { apiClient } from "./apiClient";
import type {  Product } from "../types/product";
import type {  PageResponse } from "../types/common";




export async function getProductsByCategory(
  categoryId: number,
  page : number,
  size : number
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



export async function searchProductsByCategory(
  categoryId: number,
  q: string,
  stockQuantity: string,
  page = 0,
  size = 10
): Promise<PageResponse<Product>> {
  const response = await apiClient.get("/public/products/search/category", {
    params: {
      categoryId,
      q,
      stockQuantity,
      page,
      size,
    },
  });

  return response.data;
}