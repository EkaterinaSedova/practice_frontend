import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./paths";
import LoginPage from "../pages/AuthPages/LoginPage";
import RegistrationPage from "../pages/AuthPages/RegistrationPage";
import MainPage from "../pages/MainPage/MainPage";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage,
    },
]

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
]