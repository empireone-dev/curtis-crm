import axios from "axios";

export async function get_email_template_service(){
    const res = await axios.get('/api/email_template')
    return res.data.data
}

export async function store_email_template_service(data){
    const res = await axios.post('/api/email_template',data)
    return res.data.data
}