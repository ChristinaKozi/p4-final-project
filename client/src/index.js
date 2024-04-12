import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import routes from "./routes.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<RouterProvider router={router} />);
