import axios from "axios"

export async function manual_send_lacking_information_service(data){
    const res = await axios.post('/api/manual_send_lacking_information',data)
    return res.data
}