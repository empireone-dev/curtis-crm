export async function transfer_direct_email_service(data){
    const res = await axios.put('/api/transfer_direct_email',data)
    return res.data
}