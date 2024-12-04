export async function create_customer_details_logs_service(data){
    const res = await axios.post('/api/customer_details_logs',data)
    return res.data
}

// export async function get_customer_details_logs_by_id(id){
//     const res = await axios.get('/api/customer_details_logs/'+id)
//     return res.data
// }