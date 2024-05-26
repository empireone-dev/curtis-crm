export async function get_tickets_service(search) {
    // const id = search.id == ''?'null':search.id
    // const searchValue = "ticket_id=" + id + "&page=" + search.page+'&tile='+search_tile;
    const res = await axios.get("/api/tickets" + search);
    return res.data.data;
}

export async function get_tickets_by_warehouse_service(country) {
    const res = await axios.post("/api/get_tickets_by_warehouse/" + country);
    return res.data.result;
}

export async function get_tickets_by_asc_service(id, search) {
    const res = await axios.post("/api/get_tickets_by_asc/" + search, {
        id: id,
    });
    return res.data.result;
}

export async function store_tickets_service(data) {
    const res = await axios.post("/api/tickets", data);
    return res.data.result;
}

export async function get_tickets_by_user_id(id, search) {
    const res = await axios.get("/api/tickets/" + id + search);
    return res.data.result;
}

export async function get_tickets_by_email(email) {
    const res = await axios.get("/api/get_tickets_by_email/"+email);
    return res.data.result;
}


export async function update_tickets_by_user_id(data) {
    const res = await axios.put("/api/tickets/" + data.id, data);
    return res.data.result;
}

export async function get_tickets_by_ticket_id(id) {
    const res = await axios.get("/api/get_tickets_by_ticket_id/" + id);
    return res.data.result;
}

export async function update_explanation_service(id, explanation) {
    const res = await axios.put("/api/update_explanation/" + id, {
        explanation: explanation,
    });
    return res.data.result;
}

export async function update_tickets_status_service(id, status, user_id, data,from) {
    alert(from)
    const res = await axios.put("/api/update_tickets_status/" + id, {
        status: status,
        user_id: user_id,
        data,
        from:from
    });
    return res.data.result;
}

export async function close_ticket_service(data, reason, user) {
    const call_type =
        data.call_type == "Parts"
            ? "TICKET PARTS CLOSED"
            : data.call_type == "CF-Warranty Claim"
            ? "TICKET WARRANTY CLOSED"
            : "TICKET TECH CLOSED";

    const res = await axios.put("/api/close_ticket/" + data.id, {
        reason: reason,
        user: user,
        type: call_type,
    });
    return res.data.result;
}
