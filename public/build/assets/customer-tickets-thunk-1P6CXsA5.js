import{a as o,u as r}from"./tickets-service-BEB5ZAFm.js";import{x as n,z as _,A as k}from"./store-CorJ7S5Q.js";import{g as c,u as p}from"./files-service-BVmT_30U.js";function g(t){return async function(e,s){const a=await o(t);e(n.actions.setTickets(a))}}function m(t,e){return async function(s,a){a().app;const i=await p(t),u=await c(e);s(_(i.status)),s(k(u.data))}}function y(t){return async function(e,s){const a=await c(t);return e(n.actions.setTicket(a.ticket)),a.data}}function w(t,e){return async function(s,a){const i=await r(t,e);s(n.actions.setTicket(i))}}export{g as a,m as b,y as g,w as u};