import{r as o,s as u,j as e,p as x,y as p}from"./page-BdFAeS7-.js";import{I as i}from"./input-74t9VD3v.js";import{a as q,u as m}from"./app-DE6fY-jh.js";import{S as l}from"./select-Q3JaeTHu.js";import k from"./tickets-create-search-product-section-C_CAHvGF.js";import{T as _}from"./textarea-CDgwe2ne.js";import{g as w}from"./ticket-form-thunk-DKe0xCCt.js";import{c as h}from"./country-BSDXfwdN.js";import{c as M}from"./call_type-Hx28cB9H.js";import{t as E}from"./tickets-create-thunk-D5tDbQ6P.js";import{L as S}from"./loading-DmFaRxux.js";import{A as f}from"./autocomplete-8tSWIZdq.js";import{w as P,p as T}from"./initial-templates-Bij_MYPS.js";import F from"./ticket-close-section-BxbyKQqc.js";import"./index-DuM2TwmN.js";import"./modal-BxzSCEOn.js";import"./transition-Di7Z8CQp.js";import"./dialog-CA6tNbqZ.js";import"./MagnifyingGlassIcon-DAv0JFa8.js";import"./product-search-CjdPs_Lo.js";import"./tickets-service-CG_MJ_mA.js";import"./XMarkIcon-DGnjYaTh.js";import"./reason-BRIeM0DO.js";function re(){const n=q(),{form:a}=m(r=>r.tickets_create),{user:d}=m(r=>r.app),{common_issues:b}=m(r=>r.common_issues),[j,c]=o.useState(!1);function s(r,t){n(x({...a,[t]:r}))}o.useEffect(()=>{u.dispatch(w())},[]);const v=P(a),g=T(a);console.log("form",a);async function N(r){r.preventDefault(),c(!0),n(x({...a,status:null,user:d,created_from:"AGENT FORM",email:a.isHasEmail=="true"||a.isHasEmail==!0?a.email:null,body:a.call_type=="Parts"?g:v}));const t=await u.dispatch(E());c(!1),d.role_id==1?p.visit("/administrator/tickets?search="+(t==null?void 0:t.ticket_id)):p.visit("/agent/tickets?search="+(t==null?void 0:t.ticket_id))}const y=r=>h.find(t=>t.value===r),{regions:C}=y(a.country??"");return e.jsxs("form",{onSubmit:N,className:" w-full px-8 pt-6 pb-8 mb-4 flex flex-col gap-3",children:[e.jsx("div",{className:"flex items-center justify-center font-black text-3xl",children:"Ticket Form"}),e.jsxs("div",{className:" md:flex mb-3",children:[e.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:e.jsx(i,{required:!1,onChange:s,name:"fname",value:a.fname,label:"First Name",type:"text",errorMessage:"First Name is required"})}),e.jsx("div",{className:"md:w-1/2 px-3",children:e.jsx(i,{required:!1,onChange:s,name:"lname",value:a.lname,label:"Last Name",type:"text",errorMessage:"Last Name is required"})})]}),e.jsxs("div",{className:" md:flex mb-3",children:[e.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("div",{className:"basis-1/3",children:e.jsx(l,{onChange:s,name:"isHasEmail",required:!1,value:a.isHasEmail??"true",label:"Has Email?",errorMessage:"",data:[{value:!0,name:"Yes"},{value:!1,name:"No"}]})}),e.jsx("div",{className:"basis-full",children:(a.isHasEmail??"true")=="true"&&e.jsx(i,{required:!1,onChange:s,name:"email",value:a.email,label:"Email",type:"email",errorMessage:"Email is required"})})]})}),e.jsx("div",{className:"md:w-1/2 px-3",children:e.jsx(i,{onChange:s,name:"phone",required:!0,value:a.phone,label:"Phone Number",type:"phone",errorMessage:"Phone Number is required"})})]}),e.jsx("div",{className:" md:flex mb-3",children:e.jsx("div",{className:" px-3 mb-3",children:e.jsx(k,{})})}),e.jsxs("div",{className:" md:flex mb-3",children:[e.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:e.jsx(i,{onChange:s,name:"item_number",required:!1,value:a.item_number,label:"Item Number",type:"text",errorMessage:"Item Number is required"})}),e.jsx("div",{className:"md:w-1/2 px-3",children:e.jsx(i,{onChange:s,name:"unit",required:!1,value:a.unit,label:"Item Unit",type:"text",errorMessage:"Item Unit is required"})})]}),e.jsxs("div",{className:" md:flex mb-3",children:[e.jsx("div",{className:"md:w-1/2 px-3 mb-3",children:e.jsx(i,{onChange:s,name:"brand",required:!1,value:a.brand,label:"Brand",type:"text",errorMessage:"Brand is required"})}),e.jsx("div",{className:"md:w-1/2 px-3",children:e.jsx(i,{onChange:s,name:"class",required:!1,value:a.class,label:"Item Class",type:"text",errorMessage:"Item Class is required"})})]}),e.jsxs("div",{className:" md:flex mb-3",children:[e.jsx("div",{className:"md:w-2/6 px-3 mb-3",children:e.jsx(i,{onChange:s,name:"serial_number",required:!1,value:a.serial_number,label:"Serial Number",type:"text",errorMessage:"Serial Number is required"})}),e.jsx("div",{className:"md:w-2/6 px-3",children:e.jsx(l,{onChange:s,name:"call_type",required:!1,value:a.call_type,label:"Call Type",errorMessage:"Call Type is required",data:M})}),e.jsx("div",{className:"md:w-2/6 px-3",children:e.jsx(i,{onChange:s,name:"purchase_date",required:!1,value:a.purchase_date,label:"Purchase Date",type:"date",errorMessage:"Purchase Date is required"})})]}),e.jsxs("div",{className:" md:flex mb-3",children:[e.jsx("div",{className:"md:w-1/4 px-3 mb-3",children:e.jsx(i,{onChange:s,name:"zip_code",required:!1,value:a.zip_code,label:"Zip Code / Postal Code",type:"text",errorMessage:"Zip Code is required"})}),e.jsx("div",{className:"md:w-1/4 px-3",children:e.jsx(l,{onChange:s,name:"country",required:!1,value:a.country,label:"Country",errorMessage:"Country is required",data:h.map(r=>({name:r.name,value:r.value}))})}),e.jsx("div",{className:"md:w-1/4 px-3",children:e.jsx(l,{onChange:s,name:"state",required:!1,value:a.state,label:"State",errorMessage:"State is required",data:C})}),e.jsx("div",{className:"md:w-1/4 px-3",children:e.jsx(i,{onChange:s,name:"city",required:!1,value:a.city,label:"City",type:"text",errorMessage:"City is required"})})]}),e.jsxs("div",{className:"flex flex-col gap-4 mb-3",children:[e.jsx("div",{className:" px-3 mb-3",children:e.jsx(i,{onChange:s,name:"address",required:!1,value:a.address,label:"Address",type:"text"})}),e.jsx("div",{className:"my-5 px-3 mb-3",children:a.call_type=="Parts"?e.jsx(f,{defaultValue:"[]",onChange:s,value:[{id:"Missing Parts",name:"Missing Parts"},{id:"Damage Parts",name:"Damage Parts"},{id:"Want to buy Parts",name:"Want to buy Parts"}]}):e.jsx(f,{defaultValue:"[]",onChange:s,value:b.map(r=>({id:r.id,name:r.name}))})}),e.jsxs("div",{className:" flex px-3 mb-3 gap-5",children:[e.jsx("div",{className:"basis-3/4",children:e.jsx(_,{required:!0,onChange:s,name:"remarks",value:a.remarks,label:"Remarks",type:"text",errorMessage:"Remarks is required"})}),e.jsx("div",{className:"basis-1/4 flex items-center justify-center",children:e.jsx("div",{className:"flex items-center justify-center",children:(a.isHasEmail??"true")=="true"&&e.jsxs(e.Fragment,{children:[e.jsx("input",{id:"checked-checkbox",checked:a.isSendEmail,onChange:r=>s(r.target.checked,"isSendEmail"),type:"checkbox",name:"isSendEmail",className:"w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "}),e.jsx("label",{htmlFor:"checked-checkbox",className:"ms-2 text-sm font-black text-gray-900 ",children:"Send Initial Email"})]})})})]}),e.jsxs("div",{className:"flex gap-4 items-center justify-center",children:[e.jsx("button",{className:"p-3 flex items-center justify-center w-36 bg-blue-500 text-white rounded-sm hover:to-blue-600",children:j?e.jsx("div",{className:"py-1.5",children:e.jsx(S,{})}):"Open"}),e.jsx(F,{data:a})]})]})]})}export{re as default};