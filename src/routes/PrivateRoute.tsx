import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isTokenExpired } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const isExpired = token ? isTokenExpired(token) : true;

  if (!token || isExpired) {
    toast.error("Please sign in", { duration: 2000 });
    dispatch(logout());
    return <Navigate to="/sign-in" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
