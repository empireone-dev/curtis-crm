import axios from "axios";

export async function get_common_issues_service(){
    const res = await axios.get('/api/common_issues')
    return res.data
}

export async function store_common_issues_service(data){
    const res = await axios.post('/api/common_issues',data)
    return res.data
}

export async function delete_common_issues_service(id){
    const res = await axios.delete('/api/common_issues/'+id)
    return res.data
}