export async function get_activities_by_id_service($id){
    const res = await axios.get('/api/activities/'+$id)
    return res.data
}


export async function export_by_the_warehouse_service($id){
    const res = await axios.get('/api/export_by_the_warehouse/')
    return res.data
}
