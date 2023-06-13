import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "./paths";
import LoginPage from "../pages/AuthPages/LoginPage";
import RegistrationPage from "../pages/AuthPages/RegistrationPage";


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