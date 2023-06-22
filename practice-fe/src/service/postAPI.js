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
}

export const createPost = async (post) => {
        const {data} = await $auth_host.post('/posts', post)
}

export const fetchPostsFromSubscriptions = async (id) => {
        const {data} = await $auth_host.get('/posts/subscriptions/' + id);
        return data;
}

