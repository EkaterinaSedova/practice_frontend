import {$auth_host} from "./index";

export const deleteLike = async (id) => {
    const {data} = await $auth_host.delete('/likes', {data: {id: id}})
    console.log(data)
    return data;
}
export const createLike = async (user_id, post_id) => {
    const {data} = await $auth_host.post('/likes', {
        user_id: user_id,
        post_id: post_id
    })
    return data.id;
}