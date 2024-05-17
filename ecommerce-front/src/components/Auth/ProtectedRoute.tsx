import { Navigate } from "react-router-dom";
import React from "react";
import { useAppSelector } from "@/store/hook";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) {
    return <Navigate to={"/login?message=login_required"} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
