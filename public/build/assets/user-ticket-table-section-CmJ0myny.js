import{r as a,j as e,d as R}from"./page-B_FNLrKI.js";import{H as _}from"./main-2EAyikmI.js";import{h as E}from"./page-DNq_QWra.js";import{u as N}from"./app-CcF4oVWF.js";import O from"./user-ticket-transfer-section-DEbgzkGo.js";import{T as U,I as P}from"./Table-DCt0wOec.js";import{T as p}from"./index-B_wftORK.js";import{T as b}from"./index-DCufCK--.js";import{S as v}from"./index-CfxYZ5if.js";import{B as n}from"./button-CDM6RDM6.js";import{E as V}from"./EyeOutlined-BECE-CZ9.js";import{S}from"./useIcons-BTOtFulL.js";import"./index-DabsQ7f6.js";import"./loading-CWsRI-u5.js";import"./modal-DapqomNQ.js";import"./transition-BpA4Mxie.js";import"./dialog-CcpJyT9n.js";import"./select-ldsRR2RI.js";import"./user-service-Boy6pX2Q.js";import"./customer-tickets-thunk-DP2QeN5P.js";import"./tickets-service-BgYWgIIT.js";import"./files-service-ChtK06SL.js";import"./asyncToGenerator-DYUyOi83.js";import"./compact-item-CFEgdXJP.js";import"./index-BEUi5bVi.js";import"./pickAttrs-Dct9vqKx.js";import"./addEventListener-D2TAo-bn.js";import"./index-CN9WdgV4.js";import"./KeyCode-DNlgD2sM.js";import"./Overflow-DCcGbOmj.js";import"./useZIndex-DEasTsYa.js";import"./motion-DJ7hMwu8.js";import"./useLocale-CdzdcKtH.js";import"./RightOutlined-CFCzjVj5.js";import"./index-DCGtiGqG.js";import"./zoom-DaP9kBAw.js";import"./roundedArrow-DPzGQt_q.js";import"./Pagination-BkIlxw8l.js";import"./useForceUpdate-CiKgljI7.js";import"./index--hbNLtlH.js";import"./useClosable-Cbgjb4lL.js";import"./render-DFTnvfjc.js";function Lt(){var g;const{tickets:m}=N(s=>s.customer_tickets),[T,c]=a.useState(""),[k,d]=a.useState(""),u=a.useRef(null),[y,F]=a.useState("checkbox"),[h,j]=a.useState([]);a.useState(!1);const x=(s,t,i)=>{t(),c(s[0]),d(i)},I=s=>{s(),c("")},o=s=>({filterDropdown:({setSelectedKeys:t,selectedKeys:i,confirm:r,clearFilters:f,close:L})=>e.jsxs("div",{style:{padding:8},onKeyDown:l=>l.stopPropagation(),children:[e.jsx(P,{ref:u,placeholder:`Search ${s}`,value:i[0],onChange:l=>t(l.target.value?[l.target.value]:[]),onPressEnter:()=>x(i,r,s),style:{marginBottom:8,display:"block"}}),e.jsxs(v,{children:[e.jsx(n,{type:"primary",onClick:()=>x(i,r,s),icon:e.jsx(S,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(n,{onClick:()=>f&&I(f),size:"small",style:{width:90},children:"Reset"}),e.jsx(n,{type:"link",size:"small",onClick:()=>{r({closeDropdown:!1}),c(i[0]),d(s)},children:"Filter"}),e.jsx(n,{type:"link",size:"small",onClick:()=>{L()},children:"close"})]})]}),filterIcon:t=>e.jsx(S,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,i)=>i[s].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var i;return(i=u.current)==null?void 0:i.select()},100)},render:t=>k===s?e.jsx(_,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[T],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),A=(g=m==null?void 0:m.data)==null?void 0:g.map((s,t)=>({...s,key:s.id})),C=[{title:"Ticket ID",dataIndex:"ticket_id",key:"ticket_id",...o("ticket_id")},{title:"Fullname",dataIndex:"fullname",key:"fullname",...o("fullname"),render:(s,t,i)=>e.jsxs("div",{color:"red",children:[t.fname," ",t.lname]},i)},{title:"Email",dataIndex:"email",key:"email",...o("email")},{title:"Resolution",dataIndex:"call_type",key:"call_type",...o("call_type")},{title:"Issue",dataIndex:"issue",key:"issue",...o("issue"),render:(s,t,i)=>e.jsx(p,{color:"blue",children:JSON.parse(t.issue)},i)},{title:"Status",dataIndex:"status",key:"status",...o("status"),render:(s,t,i)=>{const r=t.status=="CLOSED"?"red":t.status=="PARTS VALIDATION"||t.status=="WARRANTY VALIDATION"||t.status=="TECH VALIDATION"?"orange":"green";return e.jsx(e.Fragment,{children:e.jsx(p,{color:r,children:(t.status=="PARTS VALIDATION"||t.status=="WARRANTY VALIDATION"||t.status=="TECH VALIDATION")&&t.isUploading=="false"?"OPEN":t.status},i)})}},{title:"IsUpload",dataIndex:"isUploading",key:"isUploading",...o("isUploading"),render:(s,t,i)=>{const r=t.isUploading=="true"?"green":"red";return e.jsx(e.Fragment,{children:e.jsx(p,{color:r,children:t.isUploading=="true"?"UPLOADED":"PENDING"},i)})}},{title:"Created At",dataIndex:"status",key:"status",render:(s,t,i)=>e.jsx("div",{children:E(t.created_at).format("LLL")})},{title:"action",dataIndex:"action",render:(s,t)=>e.jsx(b,{placement:"topLeft",title:"View Ticket Details",children:e.jsx(R,{href:"/administrator/tickets/details/"+t.id+"/files",children:e.jsx(V,{className:"text-lg text-blue-500"})})})}],D={onChange:(s,t)=>{j(t)},getCheckboxProps:s=>({name:s.name})},w=h.length>0;return e.jsxs(e.Fragment,{children:[w&&e.jsx(O,{selected:h}),e.jsx(U,{rowSelection:{type:y,...D},columns:C,dataSource:A})]})}export{Lt as default};