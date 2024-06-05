import axios from "axios"

export async function create_caseslog_service(data){
    const res = await axios.post('/api/caseslog',data)
    return res.data
}

export async function get_caseslog_by_ticket_id_service(id){
    const res = await axios.get('/api/caseslog/'+id)
    return res.data
}