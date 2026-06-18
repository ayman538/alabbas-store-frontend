import { useState } from "react";
import axios from "axios";

import { login } from "../../api/authApi";
import { setCookie } from "../../utils/cookieUtils";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";





function LoginPage() {
    const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isArabic = language === "ar";

  function handleLanguageChange(newLanguage: "en" | "ar") {
    setLanguage(newLanguage);
    setCookie("lang", newLanguage);

      setUsername("");
      setPassword("");
      setError("");

    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        username,
        password,
      });

      setCookie("token", response.token);
      navigate("/admin");
    }catch (error) {
       console.log("LOGIN ERROR:", error);

       if (axios.isAxiosError(error)) {
         const apiMessage = error.response?.data?.message;

         setError(apiMessage ?? "Unexpected error occurred");
       } else {
         setError("Unexpected error occurred");
       }
     } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-language">
          <button
            className={language === "en" ? "lang-btn active" : "lang-btn"}
            onClick={() => handleLanguageChange("en")} >
            EN
          </button>

          <button
            className={language === "ar" ? "lang-btn active" : "lang-btn"}
            onClick={() => handleLanguageChange("ar")}>
            AR
          </button>
        </div>

        <div className="login-brand">
          <h1>🏪 {isArabic ? "العبـاس" : "El Abbas"}</h1>
          <p>{isArabic ? "لوحة التحكم" : "Admin Panel"}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>{isArabic ? "اسم المستخدم" : "Username"}</label>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder={isArabic ? "ادخل اسم المستخدم" : "Enter username"}
          />

          <label>{isArabic ? "كلمة المرور" : "Password"}</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={isArabic ? "ادخل كلمة المرور" : "Enter password"}
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading
              ? isArabic
                ? "جاري الدخول..."
                : "Logging in..."
              : isArabic
                ? "تسجيل الدخول"
                : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;