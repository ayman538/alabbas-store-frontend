import type { Product } from "../../types/product";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

import { getCookie, setCookie } from "../../utils/cookieUtils";



type Props = {
  products: Product[];
   language: "en" | "ar";
};


function ProductsTable({ products, language }: Props) {

        const isArabic = language === "ar";

  return (

    <table className="table-wrapper">
      <thead>
        <tr>
             <th>{isArabic ? "الاسم" : "Name"}</th>
              <th>{isArabic ? "السعر" : "Price"}</th>
              <th>{isArabic ? "سعر المتجر" : "Store Price"}</th>
              <th>{isArabic ? "الكمية المتوفرة" : "Stock Quantity"}</th>
              <th>{isArabic ? "الوصف" : "Description"}</th>
              <th>{isArabic ? "كود المنتج" : "SKU"}</th>
               <th>{isArabic ? "الشركة المصنعة" : "Manufacturer"}</th>
              <th>{isArabic ? "الصورة" : "Image"}</th>
              <th>{isArabic ? "الإجراءات" : "Actions"}</th>

        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{isArabic ? product.nameAr : product.nameEn}</td>
            <td>{product.price}</td>
            <td>{product.storePrice}</td>
            <td>{product.stockQuantity}</td>
            <td>{isArabic ? product.descriptionAr : product.description}</td>
             <td>{product.sku}</td>
             <td>{isArabic ? product.companyAr : product.companyEn}</td>

        <td>
          {product.uploadedImageUrl ? (
            <img
              src={product.uploadedImageUrl}
              alt={isArabic ? product.nameAr : product.nameEn}
              className="product-image"
            />
          ) : (
            <span>{isArabic ? "لا توجد صورة" : "No Image"}</span>
          )}
        </td>


           <td>
             <button className="icon-button">
               <FaEdit />
             </button>

             <button className="icon-button">
               <FaTrash />
             </button>
           </td>
          </tr>
        ))}
    </tbody>
    </table>
  );
}

export default ProductsTable;