import {$auth_host} from "./index";

export const fetchCommentsByPost = async (id) => {
    const {data} = await $auth_host.get('/comments/' + id);
    console.log('hi from commentAPI',data)
    return data;
}

export const createComment = async (user_id, post_id, content) => {
    const {data} = await $auth_host.post('/comments', {
        user_id: user_id,
        post_id: post_id,
        content: content
    })
    return data;
}

export const deleteComment = async (id) => {
    const {data} = await $auth_host.delete('/comments', {data: {comment_id: id}})
    console.log(data)
}