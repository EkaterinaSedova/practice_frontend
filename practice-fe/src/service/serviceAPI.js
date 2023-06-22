import {$auth_host} from "./index";

export const deleteSub = async (subId, subToId) => {
    const {data} = await $auth_host.delete('/subscriptions', {data: {
            subscriber_id: subId,
            subscriber_to_id: subToId
        }})
}

export const createSub = async (subId, subToId) => {
    const {data} = await $auth_host.post('/subscriptions', {
        subscriber_id: subId,
        subscriber_to_id: subToId
    })
    return data;
}