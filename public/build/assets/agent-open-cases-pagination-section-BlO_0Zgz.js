import{j as n,y as c}from"./page-B_FNLrKI.js";import{u}from"./app-CcF4oVWF.js";import{P as g}from"./Pagination-BkIlxw8l.js";import"./index-DabsQ7f6.js";import"./asyncToGenerator-DYUyOi83.js";import"./RightOutlined-CFCzjVj5.js";import"./index-BEUi5bVi.js";import"./compact-item-CFEgdXJP.js";import"./KeyCode-DNlgD2sM.js";import"./pickAttrs-Dct9vqKx.js";import"./useForceUpdate-CiKgljI7.js";import"./index-CN9WdgV4.js";import"./Overflow-DCcGbOmj.js";import"./useZIndex-DEasTsYa.js";import"./motion-DJ7hMwu8.js";import"./useIcons-BTOtFulL.js";import"./useLocale-CdzdcKtH.js";import"./index--hbNLtlH.js";function A(){const{tickets:o}=u(t=>t.customer_tickets),i=window.location.pathname+window.location.search,a=((t,e)=>new URLSearchParams(t.split("?")[1]).get(e))(i,"page"),s=a?parseInt(a,10):1;function m(t,e){const r=new URLSearchParams(window.location.search);r.set("page",t);const p=window.location.pathname+"?"+r.toString();c.visit(p)}return n.jsx("div",{children:n.jsx(g,{onChange:m,defaultCurrent:s,showSizeChanger:!1,total:(o==null?void 0:o.ticket_count)??0})})}export{A as default};