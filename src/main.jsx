import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Component/Root";
import Home from "./Component/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addSchedule",
        element: <Home></Home>,
      },
      {
        path: "/allSchedule",
        element: <Home></Home>,
      },
      {
        path: "/signIn",
        element: <Home></Home>,
      },
      {
        path: "/singUp",
        element: <Home></Home>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
