import{r as u,j as t,E as n,x as C,y as g}from"./store-0Qzhg5Cj.js";import{I as r}from"./input-CamLcvdJ.js";import{L as h}from"./loading-9B-ceNpQ.js";import{S as f}from"./select-BwWH4uaK.js";import{T as N}from"./textarea-B1AQylMR.js";import{g as w}from"./fedex-rate-service-C5N1557v.js";import{u as b,a as S}from"./app-9iRmoX6o.js";import{W as q}from"./wysiwyg-CHO-Q9XX.js";import{g as A,s as E}from"./replacement-service-CUrN_spP.js";import{r as x}from"./routing-BzgBYGmF.js";import"./quill.snow-CwPMBP95.js";function $(){const{replacement:e}=b(s=>s.tickets),[d,m]=u.useState(!1),[p,l]=u.useState(!1),o=S(),{email_templates:c}=b(s=>s.email_templates);u.useEffect(()=>{async function s(){const a=await A(e.id);o(n({...e,instruction:(a==null?void 0:a.instruction)??" ",notes:(a==null?void 0:a.notes)??" ",shipping_cost:(a==null?void 0:a.shipping_cost)??0,estimated_cost:(a==null?void 0:a.estimated_cost)??0,template_text:" "}))}s()},[]);function i(s,a){a=="wysiwyg"?o(n({...e,template_text:s})):(s||s=="")&&a&&o(n({...e,[a]:s}))}function _(s){const a=c.find(v=>v.id==s);o(n({...e,template_text:a.template_text}))}async function y(){m(!0);try{const s=await w(e);o(n({...e,shipping_cost:`${parseFloat(s.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE).toFixed(2)}`,estimated_cost:`${(parseFloat(s.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE)+parseFloat(e.unit_cost)).toFixed(2)}`}))}catch{alert("No rates Found!")}m(!1)}async function j(s){s.preventDefault(),l(!0);try{const a=await E({...e,decision_status:"REPLACEMENT"});o(C(a.status)),l(!1),e.instruction=="US Warehouse"||e.instruction=="CA Warehouse"?g.visit(x("warehouse")):g.visit(x("refund"))}catch{l(!1)}}return t.jsx(t.Fragment,{children:t.jsxs("form",{onSubmit:j,className:"container border-2 border-slate-400  p-4 bg-white",children:[t.jsx("div",{className:"sm:flex sm:items-center sm:justify-between border-b border-gray-900/10",children:t.jsx("div",{className:"w-full flex justify-center",children:t.jsx("div",{className:"flex items-center gap-x-3 mt-4 my-4",children:t.jsx("h1",{className:"text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ",children:"REPLACEMENT"})})})}),t.jsxs("div",{className:"flex flex-col gap-6",children:[t.jsx(r,{onChange:i,name:"unit_cost",span:"$",required:!0,value:(e==null?void 0:e.unit_cost)??"0",label:"Cost of Unit",type:"text",errorMessage:"Cost of Unit is required"}),t.jsx(r,{onChange:i,name:"cubed_weight",required:!0,value:(e==null?void 0:e.cubed_weight)??"0",label:"Cube Weight",type:"number",errorMessage:"Cube Weight is required"}),t.jsx("h2",{className:"text-base font-semibold leading-7 text-gray-900",children:"Dimension"}),t.jsxs("div",{className:"flex gap-3",children:[t.jsx(r,{onChange:i,name:"length",required:!0,value:(e==null?void 0:e.length)??"0",label:"Length",type:"number",errorMessage:"Length is required"}),t.jsx(r,{onChange:i,name:"width",required:!0,value:(e==null?void 0:e.width)??"0",label:"Width",type:"number",errorMessage:"Width is required"}),t.jsx(r,{onChange:i,name:"height",required:!0,value:(e==null?void 0:e.height)??"0",label:"Height",type:"number",errorMessage:"Height is required"})]}),t.jsxs("div",{className:"flex gap-3",children:[t.jsx("button",{onClick:y,type:"button",className:`w-96 flex items-center justify-center mr-12 py-2 ${d?"bg-blue-500":" bg-transparent  hover:bg-blue-50"}  text-blue-700 font-semibold px-4 border border-blue-500 rounded w-lg  shadow-sm shadow-black`,children:d?t.jsx(h,{}):"GET FEDEX RATES"}),t.jsx(r,{onChange:i,name:"shipping_cost",span:"$",required:!0,value:String(e==null?void 0:e.shipping_cost)??"0",label:"Shipping Cost",type:"number",errorMessage:"Shipping Cost is required"}),t.jsx(r,{onChange:i,name:"estimated_cost",span:"$",required:!0,value:String(e==null?void 0:e.estimated_cost)??"0",label:"Estimated Cost",type:"number",errorMessage:"Estimated Cost is required"})]}),t.jsx(f,{onChange:i,name:"instruction",required:!1,value:e.instruction??"",label:"Warranty Instruction",errorMessage:"",data:[{value:"",name:""},...e.country==="CA"?[{value:"CA Warehouse",name:"Return to (CA Warehouse)"}]:[],...e.country==="US"?[{value:"US Warehouse",name:"Return to (US Warehouse)"}]:[],{value:"home",name:"Destroy in Home"},{value:"asc",name:"Refer to ASC"}]}),t.jsx(f,{onChange:_,name:"email_template",value:"",label:"Email Templates",errorMessage:"",data:c.map(s=>({name:s.template_name,value:s.id}))}),t.jsx(q,{label:"",name:"wysiwyg",value:(e==null?void 0:e.template_text)??" ",onChange:i}),t.jsx("div",{className:"my-12",children:t.jsx(N,{required:!0,onChange:i,name:"notes",value:e.notes??" ",label:"Notes",type:"text",errorMessage:"Notes is required"})}),t.jsxs("div",{className:"mb-2 flex items-center justify-end gap-x-6",children:[t.jsx("button",{type:"button",className:"text-sm font-semibold leading-6 text-gray-900",children:"Cancel"}),t.jsx("button",{type:"submit",className:"rounded-sm bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:p?t.jsx(h,{}):"Submit"})]})]})]})})}export{$ as default};