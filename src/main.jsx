import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import "./index.css";
import Playground from "./pages/playground";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Playground />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="h-full flex flex-col sm:flex-row ">
    <Playground></Playground>
  </div>
);
