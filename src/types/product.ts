
export type Product = {
  id: number;
  sku: string;
  nameEn: string;
  nameAr: string;
  description: string;
  price: number;
  storePrice: number;
  imageUrl: string;
  uploadedImageUrl: string;
  stockQuantity: number;
  published: boolean;
  categoryId: number;
  categoryName: string;
  companyEn: string | null;
  companyAr: string | null;
};



