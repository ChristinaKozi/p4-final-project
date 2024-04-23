
//import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import App from "./components/App";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/products_list",
        element: <Products />,
        errorElement: <ErrorPage />
    },
    {
        path: "/create_product",
        element: <ProductForm />,
        errorElement: <ErrorPage />
    }
]

export default routes;