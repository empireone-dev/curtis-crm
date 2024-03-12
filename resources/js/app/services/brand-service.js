import axios from "axios";

export async function get_brands_service(){
    const res = await axios.get('/api/brands')
    return res.data
}

export async function store_brands_service(data){
    const res = await axios.post('/api/brands',data)
    return res.data
}