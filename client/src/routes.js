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
        path: "/products",
        element: <Products />,
        errorElement: <ErrorPage />
    },
    {
        path: "/products/new",
        element: <ProductForm />,
        errorElement: <ErrorPage />
    }
]

export default routes;