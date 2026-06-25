import { useState } from "react";
import type { Category } from "../../types/product";
import { getCookie, setCookie } from "../../utils/cookieUtils";

type Props = {
  categories: Category[];
  selectedCategoryId: number;
  isProductsActive: boolean;
  onCategorySelect: (categoryId: number) => void;
  language: "en" | "ar";
};


function CategorySidebar({
  categories,
  selectedCategoryId,
  isProductsActive,
  onCategorySelect,
  language,
}: Props) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const isArabic = language === "ar";

  return (
    <>
      <button
        className="sidebar-section-title"
        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
      >
      {isCategoriesOpen ? "▼" : "▶"} 📂   {isArabic ? "الاصناف" : "Categories"}

      </button>

      {isCategoriesOpen &&
        categories.map((category) => (
          <button
            key={category.id}
            className={
             isProductsActive && category.id === selectedCategoryId
               ? "category-button sidebar-sub-item active"
                  : "category-button sidebar-sub-item"
            }
            onClick={() => onCategorySelect(category.id)}
          >

                {isArabic ? category?.nameAr : category?.nameEn}

          </button>


        ))}
    </>
  );
}

export default CategorySidebar;