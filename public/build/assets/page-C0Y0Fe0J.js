import{r as e,q as m,j as o}from"./page-BdFAeS7-.js";import g from"./google_map-BqX9Yuze.js";import{g as d}from"./user-service-CKXjk3KL.js";import{g as f}from"./tickets-service-CG_MJ_mA.js";import"./index-DuM2TwmN.js";function E(){const[a,i]=e.useState([]),[n,r]=e.useState({}),{url:c}=m(),[l,p]=e.useState(!0);return e.useEffect(()=>{async function t(){const s=await d(4),u=await f(c.split("/")[3]);r(u),i(s.data),p(!1)}t()},[]),o.jsx("div",{children:a.length!==0&&!l&&o.jsx(g,{ascs:a.map((t,s)=>({id:t.id,lng:parseFloat(t.longitude),lat:parseFloat(t.latitude),name:t.name,...t})),ticket:n})})}export{E as default};