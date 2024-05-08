export async function get_tickets_service(search) {
    // const id = search.id == ''?'null':search.id
    // const searchValue = "ticket_id=" + id + "&page=" + search.page+'&tile='+search_tile;
    const res = await axios.get("/api/tickets" + search);
    console.log('resss',res.data)
    return res.data.data;
}




export async function get_tickets_by_warehouse_service(country) {
    const res = await axios.post("/api/get_tickets_by_warehouse/"+country);
    return res.data.result;
}

export async function store_tickets_service(data) {
    const res = await axios.post("/api/tickets", data);
    return res.data.result;
}


export async function get_tickets_by_user_id(id) {
    const res = await axios.get("/api/tickets/"+ id);
    return res.data.result;
}

export async function update_tickets_by_user_id(data) {
    const res = await axios.put("/api/tickets/"+ data.id,data);
    return res.data.result;
}


export async function get_tickets_by_ticket_id(id) {
    const res = await axios.get("/api/get_tickets_by_ticket_id/"+ id);
    return res.data.result;
}


export async function update_explanation_service(id,explanation) {
    const res = await axios.put("/api/update_explanation/"+ id,{
        explanation:explanation
    });
    return res.data.result;
}

export async function update_tickets_status_service(id,status,user_id) {
    const res = await axios.put("/api/update_tickets_status/"+ id,{
        status:status,
        user_id:user_id
    });
    return res.data.result;
}

