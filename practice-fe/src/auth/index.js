import React, {createContext, useContext, useEffect, useState} from 'react';
import {loginUser, registerUser} from "../service/authAPI";
import jwt_decode from 'jwt-decode'
import {getUserById} from "../service/userAPI";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

function Auth ({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        sex: "",
        profile_img: "",
        createdAt: ""
    })
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    const login = async (email, password) => {
        await loginUser(email, password);
        const token = jwt_decode(localStorage.getItem('token'))
        const user = await getUserById(token.id)
        setIsAuth(true);
        setCurrentUser(user)
    }

    const register = async (email, password, firstname, lastname) => {
        await registerUser(email, password, firstname, lastname);
        const token = jwt_decode(localStorage.getItem('token'))
        const user = await getUserById(token.id)
        setCurrentUser(user)
        setIsAuth(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
    }

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                try {
                    const token = jwt_decode(localStorage.getItem('token'))
                    const user = await getUserById(token.id)
                    setIsAuth(true)
                    setCurrentUser(user)

                } catch (e) {
                    logout();
                }
            }
            setIsAuthChecked(true);
        })();
    }, []);
    return (
        <AuthContext.Provider value={{ isAuth, currentUser, register, login, logout }}>
            {isAuthChecked && children}
        </AuthContext.Provider>
    )
}

export default Auth;