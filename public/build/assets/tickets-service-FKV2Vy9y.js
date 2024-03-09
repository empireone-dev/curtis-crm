async function i(t){const s=t??"";return(await axios.get("/api/tickets?ticket_id="+s)).data.result}async function a(t){return(await axios.post("/api/tickets",t)).data.result}export{i as g,a as s};
