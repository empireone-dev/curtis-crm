export async function get_tickets_service(search) {
    const id = search.id == ''?'null':search.id
    const searchValue = "ticket_id=" + id + "&page=" + search.page;
    const res = await axios.get("/api/tickets?" + searchValue);
    console.log('resss',res.data)
    return res.data;
}

export async function store_tickets_service(data) {
    const res = await axios.post("/api/tickets", data);
    return res.data.result;
}
