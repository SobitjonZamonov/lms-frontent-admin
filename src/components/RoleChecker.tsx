import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const RoleChecker = ({ roles }: { roles: string[] }) => {
  const { user, isLogged } = useAuthStore((store) => store);
  if (!isLogged) return <Navigate to="/login" />;
  if (isLogged && user && !roles.includes(user?.role))
    return <Navigate to="/login" />;
  return <Outlet />;
};
export default RoleChecker;