import{r as a,s as i,j as o}from"./page-BdFAeS7-.js";import e from"./availability-section-BTT2F68p.js";import{b as c}from"./tickets-thunk-CpCajy8h.js";import{g as n}from"./email-template-thunk-D2dNCWoF.js";import{A as u}from"./administrator-layout-BotrYkh7.js";import f from"./ticket-content-layout-DvFS7_m3.js";import{W as l}from"./warehouse-layout-AzTT53sq.js";import{A as y}from"./asc-layout-bUS5YGfd.js";import{A as _}from"./agent-layout-CmOmF0Ka.js";import{C as d}from"./curtis-layout-IMztnDAE.js";import{u as A}from"./app-DE6fY-jh.js";import"./select-Q3JaeTHu.js";import"./textarea-CDgwe2ne.js";import"./wysiwyg-CFjjKcyk.js";import"./page-7sUH4cVx.js";import"./index-DuM2TwmN.js";import"./email-template-service-D86EYb18.js";import"./loading-DmFaRxux.js";import"./routing-BzgBYGmF.js";import"./QueueListIcon-D6wBLUE6.js";import"./tickets-service-CG_MJ_mA.js";import"./internals-service-B9kSbxh_.js";import"./layout-sidebar-list-component-DChnmDbG.js";import"./HomeIcon-CrUssxCB.js";import"./UserGroupIcon-DWNBGxpB.js";import"./InboxArrowDownIcon-BSFMzx2I.js";import"./TicketIcon-C5s-72Hy.js";import"./WrenchScrewdriverIcon-DJwK49IG.js";import"./UserCircleIcon-CRBd1ItS.js";import"./search-ticket-section-CyRq0zJt.js";import"./modal-BxzSCEOn.js";import"./transition-Di7Z8CQp.js";import"./dialog-CA6tNbqZ.js";import"./user-service-CKXjk3KL.js";import"./customer-tickets-thunk-BcMhuAZO.js";import"./files-service-CwlBcPCV.js";import"./skeleton-Bs5rH2aZ.js";import"./tickets-details-move-assign-section_-9kcRdnAa.js";import"./tickets-details-move-assign-components-B_SW0m8D.js";import"./InboxStackIcon-WOtcoWmE.js";import"./CheckBadgeIcon-BF0fBTIk.js";import"./ArrowsRightLeftIcon-Dy9-RrFy.js";import"./Cog8ToothIcon-BsRGZNnN.js";import"./EnvelopeIcon-jIi04Gqy.js";function et({auth:r}){const{ticket:m}=A(s=>s.tickets);a.useEffect(()=>{i.dispatch(c()),i.dispatch(n())},[m]);const t=r.user.role_id,p=t==1?u:t==3?l:t==4?y:t==5?_:d;return o.jsx(p,{account:r.user,children:o.jsx(f,{children:o.jsx(e,{})})})}export{et as default};