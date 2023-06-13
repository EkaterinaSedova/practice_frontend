import React from 'react';
import styles from './Header.module.css'

const Header = () => {
    return (
            <ul className={styles.headerBlock}>
                <li className={styles.headerLogo}>superprikol</li>
                <li className={styles.headerComponent}>prikol2</li>
                <li className={styles.headerComponent}>prikol3</li>
                <li className={styles.headerComponent}>login</li>
            </ul>
    );
};

export default Header;