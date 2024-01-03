import React from 'react';
import '../css/Home.css'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
    const userData = useSelector((state : any) => state.userData)

    if (!userData.isAuthenticated) {
      return <Navigate to="/authentication/login" replace />;
    }
  
    return children;
};
    