import axios from "axios";

export async function upload_picture_videos(data){
    const res = await axios.post('/api/files',data)
    return res.data
}