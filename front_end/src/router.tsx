import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Test from "./Test.tsx";
import Register from './components/Register.tsx';
import LogIn from './components/LogIn.tsx';
import HomePage from './components/Home.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import Profile from './components/Profile.tsx';

export const router = createBrowserRouter([
    {
      path: "/test",
      element: <Test />
    },
    {
      path: "/authentication/register",
      element: <Register />
    },
    {
      path: "/authentication/login",
      element: <LogIn />
    },
    {
      path: "/home",
      element: <>
        <ProtectedRoute>
            <HomePage />
        </ProtectedRoute>
      </>
        
    },
    {
      path: "/profile",
      element: <>
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
      </>
        
    }
  ]);