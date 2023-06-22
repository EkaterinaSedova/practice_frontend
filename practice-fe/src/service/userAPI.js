import {$auth_host, $host} from "./index";

export const getUserById = async (id) => {
    const {data} = await $host.get('users/' + id)
    return data;
}

export const updateUser = async (user) => {
    const {data} = await $auth_host.post('users/update', user)
}