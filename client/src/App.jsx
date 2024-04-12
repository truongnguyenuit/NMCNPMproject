import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.jsx";
import { ToastContainer } from "react-toastify";

export const ENDPOINT = 'http://localhost:5001/api'

function App() {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
