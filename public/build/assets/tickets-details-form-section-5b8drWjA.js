import{q as f,r as l,j as e,s as x,x as b,y as h}from"./page-B_FNLrKI.js";import _ from"./customer-tickets-bill-of-sale-section-z185_fqV.js";import j from"./customer-tickets-front-of-the-unit-section-CtivCHwK.js";import y from"./customer-tickets-rear-of-the-unit-section-_amuTFYC.js";import C from"./customer-tickets-readable-serial-section-BXQMDPAS.js";import k from"./customer-tickets-defect-issue-section-DttYv0Fu.js";import T from"./customer-tickets-update-explanation-CAjC663O.js";import{g}from"./customer-tickets-thunk-DP2QeN5P.js";import{a as w,u as S}from"./app-CcF4oVWF.js";import N from"./customer-tickets-clear-model-CKutA_CM.js";import v from"./customer-tickets-parts-model-BwwnwLQF.js";import D from"./customer-tickets-receipt-model-DxHKBYfB.js";import F from"./customer-tickets-serial-model-3dSLzwjq.js";import{a as E}from"./files-service-ChtK06SL.js";import{B as I}from"./button-CDM6RDM6.js";import"./details-contents-file-components-file-CPKjR2r-.js";import"./index-BoLLTdP4.js";import"./asyncToGenerator-DYUyOi83.js";import"./index-DabsQ7f6.js";import"./pickAttrs-Dct9vqKx.js";import"./index-BEUi5bVi.js";import"./compact-item-CFEgdXJP.js";import"./index-DCufCK--.js";import"./useZIndex-DEasTsYa.js";import"./motion-DJ7hMwu8.js";import"./roundedArrow-DPzGQt_q.js";import"./zoom-DaP9kBAw.js";import"./fade-BgjB0psG.js";import"./useForceUpdate-CiKgljI7.js";import"./DeleteOutlined-D8YKy--Z.js";import"./EyeOutlined-BECE-CZ9.js";import"./CheckCircleFilled-B1vPqam2.js";import"./useLocale-CdzdcKtH.js";import"./addEventListener-D2TAo-bn.js";import"./index-CGX2b0Vx.js";import"./KeyCode-DNlgD2sM.js";import"./RightOutlined-CFCzjVj5.js";import"./textarea-BoTXCq_q.js";import"./tickets-service-BgYWgIIT.js";import"./render-DFTnvfjc.js";function je(){const{url:m}=f(),c=w(),[t,n]=l.useState(!0),{ticket:r,filesData:o}=S(a=>a.customer_tickets),[p,s]=l.useState(!0);l.useEffect(()=>{(async()=>{try{const i=await x.dispatch(g(m.split("/")[3]));c(b(i)),s(!1)}catch(i){console.error("Error fetching data:",i),s(!1)}})()},[m]);function d(){return r.isUploading=="true"||r.call_type=="CF-Warranty Claim"&&o.bill_of_sale&&o.front_of_the_unit&&o.rear_of_the_unit&&o.readable_serial_section&&o.defect_issue?!0:!!(r.call_type=="Parts"&&o.clear_model&&o.parts_model&&o.receipt_model&&o.serial_model)}async function u(a){s(!0);try{await E({ticket_id:r.id}),h.visit(window.location.pathname),s(!1)}catch{s(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>n(!t),className:"p-3 bg-orange-500 hover:bg-orange-600 text-white my-3 font-black rounded-md",children:"TRANSLATE"}),e.jsx(T,{isTranslate:t}),d()?e.jsxs("div",{className:"text-green-600 text-2xl font-black border border-green-600 p-2 px-5",children:["Information Completed"," "]}):e.jsx("div",{className:"text-red-600 text-2xl font-black border border-red-600 p-2  px-5",children:"Incomplete Information"}),!p&&(r!=null&&r.call_type)&&(r==null?void 0:r.call_type)=="CF-Warranty Claim"?e.jsxs(e.Fragment,{children:[e.jsx(_,{isTranslate:t}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(j,{isTranslate:t}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(y,{isTranslate:t}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(C,{isTranslate:t}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(k,{isTranslate:t})]}):e.jsxs(e.Fragment,{children:[e.jsx(N,{isTranslate:t}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(v,{isTranslate:t}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(D,{isTranslate:t}),e.jsx("div",{className:"h-px my-8 border border-blue-500 w-full"}),e.jsx(F,{isTranslate:t})]}),e.jsx(I,{onClick:()=>u(),type:"primary",size:"large",className:"my-10 w-full",children:"UPLOAD"})]})}export{je as default};