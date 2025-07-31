import App from "./App";
import Home from "./pages/home/home";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: null,
        children: [
            {
                index: true,
                element: <Home />
            },
        ]
    }
]

export default routes