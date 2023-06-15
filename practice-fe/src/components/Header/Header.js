import React from 'react';
import styles from './Header.module.css'
import {useAuth} from "../../auth";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../routing/paths";

const Header = () => {
    const {isAuth} = useAuth();
    const {logout} = useAuth();
    const {currentUser} = useAuth();

    const navigate = useNavigate();

    return (
        <header className={styles.headerBlock}>
            <div className={styles.headerLogo}>SUPER NAME</div>
            <div>
                {isAuth ?
                    <p>{currentUser}</p>
                    :
                    <></>
                }
            </div>
            <div className={styles.headerComponent}>
                {isAuth ?
                    <>
                        <p onClick={() => {logout(); navigate(LOGIN_ROUTE)}}>exit</p>
                    </>
                    :
                    <p onClick={() => navigate(LOGIN_ROUTE)}>login</p>
                }

            </div>
        </header>

    );
};

export default Header;