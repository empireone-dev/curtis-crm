export async function get_cities_service(){
  const res = await axios.get('/api/get_cities')
  return res.data
}
