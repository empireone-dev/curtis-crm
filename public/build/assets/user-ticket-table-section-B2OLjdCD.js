import{r as a,j as t,d as R}from"./store-0Qzhg5Cj.js";import{H as _}from"./main-CmBxoAqt.js";import{h as E}from"./moment-Cl4UOzQZ.js";import{u as N}from"./app-9iRmoX6o.js";import O from"./user-ticket-transfer-section-VI88Phwh.js";import{T as U,I as P}from"./Table-CoRB7ifu.js";import{T as d}from"./index-DEs65qqU.js";import{T as b,E as v}from"./addEventListener-5c1zsMQG.js";import{S as V}from"./index-BImYM8ag.js";import{B as n}from"./button-BPR5GFd1.js";import{S}from"./index-BuJ3FBA6.js";import"./loading-9B-ceNpQ.js";import"./modal-BB8Ob1Bx.js";import"./transition-BQz_x7pe.js";import"./dialog-B3BbVgJi.js";import"./select-BwWH4uaK.js";import"./user-service-DYAUPOyE.js";import"./customer-tickets-thunk-DmFSZWaG.js";import"./tickets-service-D5k9ViTr.js";import"./files-service-EugUQ0yZ.js";import"./compact-item-oV-Lk8KN.js";import"./index-Bmfma0B6.js";import"./index-o1qQifpu.js";import"./motion-L0wigdRl.js";import"./index-BiLDZFsw.js";import"./reactNode-DWH_taMQ.js";import"./useForceUpdate-BKtlzFRE.js";import"./collapse-C1MjllT7.js";import"./roundedArrow-D7ZfdB5T.js";import"./Pagination-B0j-Yd1-.js";import"./colors-t0gbQS4y.js";function fe(){var g;const{tickets:c}=N(s=>s.customer_tickets),[T,m]=a.useState(""),[k,p]=a.useState(""),u=a.useRef(null),[y,F]=a.useState("checkbox"),[h,j]=a.useState([]);a.useState(!1);const x=(s,e,i)=>{e(),m(s[0]),p(i)},I=s=>{s(),m("")},o=s=>({filterDropdown:({setSelectedKeys:e,selectedKeys:i,confirm:r,clearFilters:f,close:L})=>t.jsxs("div",{style:{padding:8},onKeyDown:l=>l.stopPropagation(),children:[t.jsx(P,{ref:u,placeholder:`Search ${s}`,value:i[0],onChange:l=>e(l.target.value?[l.target.value]:[]),onPressEnter:()=>x(i,r,s),style:{marginBottom:8,display:"block"}}),t.jsxs(V,{children:[t.jsx(n,{type:"primary",onClick:()=>x(i,r,s),icon:t.jsx(S,{}),size:"small",style:{width:90},children:"Search"}),t.jsx(n,{onClick:()=>f&&I(f),size:"small",style:{width:90},children:"Reset"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{r({closeDropdown:!1}),m(i[0]),p(s)},children:"Filter"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{L()},children:"close"})]})]}),filterIcon:e=>t.jsx(S,{style:{color:e?"#1677ff":void 0}}),onFilter:(e,i)=>i[s].toString().toLowerCase().includes(e.toLowerCase()),onFilterDropdownOpenChange:e=>{e&&setTimeout(()=>{var i;return(i=u.current)==null?void 0:i.select()},100)},render:e=>k===s?t.jsx(_,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[T],autoEscape:!0,textToHighlight:e?e.toString():""}):e}),A=(g=c==null?void 0:c.data)==null?void 0:g.map((s,e)=>({...s,key:s.id})),C=[{title:"Ticket ID",dataIndex:"ticket_id",key:"ticket_id",...o("ticket_id")},{title:"Fullname",dataIndex:"fullname",key:"fullname",...o("fullname"),render:(s,e,i)=>t.jsxs("div",{color:"red",children:[e.fname," ",e.lname]},i)},{title:"Email",dataIndex:"email",key:"email",...o("email")},{title:"Resolution",dataIndex:"call_type",key:"call_type",...o("call_type")},{title:"Issue",dataIndex:"issue",key:"issue",...o("issue"),render:(s,e,i)=>t.jsx(d,{color:"blue",children:JSON.parse(e.issue)},i)},{title:"Status",dataIndex:"status",key:"status",...o("status"),render:(s,e,i)=>{const r=e.status=="CLOSED"?"red":e.status=="PARTS VALIDATION"||e.status=="WARRANTY VALIDATION"||e.status=="TECH VALIDATION"?"orange":"green";return t.jsx(t.Fragment,{children:t.jsx(d,{color:r,children:(e.status=="PARTS VALIDATION"||e.status=="WARRANTY VALIDATION"||e.status=="TECH VALIDATION")&&e.isUploading=="false"?"OPEN":e.status},i)})}},{title:"IsUpload",dataIndex:"isUploading",key:"isUploading",...o("isUploading"),render:(s,e,i)=>{const r=e.isUploading=="true"?"green":"red";return t.jsx(t.Fragment,{children:t.jsx(d,{color:r,children:e.isUploading=="true"?"UPLOADED":"PENDING"},i)})}},{title:"Created At",dataIndex:"status",key:"status",render:(s,e,i)=>t.jsx("div",{children:E(e.created_at).format("LLL")})},{title:"action",dataIndex:"action",render:(s,e)=>t.jsx(b,{placement:"topLeft",title:"View Ticket Details",children:t.jsx(R,{href:"/administrator/tickets/details/"+e.id+"/files",children:t.jsx(v,{className:"text-lg text-blue-500"})})})}],D={onChange:(s,e)=>{j(e)},getCheckboxProps:s=>({name:s.name})},w=h.length>0;return t.jsxs(t.Fragment,{children:[w&&t.jsx(O,{selected:h}),t.jsx(U,{rowSelection:{type:y,...D},columns:C,dataSource:A})]})}export{fe as default};