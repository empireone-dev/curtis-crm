import{r as o,j as e,y as r}from"./page-B_FNLrKI.js";import{w as y,p as S}from"./initial-templates-PKQd-G1K.js";import{m as T}from"./tickets-service-BgYWgIIT.js";import{u as v}from"./app-CcF4oVWF.js";import{M as x}from"./index-xPH5unN6.js";import{S as C}from"./index-CN9WdgV4.js";import"./index-DabsQ7f6.js";import"./asyncToGenerator-DYUyOi83.js";import"./render-DFTnvfjc.js";import"./CheckCircleFilled-B1vPqam2.js";import"./pickAttrs-Dct9vqKx.js";import"./InfoCircleFilled-DTKblXpS.js";import"./useZIndex-DEasTsYa.js";import"./motion-DJ7hMwu8.js";import"./button-CDM6RDM6.js";import"./compact-item-CFEgdXJP.js";import"./index-CGX2b0Vx.js";import"./index-BEUi5bVi.js";import"./KeyCode-DNlgD2sM.js";import"./fade-BgjB0psG.js";import"./zoom-DaP9kBAw.js";import"./useClosable-Cbgjb4lL.js";import"./useIcons-BTOtFulL.js";import"./useLocale-CdzdcKtH.js";import"./Overflow-DCcGbOmj.js";function J(){const[n,a]=o.useState(!1),[l,p]=o.useState(!1),{ticket:t}=v(s=>s.tickets),[i,c]=o.useState(""),m=()=>{a(!0)},u=y(t),d=S(t);async function f(){p(!0),await T({ticket_id:t.id,call_type:i,body:i=="Parts"?d:u,subject:t.ticket_id,recipient:t.email}),i=="TS-Tech Support"?r.visit("status"):r.visit("files")}const h=()=>{a(!1)},g=s=>{c(s),console.log(`selected ${s}`)};return e.jsxs("div",{children:[e.jsx("button",{onClick:m,className:"bg-green-500 p-2 text-white  hover:bg-green-600  w-48",children:e.jsx("div",{className:"p-1 w-full flex items-center justify-center",children:"MOVE TICKET"})}),e.jsx(x,{confirmLoading:l,title:"Move Ticket Assignment",open:n,onOk:f,onCancel:h,children:e.jsx(C,{className:"w-full",defaultValue:i,onChange:g,options:[{value:"CF-Warranty Claim",label:"CF-Warranty Claim"},{value:"Parts",label:"Parts"},{value:"TS-Tech Support",label:"TS-Tech Support"}]})})]})}export{J as default};