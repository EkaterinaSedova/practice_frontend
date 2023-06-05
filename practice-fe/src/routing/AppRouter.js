import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "./routes";
import {LOGIN_ROUTE} from "./paths";

const AppRouter = () => {
    const isAuth = false
    return (
        <Routes>
            {!isAuth && publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact element={<Component />}/>
            )}
            <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;