import { createBrowserRouter } from "react-router";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Transactions, { transactionAction, transactionLoader } from "../pages/Transactions";
import Categories, { categoriesAction, categoryLoader } from "../pages/Categories";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'transactions',
                action: transactionAction,
                loader: transactionLoader,
                element: <ProtectedRoute><Transactions /></ProtectedRoute>
            },
            {
                path: 'categories',
                action: categoriesAction,
                loader: categoryLoader,
                element: <ProtectedRoute><Categories /></ProtectedRoute>
            },
            {
                path: 'auth',
                element: <Auth />
            }
        ]
    }
])