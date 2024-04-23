import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import routes from "./routes.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from "./contexts/UserContext.js";
import { ProductProvider } from "./contexts/ProductContext.js";

const router = createBrowserRouter(routes);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <UserProvider >
        <ProductProvider>
            <RouterProvider router={router} >
                    <App />
            </RouterProvider>
        </ProductProvider>
    </UserProvider>
);
