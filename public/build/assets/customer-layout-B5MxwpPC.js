import{j as e,a,r as i,x as c}from"./page-Z5sU5TGy.js";import{F as u,L as d}from"./layout-sidebar-list-component-8s_JXL32.js";import{F as x}from"./TicketIcon-CdmQLvMJ.js";import{a as h,u as f}from"./app-BdYAYxY0.js";import{b as m}from"./user-service-Dh1_6pDc.js";function b(){return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-col flex-shrink-0 h-full px-2 py-4 border-r  bg-slate-200",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("a",{href:"#",className:"inline-block text-xl font-bold tracking-wider text-blue-700 uppercase ",children:"CRM"})}),e.jsxs("div",{className:"flex flex-col items-center justify-center flex-1 space-y-4",children:[e.jsxs("button",{className:"p-2 text-blue-400 transition-colors duration-200 rounded-full bg-blue-50 hover:text-blue-600 hover:bg-blue-100  focus:outline-none focus:bg-blue-100  focus:ring-blue-800",children:[e.jsx("span",{className:"sr-only",children:"Open Notification panel"}),e.jsx("svg",{className:"w-7 h-7",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"})})]}),e.jsxs("button",{className:"p-2 text-blue-400 transition-colors duration-200 rounded-full bg-blue-50 hover:text-blue-600 hover:bg-blue-100  focus:outline-none focus:bg-blue-100  focus:ring-blue-800",children:[e.jsx("span",{className:"sr-only",children:"Open search panel"}),e.jsx("svg",{className:"w-7 h-7",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]}),e.jsxs("button",{className:"p-2 text-blue-400 transition-colors duration-200 rounded-full bg-blue-50 hover:text-blue-600 hover:bg-blue-100  focus:outline-none focus:bg-blue-100  focus:ring-blue-800",children:[e.jsx("span",{className:"sr-only",children:"Open settings panel"}),e.jsxs("svg",{className:"w-7 h-7",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})]})]})]}),e.jsx("div",{className:"relative flex items-center justify-center flex-shrink-0",children:e.jsx("div",{className:"","x-data":"{ open: false }",children:e.jsxs(a,{method:"post",as:"button",href:route("logout"),className:"block transition-opacity duration-200 rounded-full text-blue-500 hover:text-white",children:[e.jsx("span",{className:"sr-only",children:"User menu"}),e.jsx(u,{className:"h-6"})]})})})]})})}function p({account:s}){return e.jsx(e.Fragment,{children:e.jsx("div",{className:"h-screen flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800",children:e.jsxs("div",{className:"flex flex-col left-0 w-64 bg-white h-screen border-r",children:[e.jsx("div",{className:"flex bg-blue-600 text-white items-center justify-center h-14 border-b",children:e.jsxs("div",{children:["Hi! ",s.name]})}),e.jsx("div",{className:"overflow-y-auto overflow-x-hidden flex-grow",children:e.jsx("ul",{className:"flex flex-col py-4 space-y-1",children:e.jsx(d,{account:s,name:"Tickets",icon:e.jsx(x,{className:"h-6"}),href:"tickets"})})})]})})})}function k({children:s,account:l}){const n=h(),{user:t}=f(r=>r.app);return i.useEffect(()=>{async function r(){const o=await m();n(c(o))}t.id||r()},[t]),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("div",{className:"flex-none",children:e.jsxs("div",{className:"flex sticky top-0 ",children:[e.jsx(b,{}),e.jsx(p,{account:l})]})}),e.jsx("div",{className:"flex-1",children:s})]})}export{k as C};