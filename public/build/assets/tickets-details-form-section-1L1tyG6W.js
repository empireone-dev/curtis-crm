import{q as m,r as c,j as e,s as n,z as d}from"./store-0Qzhg5Cj.js";import p from"./customer-tickets-bill-of-sale-section-BSJrMMpA.js";import f from"./customer-tickets-front-of-the-unit-section-B437bfhy.js";import u from"./customer-tickets-rear-of-the-unit-section-COMMueRm.js";import x from"./customer-tickets-readable-serial-section-DXZbWfhW.js";import b from"./customer-tickets-defect-issue-section-Du8FsvoK.js";import _ from"./customer-tickets-update-explanation-D026n6Gu.js";import{g as h}from"./customer-tickets-thunk-DmFSZWaG.js";import{a as j,u as C}from"./app-9iRmoX6o.js";import y from"./customer-tickets-clear-model-XKlv43fA.js";import k from"./customer-tickets-parts-model-BpOdFfWG.js";import T from"./customer-tickets-receipt-model-DJVLTBK_.js";import S from"./customer-tickets-serial-model-DiVryvpX.js";import"./loading-9B-ceNpQ.js";import"./image-view-PuZCJJqT.js";import"./TrashIcon-BYRyR17s.js";import"./transition-BQz_x7pe.js";import"./dialog-B3BbVgJi.js";import"./textarea-B1AQylMR.js";import"./tickets-service-D5k9ViTr.js";import"./files-service-EugUQ0yZ.js";function K(){const{url:s}=m(),i=j(),{ticket:t,filesData:r}=C(l=>l.customer_tickets);c.useEffect(()=>{(async()=>{try{const o=await n.dispatch(h(s.split("/")[3]));console.log("res",o),i(d(o))}catch(o){console.error("Error fetching data:",o)}})()},[s]);function a(){return t.call_type=="CF-Warranty Claim"&&r.bill_of_sale&&r.front_of_the_unit&&r.rear_of_the_unit&&r.readable_serial_section&&r.defect_issue?!0:!!(t.call_type=="Parts"&&r.clear_model&&r.parts_model&&r.receipt_model&&r.serial_model)}return e.jsxs(e.Fragment,{children:[e.jsx(_,{}),a()?e.jsxs("div",{className:"text-green-600 text-2xl font-black border border-green-600 p-2 px-5",children:["Information Completed"," "]}):e.jsx("div",{className:"text-red-600 text-2xl font-black border border-red-600 p-2  px-5",children:"Incomplete Information"}),t!=null&&t.call_type&&(t==null?void 0:t.call_type)=="CF-Warranty Claim"?e.jsxs(e.Fragment,{children:[e.jsx(p,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(f,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(u,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(x,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(b,{})]}):e.jsxs(e.Fragment,{children:[e.jsx(y,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(k,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(T,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(S,{})]})]})}export{K as default};