import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";


const routes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    }
    // {
    //     path: "/about",
    //     element: <About />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/challenge",
    //     element: <Challenge />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/songs",
    //     element: <Songs />,
    //     errorElement: <ErrorPage />
    // }
]

export default routes;