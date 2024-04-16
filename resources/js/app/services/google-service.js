export async function store_internals_service(data){
    const res = await axios.post('/api/internals',data)
    return res.data
}