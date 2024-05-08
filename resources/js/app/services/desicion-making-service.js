export async function store_decision_making_service(data){
    const res = await axios.post('/api/decision_making',data)
    return res.data
}


export async function get_decision_making_by_ticket_id(ticket_id){
    const res = await axios.get('/api/decision_making/'+ticket_id)
    return res.data
}
