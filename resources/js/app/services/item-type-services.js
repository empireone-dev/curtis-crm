import axios from "axios";

export async function get_item_types_service(){
    const res = await axios.get('/api/item_types')
    return res.data
}

export async function store_item_types_service(data){
    const res = await axios.post('/api/item_types',data)
    return res.data
}

export async function delete_item_types_service(id){
    const res = await axios.delete('/api/item_types/'+id)
    return res.data
}

export async function update_item_types_service(data){
    const res = await axios.put(`/api/item_types/${data.id}`, data);
    return res.data;
}