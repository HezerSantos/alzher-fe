import App from "./App";
import Home from "./pages/home/home";
import DashboardOverview from "./pages/dashboard/dashboardOverview";
import DashboardAnalytics from "./pages/dashboard/dashboardAnalytics";
import DashboardActivity from "./pages/dashboard/dashboardActivity";
import DashboardScan from "./pages/dashboard/dashboardScan";
import Login from "./pages/auth/loginPage";
import Signup from "./pages/auth/signupPage";
import TermsAndPrivacy from "./pages/termsandPrivacy/termsAndPrivacy";
import Logout from "./pages/auth/logoutPage";
import Error404 from "./pages/errors/error404";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/dashboard",
                element: <DashboardOverview />
            },
            {
                path: "/dashboard/analytics",
                element: <DashboardAnalytics />
            },
            {
                path: "/dashboard/activity",
                element: <DashboardActivity />
            },
            {
                path: "/dashboard/scan",
                element: <DashboardScan />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/terms-and-privacy",
                element: <TermsAndPrivacy />
            },
            {
                path: "/logout",
                element: <Logout />
            }
        ]
    }
]

export default routes