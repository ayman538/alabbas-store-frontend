import { useState } from "react";
import type { Category } from "../../types/product";

type Props = {
  categories: Category[];
  selectedCategoryId: number;
  isProductsActive: boolean;
  onCategorySelect: (categoryId: number) => void;
};

function CategorySidebar({
  categories,
  selectedCategoryId,
  isProductsActive,
  onCategorySelect,
}: Props) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  return (
    <>
      <button
        className="sidebar-section-title"
        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
      >
        {isCategoriesOpen ? "▼" : "▶"} 📂   Categories

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
            {category.nameEn}
          </button>


        ))}
    </>
  );
}

export default CategorySidebar;