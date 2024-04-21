import axios from "axios";

export async function get_email_template_service(){
    const res = await axios.get('/api/email_templates')
    return res.data
}

export async function store_email_template_service(data){
    const res = await axios.post('/api/email_templates',data)
    return res.data
}

export async function delete_email_template_service(id){
    const res = await axios.delete('/api/email_templates/'+id)
    return res.data
}

export async function update_email_template_service(data){
    const res = await axios.put(`/api/email_templates/${data.id}`, data);
    return res.data;
}

export async function validation_service(data){
    const res = await axios.post(`/api/validation`,data);
    return res.data;
}

export async function availability_service(data){
    const res = await axios.post(`/api/availability`,data);
    return res.data;
}

export async function callback_service(data){
    const res = await axios.post(`/api/callback`,data);
    return res.data;
}