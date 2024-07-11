import axios from "axios";

export async function get_user_service(){
    const res = await axios.get('/api/user')
    return res.data
}
export async function get_users_service(role_id){
    const res = await axios.get('/api/users/'+role_id+window.location.search)
    return res.data
}

export async function store_users_service(data){
    const res = await axios.post('/api/users',data)
    return res.data
}

export async function delete_users_service(id){
    const res = await axios.delete('/api/users/'+id)
    return res.data
}
export async function get_user_by_role_service(id){
    const res = await axios.get('/api/get_user_by_role/'+id)
    return res.data
}

export async function update_users_service(data){
    const res = await axios.put(`/api/users/${data.id}`, data);
    return res.data;
}

export async function transfer_ticket_service(data){
    const res = await axios.put(`/api/transfer_ticket/${data.agent}`, data);
    return res.data;
}