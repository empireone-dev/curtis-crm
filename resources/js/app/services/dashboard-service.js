import axios from "axios";

export async function administrator_dashboard_service() {
    try {
        const res = await axios.get("/api/administrator_dashboard");
        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}


export async function customer_dashboard_service(userid) {
    try {
        const res = await axios.get(`/api/customer_dashboard/${userid}`);
        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}


export async function warehouse_dashboard_service(userid) {
    try {
        const res = await axios.get(`/api/warehouse_dashboard/${userid}`);
        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}


export async function asc_dashboard_service(userid) {
    try {
        const res = await axios.get(`/api/asc_dashboard/${userid}`);
        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}

export async function agent_dashboard_service(userid) {
    try {
        const res = await axios.get(`/api/agent_dashboard/${userid}`);
        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}

