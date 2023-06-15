import {$host} from "./index";

export const loginUser = async (email, password) => {
    const {data} = await $host.post('auth/login', {
        email: email,
        password: password,
    })

    localStorage.setItem('token', data.token)
}

export const registerUser = async (email, password, firstname, lastname) => {
    const {data} = await  $host.post('auth/registration', {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    localStorage.setItem('token', data.token)
}

export const getUserById = async (id) => {
    const {data} = await $host.get('users/' + id)
    return data;
}