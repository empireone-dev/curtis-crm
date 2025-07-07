import axios from "axios";

export async function export_process_ticket_service(data) {
    try {
        const res = await axios.post("/api/export_process_ticket", data);
        return res.data;
    } catch (error) {
        return [];
    }
}


export async function accept_acknowledge_service(data) {
    try {
        const res = await axios.post("/api/accept_acknowledge", data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function received_item_service(data) {
    try {
        const res = await axios.post("/api/received_item", data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function escalated_service(data) {
    try {
        const res = await axios.post("/api/escalated",data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function change_isExport_service(data) {
    try {
        const res = await axios.post("/api/change_isExport",data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function change_check_all_service(data) {
    try {
        const res = await axios.post("/api/change_check_all",data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function update_ticket_export_status_service(data,type) {
    try {
        const res = await axios.put("/api/ticket_export_status",{
            data:data,
            type:type
        });
        return res.data;
    } catch (error) {
        return [];
    }
}
export async function get_tickets_warehouse_service(country) {
    try {
        const res = await axios.get("/api/get_tickets_warehouse/"+country);
        return res.data;
    } catch (error) {
        return [];
    }
}
export async function get_email_replies_service() {
    try {
        const res = await axios.get("/api/get_email_replies");
        return res.data;
    } catch (error) {
        return [];
    }
}
export async function get_email_replies_parts() {
    try {
        const res = await axios.get("/api/get_email_replies_parts");
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function get_ticket_by_id_service(id) {
    try {
        const res = await axios.get("/api/get_ticket_by_id/"+id);
        return res.data;
    } catch (error) {
        return [];
    }
}
export async function check_serial_number_service(serial_number) {
    try {
        const res = await axios.get("/api/check_serial_number/"+serial_number);
        return res.data;
    } catch (error) {
        return [];
    }
}
export async function create_ticket_close_service(data) {
    try {
        const res = await axios.post("/api/create_ticket_close",data);
        return res.data;
    } catch (error) {
        return [];
    }
}
export async function move_ticket_assignment_service(data) {
    try {
        const res = await axios.post("/api/move_ticket_assignment",data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function resend_email_templete_service(data) {
    try {
        const res = await axios.post("/api/resend_email_templete",data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function create_verify_tickets_service(data) {
    try {
        const res = await axios.post("/api/create_verify_tickets", {
            search:data
        });
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function verify_tickets_service(data) {
    try {
        const res = await axios.post(`/api/verify_tickets${data}`,{
            searchData:data
        });
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function export_ticket_files(data) {
    try {
        const res = await axios.get(`/api/export_ticket_files${data}`);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function transfer_ticket_cases_service(data) {
    try {
        const res = await axios.put("/api/transfer_ticket_cases", data);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function cases_service(page,cases,user_id) {
    try {
        const res = await axios.get(`/api/cases${page}&cases=${cases}&user_id=${user_id}`);
        console.log('resres',res)
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function direct_emails_service(user_id,search) {
    // save_direct_emails
    // direct_emails
    try {
        const res = await axios.get(`/api/direct_emails${search}&user_id=${user_id}`);
        return res.data;
    } catch (error) {
        return [];
    }
}

export async function forward_ticket_service(data) {
    try {
        const res = await axios.post("/api/forward_ticket", data);
        return res.data;
    } catch (error) {
        return [];
    }
}
export async function search_tickets_service(data) {
    try {
        const res = await axios.post("/api/search_tickets", data);
        return res.data.data;
    } catch (error) {
        return [];
    }
}

export async function search_lookup_tickets_service(data) {
    try {
        const res = await axios.post("/api/search_lookup_tickets", data);
        return res.data.result;
    } catch (error) {
        return [];
    }
}

export async function get_tickets_service(search) {
    try {
        const res = await axios.get("/api/tickets" + `${search}`);
        return res.data.data;
    } catch (error) {
        return [];
    }
}

export async function get_tickets_by_warehouse_service(country) {
    const res = await axios.post("/api/get_tickets_by_warehouse/" + country+window.location.search);
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
    return res.data;
}

export async function get_tickets_by_user_id(id, search) {
    const res = await axios.get("/api/tickets/" + id + search);
    return res.data.result;
}

export async function get_tickets_by_email(email) {
    const res = await axios.get("/api/get_tickets_by_email/" + email);
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

export async function get_tickets_by_ticket_details_id(id) {
    const res = await axios.get("/api/get_tickets_by_ticket_details_id/" + id);
    return res.data.result;
}


export async function update_explanation_service(id, explanation) {
    const res = await axios.put("/api/update_explanation/" + id, {
        explanation: explanation,
    });
    return res.data.result;
}

export async function update_tickets_status_service(
    id,
    status,
    user_id,
    data,
    from
) {
    const res = await axios.put("/api/update_tickets_status/" + id, {
        status: status,
        user_id: user_id,
        data,
        from: from,
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
