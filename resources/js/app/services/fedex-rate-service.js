
export async function get_fedex_rate_service(data) {
    const res = await axios.post('/api/get_fedex_rate/'+data.id, {
        cubed_weight: data.product.cubed_weight,
        length: data.product.length,
        width: data.product.width,
        height: data.product.height,
    })
    return res.data
}