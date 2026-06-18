import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookieUtils";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const token = getCookie("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;