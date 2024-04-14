async function i(e){return console.log("datadata",e),(await axios.post("/api/get_fedex_rate/"+e.id,{cubed_weight:e.cubed_weight,length:e.length,width:e.width,height:e.height})).data}export{i as g};
