export async function store_repair_information_service(data){
    const res = await axios.post('/api/repair_information',data)
    return res.data
}

