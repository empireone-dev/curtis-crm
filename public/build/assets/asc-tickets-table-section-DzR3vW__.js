import{r as m,j as e,a as y}from"./page-Z5sU5TGy.js";import{H as C}from"./main-CZ6tPEUG.js";import{u as D}from"./app-BdYAYxY0.js";import{h as R}from"./page-CFLMsCzl.js";import"./list-DhL-EaBS.js";import{F as L,I as _}from"./Table-WWQXU8k8.js";import{T as p}from"./index-Ctoa6ikp.js";import{T as N}from"./index-jPrSxhyu.js";import{R as E}from"./EyeOutlined-rdO5Vxwa.js";import{S as O}from"./index-s71pRLwL.js";import{B as l}from"./button-DzgIoOCX.js";import{R as f}from"./useIcons-BPp1KorC.js";import"./index-DsXjZlsd.js";import"./asyncToGenerator-CaN3ZOWd.js";import"./index-Bxi7iSBX.js";import"./compact-item-BNKHHmgc.js";import"./pickAttrs-C18JNuNA.js";import"./addEventListener-BR7CmZAm.js";import"./index-BOUiFiLM.js";import"./KeyCode-DNlgD2sM.js";import"./Overflow-Gg_RUgn7.js";import"./useZIndex-D7WMXbQk.js";import"./motion-4S5rSXvC.js";import"./PurePanel-KpN9BcVk.js";import"./useLocale-BQU_ZDLM.js";import"./index-CBP_eq23.js";import"./index-D5_-mu92.js";import"./RightOutlined-DL5R8SJO.js";import"./ContextIsolator-DUy6z07H.js";import"./zoom-D0OisDTV.js";import"./roundedArrow-YjDGoSGH.js";import"./Pagination-Ir8Femux.js";import"./useForceUpdate-BQt5o8-3.js";import"./index-BILOWpMW.js";import"./useClosable-DAUUjzen.js";import"./render-G9ln3EV6.js";function ft(){const{tickets:x}=D(i=>i.asc_tickets);let g=x;const[k,n]=m.useState(""),[I,c]=m.useState(""),u=m.useRef(null),d=(i,t,s)=>{t(),n(i[0]),c(s)},T=i=>{i(),n("")},r=i=>({filterDropdown:({setSelectedKeys:t,selectedKeys:s,confirm:o,clearFilters:h,close:A})=>e.jsxs("div",{style:{padding:8},onKeyDown:a=>a.stopPropagation(),children:[e.jsx(_,{ref:u,placeholder:`Search ${i}`,value:s[0],onChange:a=>t(a.target.value?[a.target.value]:[]),onPressEnter:()=>d(s,o,i),style:{marginBottom:8,display:"block"}}),e.jsxs(O,{children:[e.jsx(l,{type:"primary",onClick:()=>d(s,o,i),icon:e.jsx(f,{}),size:"small",style:{width:90},children:"Search"}),e.jsx(l,{onClick:()=>h&&T(h),size:"small",style:{width:90},children:"Reset"}),e.jsx(l,{type:"link",size:"small",onClick:()=>{o({closeDropdown:!1}),n(s[0]),c(i)},children:"Filter"}),e.jsx(l,{type:"link",size:"small",onClick:()=>{A()},children:"close"})]})]}),filterIcon:t=>e.jsx(f,{style:{color:t?"#1677ff":void 0}}),onFilter:(t,s)=>s[i].toString().toLowerCase().includes(t.toLowerCase()),onFilterDropdownOpenChange:t=>{t&&setTimeout(()=>{var s;return(s=u.current)==null?void 0:s.select()},100)},render:t=>I===i?e.jsx(C,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[k],autoEscape:!0,textToHighlight:t?t.toString():""}):t}),j=g??[],S=[{title:"Ticket ID",dataIndex:"ticket_id",key:"ticket_id",...r("ticket_id")},{title:"Fullname",dataIndex:"fullname",key:"fullname",...r("fullname"),render:(i,t,s)=>e.jsxs("div",{color:"red",children:[t.fname," ",t.lname]},s)},{title:"Email",dataIndex:"email",key:"email",...r("email")},{title:"Resolution",dataIndex:"call_type",key:"call_type",...r("call_type")},{title:"Issue",dataIndex:"issue",key:"issue",...r("issue"),render:(i,t,s)=>e.jsx(p,{color:"blue",children:JSON.parse(t.issue)},s)},{title:"Status",dataIndex:"status",key:"status",...r("status"),render:(i,t,s)=>{const o=t.status=="CLOSED"?"red":t.status=="PARTS VALIDATION"||t.status=="WARRANTY VALIDATION"||t.status=="TECH VALIDATION"?"orange":"green";return e.jsx(e.Fragment,{children:e.jsx(p,{color:o,children:(t.status=="PARTS VALIDATION"||t.status=="WARRANTY VALIDATION"||t.status=="TECH VALIDATION")&&t.isUploading=="false"?"OPEN":t.status},s)})}},{title:"IsUpload",dataIndex:"isUploading",key:"isUploading",...r("isUploading"),render:(i,t,s)=>{const o=t.isUploading=="true"?"green":"red";return e.jsx(e.Fragment,{children:e.jsx(p,{color:o,children:t.isUploading=="true"?"UPLOADED":"PENDING"},s)})}},{title:"Created At",dataIndex:"status",key:"status",render:(i,t,s)=>e.jsx("div",{children:R(t.created_at).format("LLL")})},{title:"action",dataIndex:"action",render:(i,t)=>e.jsx(N,{placement:"topLeft",title:"View Ticket Details",children:e.jsx(y,{href:"/asc/tickets/details/"+t.id+"/files",children:e.jsx(E,{className:"text-lg text-blue-500"})})})}];return e.jsx(L,{columns:S,dataSource:j})}export{ft as default};