import{r as a,j as e,s as n,y as u}from"./store-BXo7euj4.js";import{L as c}from"./loading-BUP2XOJo.js";import{u as d}from"./app-BpMEcm2d.js";import{u as m}from"./tickets-thunk-CxLDNDiY.js";import{r as l}from"./routing-BzgBYGmF.js";import"./tickets-service-CHzrJKbj.js";import"./internals-service-B9kSbxh_.js";function E(){const{ticket:t}=d(o=>o.tickets),[r,s]=a.useState(!1);async function i(){confirm("Are you sure you want to receive the item?")&&(s(!0),await n.dispatch(m(t.id,t.decision_status,null,"warehouse")),s(!1),u.visit(l(t.decision_status.toLowerCase())))}return e.jsxs(e.Fragment,{children:[t.status=="CLOSED"&&e.jsx("div",{className:"rounded-md flex items-center cursor-pointer  text-sm justify-center p-3 bg-red-500 hover:bg-red-600 text-white w-52",children:"CLOSED"}),t.status!="CLOSED"&&e.jsx("div",{onClick:i,className:"rounded-md cursor-pointer flex items-center text-sm justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white w-52",children:r?e.jsx("div",{className:"py-1",children:e.jsx(c,{})}):"RECEIVED ITEM "})]})}export{E as default};