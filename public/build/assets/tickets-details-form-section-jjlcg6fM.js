import{q as m,r as a,j as r,s as l}from"./store-CoNfLyJe.js";import c from"./customer-tickets-bill-of-sale-section-Cw2lCdXf.js";import p from"./customer-tickets-front-of-the-unit-section-CeDxpxO2.js";import u from"./customer-tickets-rear-of-the-unit-section-DDXKu9lJ.js";import d from"./customer-tickets-readable-serial-section-DpeXpCxZ.js";import f from"./customer-tickets-defect-issue-section-C52w4oTc.js";import n from"./customer-tickets-update-explanation-SVOK6g-j.js";import{g as x}from"./customer-tickets-thunk-D3bWR90y.js";import{a as b}from"./customer-tickets-slice-DBY4TkoS.js";import{a as j,u as h}from"./app-BYzZG7a0.js";import C from"./customer-tickets-clear-model-CkCLEVzW.js";import T from"./customer-tickets-parts-model-82Jai02V.js";import y from"./customer-tickets-receipt-model-BqXRE_rV.js";import k from"./customer-tickets-serial-model-DKmWSJAA.js";import"./loading-DPiaRgIn.js";import"./image-view-DSp8GXlU.js";import"./TrashIcon-BRxoT1Pv.js";import"./transition-Bp5yISxV.js";import"./dialog-u6KUC5_a.js";import"./tickets-service-Cd3gRd4F.js";import"./files-service-CIO3M2GX.js";import"./textarea-D61XZyhv.js";function J(){const{url:t}=m(),i=j(),{ticket:e}=h(o=>o.customer_tickets);return a.useEffect(()=>{(async()=>{try{const s=await l.dispatch(x(t.split("/")[3]));console.log("res",s),i(b(s))}catch(s){console.error("Error fetching data:",s)}})()},[t]),r.jsxs(r.Fragment,{children:[r.jsx(n,{}),e!=null&&e.call_type&&(e==null?void 0:e.call_type)=="CF-Warranty Claim"?r.jsxs(r.Fragment,{children:[r.jsx(c,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(p,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(u,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(d,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(f,{})]}):r.jsxs(r.Fragment,{children:[r.jsx(C,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(T,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(y,{}),r.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),r.jsx(k,{})]})]})}export{J as default};