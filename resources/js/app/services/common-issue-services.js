import axios from "axios";

export async function get_common_issues_service(){
    const res = await axios.get('/api/common_issues')
    return res.data
}

export async function store_common_issues_service(data){
    const res = await axios.post('/api/common_issues',data)
    return res.data
}