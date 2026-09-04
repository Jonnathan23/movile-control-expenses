import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        // element: <RootLayout />, // Se implementará en el paso 6
        children: [
            {
                index: true,
                // element: <DashboardView />, // Se conectará en el paso 6
            },
            {
                path: "transactions",
                // element: <ExpensesView />,
            },
            {
                path: "accounts",
                // element: <AccountsView />,
            },
            {
                path: "more",
                // element: <MoreView />,
            },
        ],
    },
]);
