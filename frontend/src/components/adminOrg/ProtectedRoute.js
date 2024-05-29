// src/components/adminOrg/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
