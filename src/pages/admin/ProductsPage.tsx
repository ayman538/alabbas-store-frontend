import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { Product } from "../../types/product";
import { getProductsByCategory,searchProductsByCategory } from "../../api/productApi";
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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const hasFilters =
  searchName.trim() !== "" ||
  stockQuantity.trim() !== "";


  const selectedCategory = categories.find(
    (category) => category.id === Number(categoryId)
  );

useEffect(() => {
  setPage(0);
}, [categoryId]);

  useEffect(() => {
    async function loadProducts() {
      if (!categoryId) {
        return;
      }

      try {
        setLoadingProducts(true);
        setError("");

        const query = searchName.trim();

      const data = hasFilters
        ? await searchProductsByCategory(
            Number(categoryId),
            query,
            stockQuantity,
            page,
            pageSize
          )
        : await getProductsByCategory(
            Number(categoryId),
            page,
            pageSize
          );

        setProducts(data.content);
        setTotalPages(data.totalPages);
      } catch {
        setError(isArabic ? "فشل تحميل المنتجات" : "Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, [categoryId,page,searchName, stockQuantity]);

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


    <div className="filter-section">
       {categoryId && (
           <button className="filter-toggle"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        {isSearchOpen
          ? isArabic
            ? "▴ إخفاء البحث"
            : "▴ Hide Search"
          : isArabic
          ? "✚ البحث والفلاتر"
            : "✚ Search & Filters"}
      </button>
        )}

      {isSearchOpen && (
        <div className="filter-content">
          {categoryId && (
          <input
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
            placeholder={isArabic ? "اسم المنتج" : "Product name"}
          />
            )}
          {categoryId && (
          <input
            type="number"
            value={stockQuantity}
            onChange={(event) => setStockQuantity(event.target.value)}
            placeholder={isArabic ? "الكمية المتوفرة" : "Stock quantity"}
          />
            )}
        </div>
      )}
    </div>


     {categoryId && <ProductsTable products={products} language={language} />}
     {categoryId && totalPages > 1 && (
       <div className="pagination">
         <button
           className="pagination-button"
           disabled={page === 0}
           onClick={() => setPage(page - 1)}
         >
           {isArabic ? "السابق" : "Previous"}
         </button>

         <span className="pagination-info">
           {isArabic
             ? `صفحة ${page + 1} من ${totalPages}`
             : `Page ${page + 1} of ${totalPages}`}
         </span>

         <button
           className="pagination-button"
           disabled={page + 1 >= totalPages}
           onClick={() => setPage(page + 1)}
         >
           {isArabic ? "التالي" : "Next"}
         </button>
       </div>
     )}    </>

  );
}

export default ProductsPage;