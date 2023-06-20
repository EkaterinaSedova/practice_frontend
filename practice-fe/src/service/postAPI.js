import {$auth_host, $host} from "./index";


export const fetchPosts = async () => {
        const {data} = await $auth_host.get('/posts');
        return data;
}

export const fetchPostsByUser = async (id) => {
        const {data} = await $auth_host.get('/posts/user/' + id);
        return data;
}

export const deletePost = async (id) => {
        const {data} = await $auth_host.delete('/posts', {data: {post_id: id}})
        console.log(data)
}

/* export const fetchCommentsByPost = async (post_id) => {
        const {data} = await $auth_host.get('/comments', {data: {post_id: post_id}})
        console.log('hi from postAPI',data)
        return data;
} */

