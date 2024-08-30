export async function get_cities_service(data){
  const res = await axios.post('/api/get_cities',data)
  return res.data
}
