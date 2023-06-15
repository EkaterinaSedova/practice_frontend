import React, {createContext, useContext, useEffect, useState} from 'react';
import {getUserById, loginUser, registerUser} from "../service/authAPI";
import jwt_decode from 'jwt-decode'

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

function Auth ({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState('')

    const login = async (email, password) => {
        await loginUser(email, password);
        setIsAuth(true);
    }

    const register = async (email, password, firstname, lastname) => {
        await registerUser(email, password, firstname, lastname);
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
                    console.log(user)
                    setCurrentUser(user.firstname + ' ' + user.lastname)
                    setIsAuth(true)

                } catch (e) {
                    logout();
                }
            }
        })();
    }, []);
    return (
        <AuthContext.Provider value={{ isAuth, currentUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth;