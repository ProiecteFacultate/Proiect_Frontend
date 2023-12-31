import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Test from "./Test.tsx";
import Register from './components/Register.tsx';

export const router = createBrowserRouter([
    {
      path: "/test",
      element: <Test />
    },
    {
      path: "/authentication/register",
      element: <Register />
    },
  ]);