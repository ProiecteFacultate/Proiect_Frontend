import React from 'react';
import '../css/Home.css'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
    const userData = useSelector((state : any) => state.userData)
    console.log("route")
    console.log(userData);

    if (!userData.isAuthenticated) {
      return <Navigate to="/authentication/login" replace />;
    }
  
    return children;
};
    