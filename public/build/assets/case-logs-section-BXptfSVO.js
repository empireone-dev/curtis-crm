import{j as s}from"./store-CorJ7S5Q.js";import{h as a}from"./moment-Cl4UOzQZ.js";import{u as t}from"./app-BnP4xpFn.js";function n(){const{cases_logs:r}=t(e=>e.users);return s.jsxs("div",{children:[s.jsx("div",{class:"text-gray-600 mb-2",children:s.jsx("p",{class:"font-medium text-lg",children:"Case Logs"})}),r.map((e,o)=>s.jsxs("div",{className:"my-3",children:[s.jsx("p",{children:e.user.name}),s.jsxs("p",{children:["Logged the case as ",e.case_status,s.jsx("br",{}),"On ",a(e.created_at).format("LLL")]}),s.jsxs("p",{children:["Remarks: ",e.remarks]})]}))]})}export{n as default};