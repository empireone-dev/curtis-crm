import{r as n,j as a}from"./store-CorJ7S5Q.js";import{u,a as h}from"./app-BnP4xpFn.js";import{h as i}from"./moment-Cl4UOzQZ.js";import{d as m,D as M}from"./index-DOHYejMa.js";import"./compact-item-PVVCWA33.js";import"./useIcons-BewCVoPt.js";import"./index-B0_OPhdT.js";import"./index-DBarEtnf.js";import"./roundedArrow-Dpf_COos.js";import"./button-Bob1Tl1g.js";import"./index-CNpigZnu.js";import"./reactNode-3bav4zo4.js";function C(){const{RangePicker:c}=M,{products:e}=u(t=>t.ticket_form);n.useState(!1),h();const r=new URLSearchParams(window.location.search),d=r.get("start"),l=r.get("end"),[s,Y]=n.useState({start:d??i().format("YYYY-MM-DD"),end:l??i().format("YYYY-MM-DD")}),p=t=>{const f=t[0].format("YYYY-MM-DD"),D=t[1].format("YYYY-MM-DD");Y({...s,start:f,end:D})};e==null||e.slice(2).map(t=>({value:t[1]}));const o="YYYY/MM/DD";return a.jsx("div",{className:"flex gap-4 w-full mb-4",children:a.jsxs("div",{className:"w-full pl-2",children:[a.jsx("p",{children:"Filter by date:"}),a.jsx(c,{defaultValue:[m(s.start,o),m(s.end,o)],onChange:p,size:"large",className:"rounded-md"})]})})}export{C as default};