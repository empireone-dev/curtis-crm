import axios from "axios";

export async function get_brands_service(){
    const res = await axios.get('/api/brands')
    return res.data
}

export async function store_brands_service(data){
    const res = await axios.post('/api/brands',data)
    return res.data
}

export async function delete_brand_service(id){
    const res = await axios.delete('/api/brands/'+id)
    return res.data
}

export async function update_brand_service(data){
    const res = await axios.put(`/api/brands/${data.id}`, data);
    return res.data;
}