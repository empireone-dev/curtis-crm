import axios from "axios";

export async function upload_picture_videos(data){
    const res = await axios.post('/api/files',data)
    return res.data
}

export async function get_upload_picture_videos(ticket_id){
    const res = await axios.get('/api/files/'+ticket_id)
    return res.data
}

export async function delete_upload_picture_videos(id,ticket_id){
   await axios.delete('/api/files/'+id)
   const res =await get_upload_picture_videos(ticket_id)
    return res.data
}