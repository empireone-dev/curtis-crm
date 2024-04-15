export async function store_decision_making_repair_service(data){
    const res = await axios.post('/api/repair',data)
    return res.data
}