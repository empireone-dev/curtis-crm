async function a(s){return(await axios.post("/api/internals",s)).data}async function e(s){return(await axios.get("/api/internals/"+s)).data}export{e as g,a as s};
