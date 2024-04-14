
export async function get_fedex_rate_service(ticketid) {
    const res = await axios.post('/api/get_fedex_rate/'+ticketid, {
        state: 'canada',
        cubed_weight: 27.910521582733814,
        length: 14.25,
        width: 16.5,
        height: 16.5,
    })
    return res.data
}