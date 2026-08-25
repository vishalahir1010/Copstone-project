import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const location = useLocation();

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <Loader
        fullScreen
        text="Checking authentication..."
      />
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;