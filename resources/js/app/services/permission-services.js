import axios from "axios";

export async function get_permission_service(){
    const res = await axios.get('/api/permissions')
    return res.data
}

export async function store_permission_service(data){
    const res = await axios.post('/api/permissions',data)
    return res.data
}

export async function delete_permission_service(id){
    const res = await axios.delete('/api/permissions/'+id)
    return res.data
}

