import{I as M,d as E,g as _,u as N,C as w,f as R,v as U,M as k,N as Q,O as q,P as B,Q as G,U as Y,W as Z,T as P,X as I,Y as J,Z as K,$ as L,k as ee}from"./asyncToGenerator-Dxg2zNf3.js";import{r as a}from"./page-Z5sU5TGy.js";import{t as te,o as re}from"./compact-item-prQ5Ac-Z.js";import{S as A,L as oe,a as ne}from"./index-CPRtfHDI.js";var ae={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"}}]},name:"menu-fold",theme:"outlined"},ie=function(e,r){return a.createElement(M,E({},e,{ref:r,icon:ae}))},je=a.forwardRef(ie),se={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"}}]},name:"menu-unfold",theme:"outlined"},le=function(e,r){return a.createElement(M,E({},e,{ref:r,icon:se}))},Ne=a.forwardRef(le);function ce(t,e,r){return typeof r=="boolean"?r:t.length?!0:te(e).some(n=>n.type===A)}const de=t=>{const{componentCls:e,bodyBg:r,lightSiderBg:o,lightTriggerBg:n,lightTriggerColor:i}=t;return{[`${e}-sider-light`]:{background:o,[`${e}-sider-trigger`]:{color:i,background:n},[`${e}-sider-zero-width-trigger`]:{color:i,background:n,border:`1px solid ${r}`,borderInlineStart:0}}}},ge=t=>{const{antCls:e,componentCls:r,colorText:o,triggerColor:n,footerBg:i,triggerBg:l,headerHeight:c,headerPadding:s,headerColor:u,footerPadding:p,triggerHeight:h,zeroTriggerHeight:x,zeroTriggerWidth:S,motionDurationMid:C,motionDurationSlow:d,fontSize:f,borderRadius:m,bodyBg:O,headerBg:$,siderBg:y}=t;return{[r]:Object.assign(Object.assign({display:"flex",flex:"auto",flexDirection:"column",minHeight:0,background:O,"&, *":{boxSizing:"border-box"},[`&${r}-has-sider`]:{flexDirection:"row",[`> ${r}, > ${r}-content`]:{width:0}},[`${r}-header, &${r}-footer`]:{flex:"0 0 auto"},[`${r}-sider`]:{position:"relative",minWidth:0,background:y,transition:`all ${C}, background 0s`,"&-children":{height:"100%",marginTop:-.1,paddingTop:.1,[`${e}-menu${e}-menu-inline-collapsed`]:{width:"auto"}},"&-has-trigger":{paddingBottom:h},"&-right":{order:1},"&-trigger":{position:"fixed",bottom:0,zIndex:1,height:h,color:n,lineHeight:N(h),textAlign:"center",background:l,cursor:"pointer",transition:`all ${C}`},"&-zero-width":{"> *":{overflow:"hidden"},"&-trigger":{position:"absolute",top:c,insetInlineEnd:t.calc(S).mul(-1).equal(),zIndex:1,width:S,height:x,color:n,fontSize:t.fontSizeXL,display:"flex",alignItems:"center",justifyContent:"center",background:y,borderStartStartRadius:0,borderStartEndRadius:m,borderEndEndRadius:m,borderEndStartRadius:0,cursor:"pointer",transition:`background ${d} ease`,"&::after":{position:"absolute",inset:0,background:"transparent",transition:`all ${d}`,content:'""'},"&:hover::after":{background:"rgba(255, 255, 255, 0.2)"},"&-right":{insetInlineStart:t.calc(S).mul(-1).equal(),borderStartStartRadius:m,borderStartEndRadius:0,borderEndEndRadius:0,borderEndStartRadius:m}}}}},de(t)),{"&-rtl":{direction:"rtl"}}),[`${r}-header`]:{height:c,padding:s,color:u,lineHeight:N(c),background:$,[`${e}-menu`]:{lineHeight:"inherit"}},[`${r}-footer`]:{padding:p,color:o,fontSize:f,background:i},[`${r}-content`]:{flex:"auto",color:o,minHeight:0}}},ue=t=>{const{colorBgLayout:e,controlHeight:r,controlHeightLG:o,colorText:n,controlHeightSM:i,marginXXS:l,colorTextLightSolid:c,colorBgContainer:s}=t,u=o*1.25;return{colorBgHeader:"#001529",colorBgBody:e,colorBgTrigger:"#002140",bodyBg:e,headerBg:"#001529",headerHeight:r*2,headerPadding:`0 ${u}px`,headerColor:n,footerPadding:`${i}px ${u}px`,footerBg:e,siderBg:"#001529",triggerHeight:o+l*2,triggerBg:"#002140",triggerColor:c,zeroTriggerWidth:o,zeroTriggerHeight:o,lightSiderBg:s,lightTriggerBg:s,lightTriggerColor:n}},F=_("Layout",t=>[ge(t)],ue,{deprecatedTokens:[["colorBgBody","bodyBg"],["colorBgHeader","headerBg"],["colorBgTrigger","triggerBg"]]});var X=function(t,e){var r={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(t);n<o.length;n++)e.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(t,o[n])&&(r[o[n]]=t[o[n]]);return r};function z(t){let{suffixCls:e,tagName:r,displayName:o}=t;return n=>a.forwardRef((l,c)=>a.createElement(n,Object.assign({ref:c,suffixCls:e,tagName:r},l)))}const j=a.forwardRef((t,e)=>{const{prefixCls:r,suffixCls:o,className:n,tagName:i}=t,l=X(t,["prefixCls","suffixCls","className","tagName"]),{getPrefixCls:c}=a.useContext(w),s=c("layout",r),[u,p,h]=F(s),x=o?`${s}-${o}`:s;return u(a.createElement(i,Object.assign({className:R(r||x,n,p,h),ref:e},l)))}),he=a.forwardRef((t,e)=>{const{direction:r}=a.useContext(w),[o,n]=a.useState([]),{prefixCls:i,className:l,rootClassName:c,children:s,hasSider:u,tagName:p,style:h}=t,x=X(t,["prefixCls","className","rootClassName","children","hasSider","tagName","style"]),S=re(x,["suffixCls"]),{getPrefixCls:C,layout:d}=a.useContext(w),f=C("layout",i),m=ce(o,s,u),[O,$,y]=F(f),D=R(f,{[`${f}-has-sider`]:m,[`${f}-rtl`]:r==="rtl"},d==null?void 0:d.className,l,c,$,y),V=a.useMemo(()=>({siderHook:{addSider:H=>{n(T=>[].concat(U(T),[H]))},removeSider:H=>{n(T=>T.filter(W=>W!==H))}}}),[]);return O(a.createElement(oe.Provider,{value:V},a.createElement(p,Object.assign({ref:e,className:D,style:Object.assign(Object.assign({},d==null?void 0:d.style),h)},S),s)))}),fe=z({tagName:"div",displayName:"Layout"})(he),me=z({suffixCls:"header",tagName:"header",displayName:"Header"})(j),be=z({suffixCls:"footer",tagName:"footer",displayName:"Footer"})(j),pe=z({suffixCls:"content",tagName:"main",displayName:"Content"})(j),v=fe;v.Header=me;v.Footer=be;v.Content=pe;v.Sider=A;v._InternalSiderContext=ne;const xe=t=>{const e=t!=null&&t.algorithm?k(t.algorithm):k(B),r=Object.assign(Object.assign({},Q),t==null?void 0:t.token);return q(r,{override:t==null?void 0:t.token},e,G)};function Se(t){const{sizeUnit:e,sizeStep:r}=t,o=r-2;return{sizeXXL:e*(o+10),sizeXL:e*(o+6),sizeLG:e*(o+2),sizeMD:e*(o+2),sizeMS:e*(o+1),size:e*o,sizeSM:e*o,sizeXS:e*(o-1),sizeXXS:e*(o-1)}}const ve=(t,e)=>{const r=e??B(t),o=r.fontSizeSM,n=r.controlHeight-4;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},r),Se(e??t)),Y(o)),{controlHeight:n}),Z(Object.assign(Object.assign({},r),{controlHeight:n})))},g=(t,e)=>new P(t).setAlpha(e).toRgbString(),b=(t,e)=>new P(t).lighten(e).toHexString(),Ce=t=>{const e=I(t,{theme:"dark"});return{1:e[0],2:e[1],3:e[2],4:e[3],5:e[6],6:e[5],7:e[4],8:e[6],9:e[5],10:e[4]}},ye=(t,e)=>{const r=t||"#000",o=e||"#fff";return{colorBgBase:r,colorTextBase:o,colorText:g(o,.85),colorTextSecondary:g(o,.65),colorTextTertiary:g(o,.45),colorTextQuaternary:g(o,.25),colorFill:g(o,.18),colorFillSecondary:g(o,.12),colorFillTertiary:g(o,.08),colorFillQuaternary:g(o,.04),colorBgElevated:b(r,12),colorBgContainer:b(r,8),colorBgLayout:b(r,0),colorBgSpotlight:b(r,26),colorBgBlur:g(o,.04),colorBorder:b(r,26),colorBorderSecondary:b(r,19)}},Be=(t,e)=>{const r=Object.keys(J).map(n=>{const i=I(t[n],{theme:"dark"});return new Array(10).fill(1).reduce((l,c,s)=>(l[`${n}-${s+1}`]=i[s],l[`${n}${s+1}`]=i[s],l),{})}).reduce((n,i)=>(n=Object.assign(Object.assign({},n),i),n),{}),o=e??B(t);return Object.assign(Object.assign(Object.assign({},o),r),K(t,{generateColorPalettes:Ce,generateNeutralColorPalettes:ye}))};function ze(){const[t,e,r]=ee();return{theme:t,token:e,hashId:r}}const ke={defaultConfig:L,defaultSeed:L.token,useToken:ze,defaultAlgorithm:B,darkAlgorithm:Be,compactAlgorithm:ve,getDesignToken:xe};function Oe({title:t,titleId:e,...r},o){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":e},r),t?a.createElement("title",{id:e},t):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"}))}const Le=a.forwardRef(Oe);export{Le as F,v as L,Ne as R,je as a,ke as t};