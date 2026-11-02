import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Root from "./components/Root";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

// Protected Route
function Protected({ children }) {
  return localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        index: true,

        element: (
          <Navigate
            to={
              localStorage.getItem("token")
                ? "/products"
                : "/register"
            }
            replace
          />
        ),
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "products",

        element: (
          <Protected>
            <Products />
          </Protected>
        ),
      },

      {
        path: "cart",

        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;