import{r,j as t,d as L}from"./store-CoNfLyJe.js";import{H as R}from"./main-DOwW_DTH.js";import{h as _}from"./moment-Cl4UOzQZ.js";import{u as E}from"./app-BYzZG7a0.js";import N from"./user-ticket-transfer-section-BJ7_ke25.js";import{T as O,a as U,E as P,I as b}from"./Table-DgVs2HQU.js";import{T as d}from"./index-BaHKx-fT.js";import{S as v,a as g}from"./index-BAvfLYGl.js";import{B as n}from"./button-DB8x2JLN.js";import"./loading-DPiaRgIn.js";import"./modal-Cm8Ljpac.js";import"./transition-Bp5yISxV.js";import"./dialog-u6KUC5_a.js";import"./select-B1PRN4EX.js";import"./user-service-BDvvDKEr.js";import"./customer-tickets-thunk-1QjUNDei.js";import"./tickets-service-Cd3gRd4F.js";import"./files-service-CIO3M2GX.js";import"./useSize-DnQoG3Ym.js";import"./index-DrmCw9XN.js";import"./motion-R-4MZH3D.js";import"./RightOutlined-B1QCUT6L.js";import"./CloseOutlined-X-ke7wcX.js";function ne(){const{tickets:k}=E(s=>s.customer_tickets),[S,c]=r.useState(""),[f,u]=r.useState(""),m=r.useRef(null),[T,V]=r.useState("checkbox"),[p,y]=r.useState([]);r.useState(!1);const h=(s,e,i)=>{e(),c(s[0]),u(i)},j=s=>{s(),c("")},a=s=>({filterDropdown:({setSelectedKeys:e,selectedKeys:i,confirm:o,clearFilters:x,close:w})=>t.jsxs("div",{style:{padding:8},onKeyDown:l=>l.stopPropagation(),children:[t.jsx(b,{ref:m,placeholder:`Search ${s}`,value:i[0],onChange:l=>e(l.target.value?[l.target.value]:[]),onPressEnter:()=>h(i,o,s),style:{marginBottom:8,display:"block"}}),t.jsxs(v,{children:[t.jsx(n,{type:"primary",onClick:()=>h(i,o,s),icon:t.jsx(g,{}),size:"small",style:{width:90},children:"Search"}),t.jsx(n,{onClick:()=>x&&j(x),size:"small",style:{width:90},children:"Reset"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{o({closeDropdown:!1}),c(i[0]),u(s)},children:"Filter"}),t.jsx(n,{type:"link",size:"small",onClick:()=>{w()},children:"close"})]})]}),filterIcon:e=>t.jsx(g,{style:{color:e?"#1677ff":void 0}}),onFilter:(e,i)=>i[s].toString().toLowerCase().includes(e.toLowerCase()),onFilterDropdownOpenChange:e=>{e&&setTimeout(()=>{var i;return(i=m.current)==null?void 0:i.select()},100)},render:e=>f===s?t.jsx(R,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[S],autoEscape:!0,textToHighlight:e?e.toString():""}):e}),I=k.map((s,e)=>({...s.ticket,key:s.id})),A=[{title:"Ticket ID",dataIndex:"ticket_id",key:"ticket_id",...a("ticket_id")},{title:"Fullname",dataIndex:"fullname",key:"fullname",...a("fullname"),render:(s,e,i)=>t.jsxs("div",{color:"red",children:[e.fname," ",e.lname]},i)},{title:"Email",dataIndex:"email",key:"email",...a("email")},{title:"Resolution",dataIndex:"call_type",key:"call_type",...a("call_type")},{title:"Issue",dataIndex:"issue",key:"issue",...a("issue"),render:(s,e,i)=>t.jsx(d,{color:"blue",children:JSON.parse(e.issue)},i)},{title:"Status",dataIndex:"status",key:"status",...a("status"),render:(s,e,i)=>{const o=e.status=="CLOSED"?"red":e.status=="PARTS VALIDATION"||e.status=="WARRANTY VALIDATION"||e.status=="TECH VALIDATION"?"orange":"green";return t.jsx(t.Fragment,{children:t.jsx(d,{color:o,children:(e.status=="PARTS VALIDATION"||e.status=="WARRANTY VALIDATION"||e.status=="TECH VALIDATION")&&e.isUploading=="false"?"OPEN":e.status},i)})}},{title:"IsUpload",dataIndex:"isUploading",key:"isUploading",...a("isUploading"),render:(s,e,i)=>{const o=e.isUploading=="true"?"green":"red";return t.jsx(t.Fragment,{children:t.jsx(d,{color:o,children:e.isUploading=="true"?"UPLOADED":"PENDING"},i)})}},{title:"Created At",dataIndex:"status",key:"status",render:(s,e,i)=>t.jsx("div",{children:_(e.created_at).format("LLL")})},{title:"action",dataIndex:"action",render:(s,e)=>t.jsx(U,{placement:"topLeft",title:"View Ticket Details",children:t.jsx(L,{href:"/administrator/tickets/details/"+e.id+"/files",children:t.jsx(P,{className:"text-lg text-blue-500"})})})}],C={onChange:(s,e)=>{y(e)},getCheckboxProps:s=>({name:s.name})},D=p.length>0;return t.jsxs(t.Fragment,{children:[D&&t.jsx(N,{selected:p}),t.jsx(O,{rowSelection:{type:T,...C},columns:A,dataSource:I})]})}export{ne as default};