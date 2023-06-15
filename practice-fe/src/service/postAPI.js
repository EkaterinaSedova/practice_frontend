import {$auth_host, $host} from "./index";


export const fetchPosts = async () => {
        const {data} = await $auth_host.get('/posts');
        return data;
}