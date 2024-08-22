export async function product_registration_service(data){
  const res = await axios.post('/api/product_registration',data)
  return res.data
}