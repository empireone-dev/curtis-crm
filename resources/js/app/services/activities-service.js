export async function get_activities_by_id_service($id){
    const res = await axios.get('/api/activities/'+$id)
    return res.data
}
