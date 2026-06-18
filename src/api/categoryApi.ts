import { apiClient } from "./apiClient";
import type { Category } from "../types/category";


let categoriesRequest: Promise<Category[]> | null = null;

export async function getCategories(): Promise<Category[]> {
  if (!categoriesRequest) {
    categoriesRequest = apiClient
      .get<Category[]>("/private/categories", {

      })
      .then((response) => response.data)
      .finally(() => {
        categoriesRequest = null;
      });
  }

  return categoriesRequest;
}
