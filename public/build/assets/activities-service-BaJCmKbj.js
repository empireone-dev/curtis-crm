async function a(e){return(await axios.get("/api/activities/"+e)).data}async function i(e){return(await axios.get("/api/export_by_the_warehouse/")).data}export{i as e,a as g};
