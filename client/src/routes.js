
//import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import App from "./components/App";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    }
    // {
    //     path: "/login",
    //     element: <Login />,
    //     errorElement: <ErrorPage />
    // }
]

export default routes;