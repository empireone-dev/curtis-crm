
export async function address_lookup_service(data){
  const res = await axios.post('/api/address_lookup',data)
  return res.data
}