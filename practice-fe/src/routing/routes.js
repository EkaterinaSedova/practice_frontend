import {CHAT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./paths";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";


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