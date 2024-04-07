import axios from "axios";

export async function get_users_service(){
    const res = await axios.get('/api/users')
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