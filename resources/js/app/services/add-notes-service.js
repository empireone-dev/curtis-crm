export async function get_notes_by_id_service(id){
    const res = await axios.get('/api/notes/'+id)
    return res.data
}

export async function add_notes_on_tickets_service(data){
    const res = await axios.post('/api/notes',data)
    return res.data
}
