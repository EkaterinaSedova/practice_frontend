import React from 'react';
import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import {REGISTRATION_ROUTE} from "../../routing/paths";
import Footer from "../../components/Footer/Footer";

const LoginPage = () => {
    return (
        <>
        <Header/>

            <div>
                LOGIN
            </div>

            <div>
                <input
                    placeholder="login"
                />
            </div>

            <div>
                PASSWORD
            </div>

            <div>
                <input
                    type="password"
                    placeholder="password"
                />
            </div>
            <div>
                No account?
                <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
            </div>
            <button>LOGIN</button>

            <Footer/>
        </>
    );
};

export default LoginPage;