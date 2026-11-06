import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardProduct from "./pages/DashboardProduct";
import DashboardProductCreate from "./pages/DashboardProductCreate";

function Protected({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Protected><Dashboard /></Protected> },
  { path: "/product", element: <Protected><DashboardProduct /></Protected> },
  { path: "/product/create", element: <Protected><DashboardProductCreate /></Protected> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;
