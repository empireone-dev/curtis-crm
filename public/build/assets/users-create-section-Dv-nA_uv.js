import{r as n,j as t,H as x}from"./page-CweAZ6u7.js";import{I as i}from"./input-BakRJ-kO.js";import{s as h}from"./user-service-B_1tDVeV.js";import{a as f}from"./app-P50TBJSR.js";import{B as y}from"./button-DYj6rlHo.js";import{M as b}from"./index-C2EwxeLx.js";import{S as g}from"./index-BeFCnihn.js";import"./index-Dm0ZtCym.js";import"./asyncToGenerator-K0Ms1va-.js";import"./compact-item-BZnlbaCs.js";import"./index-CU7KDjMM.js";import"./reactNode-BWNDasVd.js";import"./render-BTwwxt8O.js";import"./CheckCircleFilled-DNJ9Iobj.js";import"./useZIndex-BV9FgGjY.js";import"./InfoCircleFilled-CdyBuAS8.js";import"./motion-DJ7hMwu8.js";import"./index-BX6KYbD2.js";import"./index-87OsltG-.js";import"./KeyCode-DNlgD2sM.js";import"./fade-C7TxCI93.js";import"./zoom-Bd5cYgYo.js";import"./useClosable-BXPFjBCD.js";import"./useIcons-CCGPJ2LS.js";function G(){const[m,s]=n.useState(!1),[e,o]=n.useState({}),p=f(),u=()=>{s(!0)};console.log("result",e);async function c(r){const a=await h(e);a.status=="exist"?alert("Email is already exist!"):(p(x(a.status)),o({}),s(!1))}const d=()=>{s(!1)};function l(r,a){(r||r=="")&&a&&o({...e,[a]:r})}return t.jsxs("div",{children:[t.jsx(y,{type:"primary",onClick:u,children:"Create Account"}),t.jsx(b,{okText:"Submit",title:"Account Information",open:m,onOk:c,onCancel:d,children:t.jsxs("div",{className:"py-3 flex flex-col gap-4",children:[t.jsx(g,{className:"border border-gray-500 rounded-md-",size:"large",placeholder:"Select Position",optionFilterProp:"label",onChange:r=>o({...e,agent_type:r}),options:[{value:null,label:"Admin"},{value:"CSR",label:"CSR"},{value:"Warranty",label:"Warranty Claim"},{value:"Tech",label:"Tech Support"},{value:"Parts",label:"Parts"}]}),t.jsx(i,{onChange:l,name:"emp_id",required:!0,value:e==null?void 0:e.emp_id,label:"Employee ID",type:"text",errorMessage:"Employee ID is required"}),t.jsx(i,{onChange:l,name:"email",required:!0,value:e==null?void 0:e.email,label:"Email",type:"email",errorMessage:"Email is required"}),t.jsx(i,{onChange:l,name:"name",required:!0,value:e==null?void 0:e.name,label:"Fullname",type:"text",errorMessage:"Fullname is required"})]})})]})}export{G as default};