import axios from "axios";

export async function get_role_service(){
    const res = await axios.get('/api/role')
    return res.data
}

export async function store_role_service(data){
    const res = await axios.post('/api/role',data)
    return res.data
}

export async function delete_role_service(id){
    const res = await axios.delete('/api/role/'+id)
    return res.data
}

export async function update_role_service(data){
    const res = await axios.put(`/api/role/${data.id}`, data);
    return res.data;
}