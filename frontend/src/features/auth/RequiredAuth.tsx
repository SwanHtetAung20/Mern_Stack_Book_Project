import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate, useLocation } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("../../components/Layout"));

const RequiredAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();
  return token ? (
    <Layout />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default RequiredAuth;
