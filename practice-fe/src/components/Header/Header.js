import React from 'react';
import styles from './Header.module.css'
import {useAuth} from "../../auth";

const Header = () => {
    const {isAuth} = useAuth();
    const {logout} = useAuth();
    return (
        <header className={styles.headerBlock}>
            <div className={styles.headerLogo}>SUPER NAME</div>
            <div className={styles.headerComponent}>
                {isAuth ?
                    <p onClick={() => logout()}>exit</p>
                    :
                    <p>login</p>
                }

            </div>
        </header>

    );
};

export default Header;