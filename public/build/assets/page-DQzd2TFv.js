import{r as n,j as r}from"./store-BXo7euj4.js";import{h as u}from"./moment-Cl4UOzQZ.js";import{u as w,a as j}from"./app-BpMEcm2d.js";import v from"./agent-handled-cases-list-section-BPH8BJM4.js";import{A as f}from"./agent-layout-CM02dMWq.js";import{c as k}from"./tickets-service-CHzrJKbj.js";import{s as y}from"./customer-tickets-slice-xe3uojHi.js";import{S as b}from"./skeleton-KBP6lSev.js";import M from"./agent-handled-cases-pagination-section-7Bg9w73B.js";import{C}from"./Collapse-vNkSfev0.js";import{T as l}from"./index-2aJpijH7.js";import"./user-service-CEygx2uf.js";import"./search-ticket-section-CsQ3sX-D.js";import"./modal-IBUH2Dcv.js";import"./transition-C3w4TtCb.js";import"./dialog-C164kx8C.js";import"./Cog8ToothIcon-DNETfF--.js";import"./layout-sidebar-list-component-BIV227SI.js";import"./HomeIcon-D7haBwSV.js";import"./TicketIcon-CS9uAkM7.js";import"./InboxArrowDownIcon-DtHCxvsS.js";import"./InboxStackIcon-C8haFKBf.js";import"./EnvelopeIcon-x8BnTm6B.js";import"./Pagination-DwCeSBtM.js";import"./compact-item-BbbJV0B9.js";import"./index-CuRMztqp.js";import"./reactNode-b0nyTUWG.js";import"./collapse-C1MjllT7.js";import"./index-4aqyckC3.js";function er({auth:d}){const{tickets:c}=w(e=>e.customer_tickets),s=d.user,h=j(),[m,x]=n.useState(!0),p=window.location.pathname.split("/")[2];return n.useEffect(()=>{async function e(o){const t=await k(window.location.search,p,s.id);h(y(t)),x(!1)}e()},[]),r.jsx(f,{account:s,children:r.jsxs("div",{className:"p-3 flex gap-5 flex-col justify-between w-full h-full",children:[m?r.jsx("div",{children:r.jsx(b,{})}):r.jsxs("div",{children:[r.jsxs("div",{class:"flex items-center my-3",children:[r.jsx("div",{class:"flex items-center ml-3",children:r.jsx("button",{title:"Reload",class:"text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})})})}),r.jsx("span",{class:"bg-gray-300 h-6 w-[.5px] mx-3"}),r.jsxs("div",{class:"flex items-center space-x-2",children:[r.jsx("button",{title:"Archive",class:"text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"})})}),r.jsx("button",{title:"Mark As Spam",class:"text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),r.jsx("button",{title:"Delete",class:"text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]}),r.jsx("span",{class:"bg-gray-300 h-6 w-[.5px] mx-3"}),r.jsxs("div",{class:"flex items-center space-x-2",children:[r.jsx("button",{title:"Mark As Read",class:"text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"})})}),r.jsx("button",{title:"Mark As Unread",class:"text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})})}),r.jsx("button",{title:"Add Star",class:"text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100",children:r.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:r.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"})})})]})]}),r.jsx("div",{className:"overflow-auto h-full",children:r.jsx(C,{accordion:!0,items:c.map((e,o)=>{var t,a,i;return{key:o,label:r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsx("div",{children:((t=e.emails[0])==null?void 0:t.emails[0].from)??"No Emails"}),r.jsxs("div",{children:[e.ticket.status=="CLOSED"?r.jsx(l,{color:"red",children:e.ticket.status}):r.jsx(l,{color:"green",children:e.ticket.status}),u((a=e.emails[0])==null?void 0:a.emails[0].date).format("LLL")]})]}),children:(i=e.emails[0])==null?void 0:i.emails.map(g=>r.jsx(v,{data:g}))}})})})]}),r.jsx("div",{className:"flex items-center justify-end",children:r.jsx(M,{})})]})})}export{er as default};