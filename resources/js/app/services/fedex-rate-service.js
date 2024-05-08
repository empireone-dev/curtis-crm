
export async function get_fedex_rate_service(data) {
    console.log('datadata',data)
    const res = await axios.post('/api/get_fedex_rate/'+data.id, {
        cubed_weight: data.cube_weight,
        length: data.length,
        width: data.width,
        height: data.height,
    })
    return res.data
}