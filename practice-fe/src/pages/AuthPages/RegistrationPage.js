import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../../routing/paths";
import Footer from "../../components/Footer/Footer";
import styles from './Auth.module.css'
import {useAuth} from "../../auth";

const RegistrationPage = () => {

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const {register} = useAuth()

    const handleRegister = async () => {
        try {
            if(firstname && lastname) {
                await register(user, password, firstname, lastname);
                navigate(MAIN_ROUTE);
            } else alert("Имя и фамилия не должны быть пустыми.");
        } catch (e) {
            alert(e.response.data.message || e.response.data)
        }
    }

    return (
        <>
            <Header/>

            <div className={styles.contentBlock}>

                <div className={styles.textBlock}>
                    FIRSTNAME
                </div>

                <div>
                    <input
                        className={styles.inputBlock}
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        maxLength={16}
                        placeholder=" firstname"
                    />
                </div>

                <div className={styles.textBlock}>
                    LASTNAME
                </div>

                <div>
                    <input
                        className={styles.inputBlock}
                        maxLength={16}
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        placeholder=" lastname"
                    />
                </div>

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
                    Have account?ㅤ
                    <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
                </div>
                <button className={styles.btn} onClick={() => handleRegister()}>REGISTRATION</button>
            </div>
        </>
    );
};

export default RegistrationPage;