import{q as m,r as a,j as r,s as l}from"./store-0Qzhg5Cj.js";import c from"./customer-tickets-bill-of-sale-section-DZB0CsqU.js";import p from"./customer-tickets-front-of-the-unit-section-49XUB1Mc.js";import u from"./customer-tickets-rear-of-the-unit-section-DOB8bhyZ.js";import d from"./customer-tickets-readable-serial-section-CULYwkB3.js";import f from"./customer-tickets-defect-issue-section-B0lkHBVf.js";import n from"./customer-tickets-update-explanation-7VQf8nT0.js";import{g as x}from"./customer-tickets-thunk-Dgfcm-DV.js";import{a as b}from"./customer-tickets-slice-DFQabp5e.js";import{a as j,u as h}from"./app-D3sSVce1.js";import C from"./customer-tickets-clear-model-Dx12rkdN.js";import T from"./customer-tickets-parts-model-BMBe82xD.js";import y from"./customer-tickets-receipt-model-CM4aBiR8.js";import k from"./customer-tickets-serial-model-Ddqh84M7.js";import"./loading-9B-ceNpQ.js";import"./image-view-CIJzTBD3.js";import"./TrashIcon-BYRyR17s.js";import"./transition-BQz_x7pe.js";import"./dialog-B3BbVgJi.js";import"./tickets-service-D5k9ViTr.js";import"./files-service-EugUQ0yZ.js";import"./textarea-B1AQylMR.js";function J(){const{url:t}=m(),i=j(),{ticket:e}=h(o=>o.customer_tickets);return a.useEffect(()=>{(async()=>{try{const s=await l.dispatch(x(t.split("/")[3]));console.log("res",s),i(b(s))}catch(s){console.error("Error fetching data:",s)}})()},[t]),r.jsxs(r.Fragment,{children:[r.jsx(n,{}),e!=null&&e.call_type&&(e==null?void 0:e.call_type)=="CF-Warranty Claim"?r.jsxs(r.Fragment,{children:[r.jsx(c,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(p,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(u,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(d,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(f,{})]}):r.jsxs(r.Fragment,{children:[r.jsx(C,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(T,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(y,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(k,{})]})]})}export{J as default};