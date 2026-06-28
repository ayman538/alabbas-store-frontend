import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import type { Category } from "../../types/category";
import { getCategories } from "../../api/categoryApi";
import CategorySidebar from "../../components/admin/CategorySidebar";
import { getCookie, removeCookie, setCookie } from "../../utils/cookieUtils";
import { getUsernameFromToken } from "../../utils/jwtUtils";
import "./AdminProductsPage.css";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [language, setLanguage] = useState<"en" | "ar">(
    (getCookie("lang") as "en" | "ar") ?? "en"
  );

  const username = getUsernameFromToken(getCookie("token"));
  const isArabic = language === "ar";

  const isProductsPage = location.pathname.startsWith("/admin/products");
  const isSalesOrdersPage = location.pathname === "/admin/sales-orders";
  const isPurchaseOrdersPage = location.pathname === "/admin/purchase-orders";

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }


    loadCategories();
  }, []);


useEffect(() => {
  document.documentElement.lang = language;
  document.documentElement.dir =
    language === "ar" ? "rtl" : "ltr";
}, [language]);

  function handleLanguageChange(newLanguage: "en" | "ar") {
    setLanguage(newLanguage);
    setCookie("lang", newLanguage);

    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";


  }

  function handleLogout() {
    const confirmed = window.confirm(
      isArabic ? "هل أنت متأكد أنك تريد تسجيل الخروج؟" : "Are you sure you want to logout?"
    );

    if (confirmed) {
      removeCookie("token");
      navigate("/login");
    }
  }

  return (
    <div className="admin-products-page">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>{isArabic ? "الـعبـاس" : "EL ABBAS"}</h2>
        </div>

        <CategorySidebar
          categories={categories}
          selectedCategoryId={selectedCategoryId ?? 0}
          isProductsActive={isProductsPage}
          language={language}
          onCategorySelect={(categoryId) => {
            setSelectedCategoryId(categoryId);
            navigate(`/admin/products/${categoryId}`);
          }}
        />

        <button
          className={isSalesOrdersPage ? "category-button active" : "category-button"}
          onClick={() => navigate("/admin/sales-orders")}
        >
          🧾 {isArabic ? "طلبات البيع" : "Sales Orders"}
        </button>

        <button
          className={isPurchaseOrdersPage ? "category-button active" : "category-button"}
          onClick={() => navigate("/admin/purchase-orders")}
        >
          🚚 {isArabic ? "طلبات الشراء" : "Purchase Orders"}
        </button>

        <div className="sidebar-spacer"></div>

        <button className="logout-button" onClick={handleLogout}>
          🚪 {isArabic ? "تسجيل الخروج" : "Logout"}
        </button>
      </aside>

      <main className="admin-content" dir={isArabic ? "rtl" : "ltr"}>
        <div className={`admin-topbar ${isArabic ? "admin-topbar-rtl" : ""}`}>
          <p className="welcome-text">
            {isArabic ? `مرحباً، ${username}` : `Welcome ${username}`}
          </p>

          <div className="language-switch">
            <button
              className={language === "en" ? "lang-btn active" : "lang-btn"}
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </button>

            <button
              className={language === "ar" ? "lang-btn active" : "lang-btn"}
              onClick={() => handleLanguageChange("ar")}
            >
              AR
            </button>
          </div>
        </div>

       <Outlet context={{ language, categories }} />
      </main>
    </div>
  );
}

export default AdminLayout;