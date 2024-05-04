import axios from "axios";

export async function administrator_dashboard_service() {
    try {
        const res = await axios.get("/api/administrator_dashboard");
        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}
