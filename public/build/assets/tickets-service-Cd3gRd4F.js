import{c as s}from"./store-CoNfLyJe.js";async function u(t,e,a){try{return(await s.get(`/api/cases${t}&cases=${e}&user_id=${a}`)).data.result.data}catch{return[]}}async function _(t){try{return(await s.post("/api/forward_ticket",t)).data}catch{return[]}}async function o(t){try{return(await s.get(`/api/tickets${t}`)).data.data}catch{return[]}}async function p(t){return(await s.post("/api/get_tickets_by_warehouse/"+t)).data.result}async function y(t,e){return(await s.post("/api/get_tickets_by_asc/"+e,{id:t})).data.result}async function d(t){return(await s.post("/api/tickets",t)).data.result}async function k(t,e){return(await s.get("/api/tickets/"+t+e)).data.result}async function l(t){return(await s.get("/api/get_tickets_by_email/"+t)).data.result}async function f(t){return(await s.put("/api/tickets/"+t.id,t)).data.result}async function w(t){return(await s.get("/api/get_tickets_by_ticket_id/"+t)).data.result}async function g(t,e){return(await s.put("/api/update_explanation/"+t,{explanation:e})).data.result}async function b(t,e,a,r,c){return(await s.put("/api/update_tickets_status/"+t,{status:e,user_id:a,data:r,from:c})).data.result}async function v(t,e,a){const r=t.call_type=="Parts"?"TICKET PARTS CLOSED":t.call_type=="CF-Warranty Claim"?"TICKET WARRANTY CLOSED":"TICKET TECH CLOSED";return(await s.put("/api/close_ticket/"+t.id,{reason:e,user:a,type:r})).data.result}export{k as a,f as b,u as c,l as d,v as e,_ as f,w as g,y as h,p as i,o as j,b as k,d as s,g as u};