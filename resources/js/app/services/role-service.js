import axios from "axios";

export async function get_role_service(){
    const res = await axios.get('/api/role')
    return res.data
}

export async function store_role_service(data){
    const res = await axios.post('/api/role',data)
    return res.data.data
}