import{r as e,q as m,j as o}from"./page-Z5sU5TGy.js";import g from"./google_map-LhCo9IMH.js";import{g as d}from"./user-service-Dh1_6pDc.js";import{g as f}from"./tickets-service-DImta3VT.js";import"./index-DsXjZlsd.js";function E(){const[a,i]=e.useState([]),[n,r]=e.useState({}),{url:c}=m(),[l,p]=e.useState(!0);return e.useEffect(()=>{async function t(){const s=await d(4),u=await f(c.split("/")[3]);r(u),i(s.data),p(!1)}t()},[]),o.jsx("div",{children:a.length!==0&&!l&&o.jsx(g,{ascs:a.map((t,s)=>({id:t.id,lng:parseFloat(t.longitude),lat:parseFloat(t.latitude),name:t.name,...t})),ticket:n})})}export{E as default};