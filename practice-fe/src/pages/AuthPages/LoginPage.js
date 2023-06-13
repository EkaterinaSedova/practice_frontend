import React from 'react';
import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import {REGISTRATION_ROUTE} from "../../routing/paths";
import Footer from "../../components/Footer/Footer";
import styles from './Auth.module.css'

const LoginPage = () => {
    return (
        <>
        <Header/>
        <div className={styles.contentBlock}>
            <div className={styles.textBlock}>
                LOGIN
            </div>

            <div>
                <input
                    className={styles.inputBlock}
                    placeholder=" login"
                />
            </div>

            <div className={styles.textBlock}>
                PASSWORD
            </div>

            <div>
                <input
                    className={styles.inputBlock}
                    type="password"
                    placeholder=" password"
                />
            </div>
            <div className={styles.littleTextBlock}>
                {'No account?ㅤ'}
                <NavLink to={REGISTRATION_ROUTE}>{'Sign up!'}</NavLink>
            </div>
            <button className={styles.btn}>LOGIN</button>
        </div>

            <Footer/>
        </>
    );
};

export default LoginPage;