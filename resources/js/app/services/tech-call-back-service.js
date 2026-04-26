

export async function store_tech_call_back_service(data){
    const res = await axios.post('/api/tech_call_back',data)
    return res.data
}