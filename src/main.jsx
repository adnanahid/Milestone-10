import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Component/Root";
import Home from "./Component/Home";
import AddSchedule from "./Component/AddSchedule";
import AllSchedule from "./Component/AllSchedule";
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import UpdateForm from "./Component/UpdateForm";

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
        element: <AddSchedule></AddSchedule>,
      },
      {
        path: "/allSchedule",
        loader: () => fetch("http://localhost:3333/patientsAppointmentForm"),
        element: <AllSchedule></AllSchedule>,
      },
      {
        path: "/updateForm/:_id",
        loader: ({ params }) =>
          fetch(`http://localhost:3333/patientsAppointmentForm/${params._id}`),
        element: <UpdateForm></UpdateForm>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/singUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
