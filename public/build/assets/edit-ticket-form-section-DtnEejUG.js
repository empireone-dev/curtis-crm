import{r as i,q as E,s as P,j as s,w as T,p as x,y as D}from"./page-BdFAeS7-.js";import{I as l}from"./input-74t9VD3v.js";import{a as I,u as p}from"./app-DE6fY-jh.js";import{S as n}from"./select-Q3JaeTHu.js";import F from"./tickets-create-search-product-section-C_CAHvGF.js";import{T as H}from"./textarea-CDgwe2ne.js";import{g as L}from"./ticket-form-thunk-DKe0xCCt.js";import{c as v}from"./country-BSDXfwdN.js";import{c as R}from"./call_type-Hx28cB9H.js";import{L as z}from"./loading-DmFaRxux.js";import{g,b as O}from"./tickets-service-CG_MJ_mA.js";import A from"./reason-to-close-CQGuiTcv.js";import{a as J}from"./product-search-CjdPs_Lo.js";import{S as U}from"./skeleton-Bs5rH2aZ.js";import{S as N}from"./index-46AQBzh-.js";import"./index-DuM2TwmN.js";import"./modal-BxzSCEOn.js";import"./transition-Di7Z8CQp.js";import"./dialog-CA6tNbqZ.js";import"./MagnifyingGlassIcon-DAv0JFa8.js";import"./reason-BRIeM0DO.js";import"./routing-BzgBYGmF.js";import"./compact-item-CGrSJ8po.js";import"./index-Cui2ohwK.js";import"./motion-L0wigdRl.js";import"./useIcons-BgeyJh74.js";function be(){const d=I(),{common_issues:f}=p(a=>a.common_issues),{ticket:y}=p(a=>a.tickets),{form:e}=p(a=>a.tickets_create),[C,c]=i.useState(!1),u=window.location.pathname.split("/")[4],[q,w]=i.useState([]),{url:o}=E(),[_,h]=i.useState(!1);i.useEffect(()=>{(async()=>{try{const r=await g(o.split("/")[o.split("/").length-2].split("#")[0]);d(T(r))}catch(r){console.error("Error fetching data:",r)}})()},[o]),i.useEffect(()=>{async function a(r){const m=await g(u);d(x(m))}a()},[]),i.useEffect(()=>{async function a(r){h(!0);const m=await J();w(m.map(j=>({name:j,value:j}))),h(!1)}a()},[]);function t(a,r){d(x({...e,[r]:a}))}i.useEffect(()=>{P.dispatch(L())},[]);async function S(a){a.preventDefault(),c(!0);const r={...e,id:u,status:y.status};try{await O(r),c(!1),D.visit(`/administrator/tickets/details/${u}/details`)}catch{c(!1)}}const k=a=>v.find(r=>r.value===a),{regions:M}=k(e.country??"CA");function b(a){d(x({...e,issue:JSON.stringify(a)}))}return console.log("form.issue",e.issue),s.jsx("form",{onSubmit:S,className:" w-full px-8 pt-6 pb-8 mb-4 flex flex-col gap-3",children:_?s.jsx(U,{}):s.jsxs("div",{className:"min-h-screen h-full",children:[s.jsx("div",{className:"flex items-center justify-center font-black text-3xl my-6",children:"EDIT TICKET FORM"}),s.jsxs("div",{className:" md:flex mb-3",children:[s.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:s.jsx(l,{required:!1,onChange:t,name:"fname",value:e==null?void 0:e.fname,label:"First Name",type:"text",errorMessage:"First Name is required"})}),s.jsx("div",{className:"md:w-1/2 px-3",children:s.jsx(l,{required:!1,onChange:t,name:"lname",value:e==null?void 0:e.lname,label:"Last Name",type:"text",errorMessage:"Last Name is required"})})]}),s.jsxs("div",{className:" md:flex mb-3",children:[s.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:s.jsxs("div",{className:"flex gap-4",children:[s.jsx("div",{className:"basis-1/3",children:s.jsx(n,{onChange:t,name:"isHasEmail",required:!1,value:(e==null?void 0:e.isHasEmail)??!0,label:"Has Email?",errorMessage:"",data:[{value:!0,name:"Yes"},{value:!1,name:"No"}]})}),s.jsx("div",{className:"basis-full",children:((e==null?void 0:e.isHasEmail)??"true")=="true"?s.jsx(l,{required:!1,onChange:t,name:"email",value:e==null?void 0:e.email,label:"Email",type:"email",errorMessage:"Email is required"}):s.jsx(s.Fragment,{})})]})}),s.jsx("div",{className:"md:w-1/2 px-3",children:s.jsx(l,{onChange:t,name:"phone",required:!0,value:e==null?void 0:e.phone,label:"Phone Number",type:"phone",errorMessage:"Phone Number is required"})})]}),s.jsxs("div",{className:" md:flex mb-3",children:[s.jsx("div",{className:"md:w-1/4 px-3 mb-3",children:s.jsx(F,{})}),s.jsx("div",{className:"basis-full",children:s.jsx("div",{className:"md:wfull px-3 mb-3",children:s.jsx(n,{onChange:t,name:"store",value:e==null?void 0:e.store,label:"Store Name",errorMessage:"Store Name is required",data:q})})})]}),s.jsxs("div",{className:" md:flex mb-3",children:[s.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:s.jsx(l,{onChange:t,name:"item_number",required:!1,value:e==null?void 0:e.item_number,label:"Item Number",type:"text",errorMessage:"Item Number is required"})}),s.jsx("div",{className:"md:w-1/2 px-3",children:s.jsx(l,{onChange:t,name:"unit",required:!1,value:e==null?void 0:e.unit,label:"Item Unit",type:"text",errorMessage:"Item Unit is required"})})]}),s.jsxs("div",{className:" md:flex mb-3",children:[s.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:s.jsx(l,{onChange:t,name:"brand",required:!1,value:e==null?void 0:e.brand,label:"Brand",type:"text",errorMessage:"Brand is required"})}),s.jsx("div",{className:"md:w-1/2 px-3",children:s.jsx(l,{onChange:t,name:"class",required:!1,value:e==null?void 0:e.class,label:"Item Class",type:"text",errorMessage:"Item Class is required"})})]}),s.jsxs("div",{className:" md:flex mb-3",children:[s.jsx("div",{className:"md:w-2/6 px-3 mb-3",children:s.jsx(l,{onChange:t,name:"serial_number",required:!1,value:e==null?void 0:e.serial_number,label:"Serial Number",type:"text",errorMessage:"Serial Number is required"})}),s.jsx("div",{className:"md:w-2/6 px-3",children:s.jsx(n,{onChange:t,name:"call_type",required:!1,value:e==null?void 0:e.call_type,label:"Call Type",errorMessage:"Call Type is required",data:R})}),s.jsx("div",{className:"md:w-2/6 px-3",children:s.jsx(l,{onChange:t,name:"purchase_date",required:!1,value:e==null?void 0:e.purchase_date,label:"Purchase Date",type:"date",errorMessage:"Purchase Date is required"})})]}),s.jsxs("div",{className:" md:flex mb-3",children:[s.jsx("div",{className:"md:w-1/4 px-3 mb-3",children:s.jsx(l,{onChange:t,name:"zip_code",required:!1,value:e==null?void 0:e.zip_code,label:"Zip Code / Postal Code",type:"text",errorMessage:"Zip Code is required"})}),s.jsx("div",{className:"md:w-1/4 px-3",children:s.jsx(n,{onChange:t,name:"country",required:!1,value:e==null?void 0:e.country,label:"Country",errorMessage:"Country is required",data:v.map(a=>({name:a.name,value:a.value}))})}),s.jsx("div",{className:"md:w-1/4 px-3",children:s.jsx(n,{onChange:t,name:"state",required:!1,value:e==null?void 0:e.state,label:"State",errorMessage:"State is required",data:M})}),s.jsx("div",{className:"md:w-1/4 px-3",children:s.jsx(l,{onChange:t,name:"city",required:!1,value:e==null?void 0:e.city,label:"City",type:"text",errorMessage:"City is required"})})]}),s.jsxs("div",{className:"flex flex-col gap-4 mb-3",children:[s.jsx("div",{className:"md:w-full px-3 mb-3",children:s.jsx(l,{onChange:t,name:"address",required:!1,value:e==null?void 0:e.address,label:"Address",type:"text"})}),s.jsxs("div",{className:"md:w-full px-3 mb-3",children:[(e==null?void 0:e.issue)&&e.call_type=="Parts"&&s.jsx(N,{mode:"multiple",size:"large",placeholder:"Please select",defaultValue:JSON.parse(e.issue??"[]")??[],onChange:b,style:{width:"100%"},options:[{value:"Missing Parts",label:"Missing Parts"},{value:"Damage Parts",label:"Damage Parts"},{value:"Want to buy Parts",label:"Want to buy Parts"}]}),(e==null?void 0:e.issue)&&e.call_type!=="Parts"&&s.jsx(N,{mode:"multiple",size:"large",placeholder:"Please select",defaultValue:JSON.parse(e.issue??"[]")??[],onChange:b,style:{width:"100%"},options:f.map(a=>({value:a.id,label:a.name}))})]}),s.jsx("div",{className:"md:w-full flex px-3 mb-3 gap-5",children:s.jsx("div",{className:"basis-full",children:s.jsx(H,{required:!0,onChange:t,name:"remarks",value:e==null?void 0:e.remarks,label:"Remarks",type:"text",errorMessage:"Remarks is required"})})}),s.jsxs("div",{className:"flex gap-4 items-center justify-center",children:[s.jsx("button",{type:"submit",className:"p-3 flex items-center justify-center w-36 bg-blue-500 text-white rounded-sm hover:to-blue-600",children:C?s.jsx("div",{className:"py-1.5",children:s.jsx(z,{})}):"UPDATE"}),s.jsx(A,{data:e})]})]})]})})}export{be as default};