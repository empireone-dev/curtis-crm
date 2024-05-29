export async function get_products_service() {
    const gid = "1880039227";
    const res = await axios.get("/api/google-sheets/" + gid);
    return res.data;
}

export async function get_specific_item_service(ticket) {
    const gid = "1880039227";
    const res = await axios.post("/api/get_specific_item/" + gid, {
        item_number: ticket.item_number,
    });
    
    return {
        brand: res.data[0],
        item_number: res.data[1],
        unit: res.data[2],
        class: res.data[3],
        cost_of_unit: ticket.country == 'CA' ? res.data[4] : res.data[5],
        length: res.data[6],
        width: res.data[7],
        height: res.data[8],
        cube_weight: res.data[10],
    };
}

export async function get_asc_service() {
    const gid = "725303120";
    const res = await axios.get("/api/google-sheets/" + gid);
    return res.data;
}

export async function get_retailers() {
    const gid = "0";
    const res = await axios.get("/api/google-sheets/" + gid);
    return res.data.map((res, i) => res.map(result => result)[0]).filter(item => item !== '');
}
