import React from 'react';
import styles from './Header.module.css'
import {useAuth} from "../../auth";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../../routing/paths";

const Header = () => {
    const {isAuth} = useAuth();
    const {logout} = useAuth();
    const {currentUser} = useAuth();

    const navigate = useNavigate();

    return (
        <header className={styles.headerBlock}>
            <div className={styles.headerLogo} onClick={() => navigate(MAIN_ROUTE)}>SUPER NAME</div>
            <div>
                {isAuth ?
                    <p className={styles.headerLogo}
                       onClick={() => {
                           navigate(PROFILE_ROUTE + '/' + currentUser.id)
                           window.location.reload()
                       }
                    }
                    >
                        {currentUser.firstname + ' ' + currentUser.lastname}
                    </p>
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