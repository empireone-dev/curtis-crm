import{r as n,j as t,I as x}from"./page-Z5sU5TGy.js";import{I as l}from"./input-CKkPdiX2.js";import{s as h}from"./user-service-Dh1_6pDc.js";import{a as f}from"./app-CeqRoyVK.js";import{B as y}from"./button-VQteEg-J.js";import{M as b}from"./index-CH7yCGVI.js";import{S as g}from"./index-DZT2S-jU.js";import"./index-DsXjZlsd.js";import"./asyncToGenerator-Dxg2zNf3.js";import"./compact-item-prQ5Ac-Z.js";import"./render-Bj0oqLYr.js";import"./InfoCircleFilled-DGQscbuG.js";import"./pickAttrs-9xnQBPTy.js";import"./useZIndex-Cr-LDk-O.js";import"./motion-DJ7hMwu8.js";import"./index-Cbopodmy.js";import"./index-B7auudRP.js";import"./KeyCode-DNlgD2sM.js";import"./fade-DXutflUK.js";import"./zoom-CBrDpYEv.js";import"./ContextIsolator-BsbQBvzR.js";import"./useClosable-2nU_GjiT.js";import"./useLocale-CNGO87Tw.js";import"./Overflow-DpaGQAL3.js";import"./useIcons-B9mXJjaS.js";function J(){const[m,o]=n.useState(!1),[e,s]=n.useState({}),p=f(),u=()=>{o(!0)};console.log("result",e);async function c(r){const a=await h(e);a.status=="exist"?alert("Email is already exist!"):(p(x(a.status)),s({}),o(!1))}const d=()=>{o(!1)};function i(r,a){(r||r=="")&&a&&s({...e,[a]:r})}return t.jsxs("div",{children:[t.jsx(y,{type:"primary",onClick:u,children:"Create Account"}),t.jsx(b,{okText:"Submit",title:"Account Information",open:m,onOk:c,onCancel:d,children:t.jsxs("div",{className:"py-3 flex flex-col gap-4",children:[t.jsx(g,{className:"border border-gray-500 rounded-md-",size:"large",placeholder:"Select Position",optionFilterProp:"label",onChange:r=>s({...e,agent_type:r}),options:[{value:null,label:"Admin"},{value:"CSR",label:"CSR"},{value:"Warranty",label:"Warranty Claim"},{value:"Tech",label:"Tech Support"},{value:"Parts",label:"Parts"}]}),t.jsx(l,{onChange:i,name:"emp_id",required:!0,value:e==null?void 0:e.emp_id,label:"Employee ID",type:"text",errorMessage:"Employee ID is required"}),t.jsx(l,{onChange:i,name:"email",required:!0,value:e==null?void 0:e.email,label:"Email",type:"email",errorMessage:"Email is required"}),t.jsx(l,{onChange:i,name:"name",required:!0,value:e==null?void 0:e.name,label:"Fullname",type:"text",errorMessage:"Fullname is required"})]})})]})}export{J as default};