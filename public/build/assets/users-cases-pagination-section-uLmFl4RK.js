import{j as o,y as n}from"./store-0Qzhg5Cj.js";import{u as r}from"./app-D3sSVce1.js";import{P as s}from"./Pagination-B0j-Yd1-.js";import"./compact-item-oV-Lk8KN.js";import"./useForceUpdate-BKtlzFRE.js";import"./index-Bmfma0B6.js";import"./motion-L0wigdRl.js";import"./index-o1qQifpu.js";import"./index-BuJ3FBA6.js";function h(){const{tickets:i}=r(t=>t.customer_tickets);function e(t){n.visit(window.location.pathname+"?page="+t)}return o.jsx("div",{children:o.jsx(s,{defaultCurrent:window.location.search.substring(1),onChange:e,showSizeChanger:!1,total:i.count})})}export{h as default};