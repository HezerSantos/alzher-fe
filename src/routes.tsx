import App from "./App";
import Home from "./pages/home/home";
import DashboardOverview from "./pages/dashboard/dashboardOverview";
import DashboardAnalytics from "./pages/dashboard/dashboardAnalytics";
import DashboardActivity from "./pages/dashboard/dashboardActivity";
import DashboardScan from "./pages/dashboard/dashboardScan";
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
            }
        ]
    }
]

export default routes