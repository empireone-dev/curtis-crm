import{j as a}from"./store-CorJ7S5Q.js";import n from"./tickets-details-move-assign-components-B-kpEGqp.js";import{u as o}from"./app-BYrTr-RY.js";import{I as e}from"./InboxStackIcon-GyG2Xs0p.js";import{W as l}from"./WrenchScrewdriverIcon-QLt_DIRM.js";import{B as m,C as i}from"./CheckBadgeIcon-Dm7nJkdA.js";import{A}from"./ArrowsRightLeftIcon-78TrrP00.js";import"./tickets-thunk-BA8PJKQG.js";import"./tickets-service-BEB5ZAFm.js";import"./internals-service-B9kSbxh_.js";import"./loading-DZuXKO1n.js";import"./routing-BzgBYGmF.js";function C(){const{ticket:s}=o(r=>r.customer_tickets);return a.jsx("div",{className:"px-7",children:s.status!=="WARRANTY VALIDATION"&&s.status!=="CLOSED"&&s.isUploading=="true"&&a.jsx("div",{children:s!=null&&s.call_type&&(s==null?void 0:s.call_type)=="CF-Warranty Claim"?a.jsxs("div",{className:"flex gap-3",children:[(s==null?void 0:s.status)!=="RESOURCE"&&a.jsx(n,{ticket:s,name:"MOVE TO RESOURCE",value:"RESOURCE",icon:a.jsx(e,{className:"h-6"}),link:"decision"}),(s==null?void 0:s.status)!=="REPAIR"&&a.jsx(n,{ticket:s,name:"MOVE TO REPAIR",value:"REPAIR",icon:a.jsx(l,{className:"h-6"}),link:"repair"}),(s==null?void 0:s.status)!=="REFUND"&&a.jsx(n,{ticket:s,name:"MOVE TO REFUND",value:"REFUND",icon:a.jsx(m,{className:"h-6"}),link:"refund"}),(s==null?void 0:s.status)!=="REPLACEMENT"&&a.jsx(n,{ticket:s,name:"MOVE TO REPLACEMENT",value:"REPLACEMENT",icon:a.jsx(A,{className:"h-6"}),link:"replacement"}),(s==null?void 0:s.status)!==null&&a.jsx(n,{ticket:s,name:"MOVE TO VALIDATION",value:s.call_type=="CF-Warranty Claim"?"WARRANTY VALIDATION":s.call_type=="Parts"?"PARTS VALIDATION":"TECH VALIDATION",icon:a.jsx(i,{className:"h-6"}),link:"warranty_validation"})]}):a.jsxs("div",{className:"flex gap-3 mb-4",children:[(s==null?void 0:s.status)!=="REPLACEMENT PARTS"&&a.jsx(n,{ticket:s,name:"MOVE TO REPLACEMENT PARTS",value:"REPLACEMENT PARTS",icon:a.jsx(e,{className:"h-6"}),link:"replacement_parts"}),(s==null?void 0:s.status)!=="PARTS VALIDATION"&&a.jsx(n,{ticket:s,name:"MOVE TO PARTS VALIDATION",value:"PARTS VALIDATION",link:"parts_validation",icon:a.jsx(l,{className:"h-6"})})]})})})}export{C as default};