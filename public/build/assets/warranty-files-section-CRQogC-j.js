import{j as e}from"./store-BXo7euj4.js";import i from"./customer-tickets-bill-of-sale-section-CxeQyZN6.js";import m from"./customer-tickets-front-of-the-unit-section-CtYVS5o5.js";import a from"./customer-tickets-rear-of-the-unit-section-BKgMykCF.js";import c from"./customer-tickets-readable-serial-section-CJVAVGZT.js";import d from"./customer-tickets-defect-issue-section-C2glAbsE.js";import n from"./customer-tickets-clear-model-SDAMJWvq.js";import p from"./customer-tickets-parts-model-CLsuouCF.js";import u from"./customer-tickets-receipt-model-DgY-Yjzh.js";import f from"./customer-tickets-serial-model-Db9zMMJy.js";import{u as s}from"./app-BpMEcm2d.js";import"./customer-tickets-thunk-DSm430fD.js";import"./tickets-service-CHzrJKbj.js";import"./files-service-BLHE0uTb.js";import"./loading-BUP2XOJo.js";import"./image-view-D9UkKKQS.js";import"./TrashIcon-CtSFvUQV.js";import"./transition-C3w4TtCb.js";import"./dialog-C164kx8C.js";function W(){const{ticket:t}=s(o=>o.tickets),{filesData:r}=s(o=>o.customer_tickets);function l(){return t.call_type=="CF-Warranty Claim"&&r.bill_of_sale&&r.front_of_the_unit&&r.rear_of_the_unit&&r.readable_serial_section&&r.defect_issue?!0:!!(t.call_type=="Parts"&&r.clear_model&&r.parts_model&&r.receipt_model&&r.serial_model)}return e.jsxs(e.Fragment,{children:[l()?e.jsxs("div",{className:"text-green-600 text-2xl font-black border border-green-600 p-2 px-5",children:["Information Completed"," "]}):e.jsx("div",{className:"text-red-600 text-2xl font-black border border-red-600 p-2  px-5",children:"Incomplete Information"}),t!=null&&t.call_type&&(t==null?void 0:t.call_type)=="CF-Warranty Claim"?e.jsxs(e.Fragment,{children:[e.jsx(i,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(m,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(a,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(c,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(d,{})]}):e.jsxs(e.Fragment,{children:[e.jsx(f,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(u,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(p,{}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(n,{})]})]})}export{W as default};