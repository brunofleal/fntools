import { createBrowserRouter, type RouteObject, redirect } from "react-router";
import LoginPage from "../../pages/LoginPage/LoginPage";
import HomePage from "../../pages/HomePage/HomePage";
import NavbarWrapper from "../../components/NavbarWrapper/NavbarWrapper";
import AdminPage from "../../pages/AdminPage/AdminPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import NoAccessPermissionPage from "../../pages/NoAccessPermissionPage/NoAccessPermissionPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import OnboardPage from "../../pages/OnboardPage/OnboardPage";
import MethodsPage from "../../pages/MethodsPage/MethodsPage";
import ABFWPage from "../../pages/Methods/ABFWPage/ABFWPage";

const routes: RouteObject[] = [
    {
        path: "/landing",
        Component: HomePage,
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/register",
        Component: RegisterPage,
    },
    {
        path: "/",
        Component: NavbarWrapper,
        children: [
            {
                path: "/",
                loader: () => redirect("/landing"),
            },
            {
                path: "/no-access-permission",
                Component: NoAccessPermissionPage,
            },
            {
                path: "/onboard",
                Component: OnboardPage,
            },
            {
                path: "/methods",
                Component: MethodsPage,
            },
            {
                path: "/methods/abfw",
                Component: ABFWPage,
            },
            {
                path: "/admin",
                Component: AdminPage,
            },
            {
                path: "*",
                Component: NotFoundPage,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
