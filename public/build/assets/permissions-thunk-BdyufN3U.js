import{c as a,L as n}from"./store-BXo7euj4.js";async function r(){return(await a.get("/api/permissions")).data}async function o(s){return(await a.post("/api/permissions",s)).data}async function c(s){return(await a.delete("/api/permissions/"+s)).data}async function u(s){return(await a.put(`/api/permissions/${s.id}`,s)).data}function m(s){return async function(t,i){const e=await o(s);t(n.actions.setPermissions(e.data)),t(n.actions.setPermissionsForm({}))}}function _(){return async function(s,t){const i=(await r()).data;s(n.actions.setPermissions(i))}}function d(s){return async function(t,i){const e=await c(s);t(n.actions.setPermissions(e.data))}}function f(s){return async function(t,i){const e=await u(s);t(n.actions.setPermissions(e.data))}}export{d,_ as g,m as s,f as u};