import{u as r}from"./tickets-service-DImta3VT.js";import{c as l,v as _}from"./page-Z5sU5TGy.js";import{g as n,u as d,d as k}from"./files-service-BLYI3cd6.js";const c=l({name:"customer_tickets",initialState:{tickets:[],ticket:{},filesData:[]},reducers:{setTickets:(t,e)=>{t.tickets=e.payload},setFilesData:(t,e)=>{t.filesData=e.payload},setTicket:(t,e)=>{t.ticket=e.payload}}}),{setTickets:T,setFilesData:o,setTicket:g}=c.actions;c.reducer;function y(t,e){return async function(a,s){s().app;const i=await d(t),u=await n(e);a(_(i.status)),a(o(u.data))}}function w(t){return async function(e,a){const s=await n(t);return e(c.actions.setTicket(s.ticket)),s.data}}function S(t,e){return async function(a,s){await k(t);const i=await n(e);return a(o(i.data)),i.data}}function v(t,e){return async function(a,s){const i=await r(t,e);a(c.actions.setTicket(i))}}export{v as a,o as b,S as d,w as g,g as s,y as u};