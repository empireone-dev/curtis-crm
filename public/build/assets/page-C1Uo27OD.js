import{j as i}from"./store-0Qzhg5Cj.js";import e from"./layout-B0sErmzK.js";import{h as s}from"./moment-Cl4UOzQZ.js";import{u as p}from"./app-BmrOdLk6.js";import a from"./direct-emails-list-section-Bzlk8eq0.js";import{C as l}from"./Collapse-DY78WzLE.js";import"./administrator-layout-B_qUZ8hy.js";import"./layout-sidebar-list-component-DETqAzue.js";import"./HomeIcon-C3BwTxg_.js";import"./UserGroupIcon-Brmk4c63.js";import"./InboxArrowDownIcon-2zAIB-FQ.js";import"./TicketIcon-CgVaVJId.js";import"./WrenchScrewdriverIcon-CZB59w-G.js";import"./UserCircleIcon-Dz3ICLio.js";import"./search-ticket-section-DGOCT_0M.js";import"./modal-BB8Ob1Bx.js";import"./transition-BQz_x7pe.js";import"./dialog-B3BbVgJi.js";import"./tickets-service-D5k9ViTr.js";import"./Cog8ToothIcon-DeTWQvzS.js";import"./user-service-DYAUPOyE.js";import"./skeleton-glDySAOC.js";import"./users-cases-pagination-section-Xc7ox5CH.js";import"./Pagination-B0j-Yd1-.js";import"./compact-item-oV-Lk8KN.js";import"./useForceUpdate-BKtlzFRE.js";import"./index-Bmfma0B6.js";import"./motion-L0wigdRl.js";import"./index-o1qQifpu.js";import"./index-BuJ3FBA6.js";import"./reactNode-DWH_taMQ.js";import"./collapse-C1MjllT7.js";function J(){const{tickets:m}=p(t=>t.customer_tickets);return i.jsx(e,{children:i.jsx("div",{className:"mx-3",children:i.jsx(l,{accordion:!0,items:m.map((t,r)=>({key:r,label:i.jsxs("div",{className:"flex justify-between items-center",children:[i.jsx("div",{children:t.emails[0].emails[0].from}),i.jsx("div",{children:s(t.emails[0].emails[0].date).format("LLL")})]}),children:t.emails[0].emails.map(o=>i.jsx(a,{data:o}))}))})})})}export{J as default};