export async function store_decision_making_repair_service(data){
    const res = await axios.post('/api/repair',data)
    return res.data
}


export async function update_repair_service(data){
    const res = await axios.put('/api/repair/'+data.id,data)
    return res.data
}

export async function unrepair_service(id,newData){
    const res = await axios.put('/api/unrepair/'+id,newData)
    return res.data
}