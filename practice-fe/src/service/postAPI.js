import {$auth_host, $host} from "./index";


export const fetchPosts = async () => {
        const {data} = await $auth_host.get('/posts');
        return data;
}

export const fetchPostsByUser = async (id) => {
        const {data} = await $auth_host.get('/posts/user/' + id);
        console.log('hi from postAPI', data)
        return data;
}