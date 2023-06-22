import React from 'react';
import styles from './Header.module.css'
import {useAuth} from "../../auth";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../../routing/paths";
import {BsFillHouseDoorFill} from 'react-icons/bs'

const Header = () => {
    const {isAuth} = useAuth();
    const {logout} = useAuth();
    const {currentUser} = useAuth();

    const navigate = useNavigate();

    return (
        <header className={styles.headerBlock}>
            <div className={styles.headerLogo} onClick={() => navigate(MAIN_ROUTE)}>
                <BsFillHouseDoorFill className={styles.headerLogoIcon}/>
                <span>HOME</span>
            </div>
            <div>
                {isAuth ?
                    <div className={styles.headerLogo}
                       onClick={() => {
                           navigate(PROFILE_ROUTE + '/' + currentUser.id)
                           window.location.reload()
                       }
                    }
                    >
                        <div className={styles.userNameContainer}>
                            <img
                                className={styles.userNameImg}
                                src={process.env.REACT_APP_API_URL + currentUser.profile_img}
                            />
                            <p className={styles.userNameItem}>
                                {currentUser.firstname + ' ' + currentUser.lastname}
                            </p>
                        </div>
                    </div>
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
                    <></>
                }

            </div>
        </header>

    );
};

export default Header;