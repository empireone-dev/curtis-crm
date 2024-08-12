export async function transfer_direct_email_service(data){
    const res = await axios.put('/api/transfer_direct_email',data)
    return res.data
}

export async function get_direct_email_by_id_service(data){
    const res = await axios.get('/api/direct_email/'+window.location.pathname.split('/')[3])
    return res.data
}