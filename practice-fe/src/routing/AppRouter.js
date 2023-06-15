import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import {LOGIN_ROUTE, MAIN_ROUTE} from "./paths";
import {useAuth} from "../auth";

const AppRouter = () => {
    const {isAuth} = useAuth()
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact element={<Component />}/>
            )}
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact element={<Component />}/>
            )}
            {isAuth ?
                <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
                :
                <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
            }

        </Routes>
    );
};

export default AppRouter;