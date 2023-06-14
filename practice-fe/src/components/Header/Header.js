import React from 'react';
import styles from './Header.module.css'

const Header = () => {
    const isAuth = false;
    return (
        <header className={styles.headerBlock}>
            <div className={styles.headerLogo}>SUPER NAME</div>
            <div className={styles.headerComponent}>
                {isAuth ?
                    <p>exit</p>
                    :
                    <p>login</p>
                }

            </div>
        </header>

    );
};

export default Header;