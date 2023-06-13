import React from 'react';
import Header from "../../components/Header/Header";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../routing/paths";
import Footer from "../../components/Footer/Footer";
import styles from './Auth.module.css'

const RegistrationPage = () => {
    return (
        <>
            <Header/>

            <div className={styles.contentBlock}>
                <div className={styles.textBlock}>
                    LOGIN
                </div>

                <div>
                    <input className={styles.inputBlock}
                           placeholder=" login"
                    />
                </div>

                <div className={styles.textBlock}>
                    PASSWORD
                </div>

                <div>
                    <input className={styles.inputBlock}
                           type="password"
                           placeholder=" password"
                    />
                </div>
                <div className={styles.littleTextBlock}>
                    Have account?ㅤ
                    <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
                </div>
                <button className={styles.btn}>REGISTRATION</button>
            </div>

            <Footer/>
        </>
    );
};

export default RegistrationPage;