import React from 'react';
import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../routing/paths";
import Footer from "../../components/Footer/Footer";

const RegistrationPage = () => {
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
                Have account?
                <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
            </div>
            <button>REGISTRATION</button>

            <Footer/>
        </>
    );
};

export default RegistrationPage;