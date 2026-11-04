import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Root from "./components/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function Protected({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Navigate to={localStorage.getItem("token") ? "/products" : "/register"} replace />
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "products", element: <Products /> },
      {
        path: "cart",
        element: <Protected><Cart /></Protected>,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
