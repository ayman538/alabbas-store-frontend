import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { Product } from "../../types/product";
import { getProductsByCategory } from "../../api/productApi";
import ProductsTable from "../../components/admin/ProductsTable";
import type { Category } from "../../types/category";

type AdminOutletContext = {
  language: "en" | "ar";
    categories: Category[];

};

function ProductsPage() {



  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");
  const { language, categories } = useOutletContext<AdminOutletContext>();
  const { categoryId } = useParams();
    const isArabic = language === "ar";




  const selectedCategory = categories.find(
    (category) => category.id === Number(categoryId)
  );

  useEffect(() => {
    async function loadProducts() {
      if (!categoryId) {
        return;
      }

      try {
        setLoadingProducts(true);
        setError("");

        const data = await getProductsByCategory(Number(categoryId));
        setProducts(data.content);
      } catch {
        setError(isArabic ? "فشل تحميل المنتجات" : "Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, [categoryId, isArabic]);

  return (
    <>
      <div className="admin-content-header">

          <h2>{isArabic ? selectedCategory?.nameAr : selectedCategory?.nameEn}</h2>

         {categoryId && (
           <button className="action-button">
             {isArabic ? "إضافة منتج جديد" : "Add New Product"}
           </button>
         )}
      </div>

      {!categoryId && (
        <h2>{isArabic ? "اختر تصنيفاً لعرض المنتجات" : "Select a category to view products"}</h2>
      )}

      {loadingProducts && <p>{isArabic ? "جاري تحميل المنتجات..." : "Loading products..."}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {categoryId && <ProductsTable products={products} language={language} />}
    </>
  );
}

export default ProductsPage;