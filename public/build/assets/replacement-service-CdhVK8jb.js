async function s(e){return(await axios.post("/api/replacement",e)).data}async function t(e){return(await axios.get(`/api/replacement/${e}`)).data.status}export{t as g,s};
