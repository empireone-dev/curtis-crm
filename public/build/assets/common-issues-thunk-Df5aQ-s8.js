import{e,l as n}from"./app-Cmn4k4Ck.js";async function o(){return(await e.get("/api/common_issues")).data}function c(){return async function(s,a){const t=(await o()).data;s(n(t))}}export{c as g};
