import{r as a,j as s}from"./page-Z5sU5TGy.js";import{F as c,w as n}from"./dashboard-service-BJNMqopa.js";import d from"./warehouse-card-component-BeQdQtTR.js";function p({account:e}){const[t,r]=a.useState([]);return a.useEffect(()=>{async function o(m){const i=await n(e.country);r(i)}o()},[]),s.jsx("div",{className:"mt-12 mr-3",children:s.jsx("div",{className:"mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3",children:s.jsx(d,{title:"Assigned Ticket",link:"",count:t.assigned??0,icon:s.jsx(c,{className:"h-10 text-white"})})})})}export{p as default};