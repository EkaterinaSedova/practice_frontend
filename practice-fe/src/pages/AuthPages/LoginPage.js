import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import {NavLink, useNavigate} from "react-router-dom";
import {MAIN_ROUTE, REGISTRATION_ROUTE} from "../../routing/paths";
import Footer from "../../components/Footer/Footer";
import styles from './Auth.module.css'
import {useAuth} from "../../auth";

const LoginPage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useAuth()

    const handleLogin = async () => {
        try {
            await login(user, password);
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <>
            <Header/>
        <div className={styles.contentBlock}>
            <div className={styles.textBlock}>
                EMAIL
            </div>

            <div>
                <input
                    className={styles.inputBlock}
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    placeholder=" email"
                />
            </div>

            <div className={styles.textBlock}>
                PASSWORD
            </div>

            <div>
                <input
                    className={styles.inputBlock}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder=" password"
                    type="password"
                />
            </div>
            <div className={styles.littleTextBlock}>
                {'No account?ㅤ'}
                <NavLink to={REGISTRATION_ROUTE}>{'Sign up!'}</NavLink>
            </div>
            <button className={styles.btn} onClick={() => handleLogin()}>LOGIN</button>
        </div>
        </>
    );
};

export default LoginPage;