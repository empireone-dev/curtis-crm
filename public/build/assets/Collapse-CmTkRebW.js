import{o as b,r as M}from"./page-B_FNLrKI.js";import{R as U}from"./RightOutlined-CFCzjVj5.js";import{p as X,k as B,i as O,o as V,d as T,s as Y,t as Z,c as ee,v as ne,C as W,g as ae,m as te,u as R,r as oe,x as re}from"./asyncToGenerator-DYUyOi83.js";import{u as le}from"./index-BEUi5bVi.js";import{t as q,b as ie,o as G}from"./compact-item-CFEgdXJP.js";import{K as L}from"./KeyCode-DNlgD2sM.js";import{p as ce}from"./pickAttrs-Dct9vqKx.js";import{i as se}from"./motion-DJ7hMwu8.js";import{c as D}from"./button-CDM6RDM6.js";import{b as de}from"./index-DCufCK--.js";var F=b.forwardRef(function(n,e){var a=n.prefixCls,t=n.forceRender,o=n.className,m=n.style,p=n.children,i=n.isActive,g=n.role,r=b.useState(i||t),C=X(r,2),c=C[0],u=C[1];return b.useEffect(function(){(t||i)&&u(!0)},[t,i]),c?b.createElement("div",{ref:e,className:B("".concat(a,"-content"),O(O({},"".concat(a,"-content-active"),i),"".concat(a,"-content-inactive"),!i),o),style:m,role:g},b.createElement("div",{className:"".concat(a,"-content-box")},p)):null});F.displayName="PanelContent";var me=["showArrow","headerClass","isActive","onItemClick","forceRender","className","prefixCls","collapsible","accordion","panelKey","extra","header","expandIcon","openMotion","destroyInactivePanel","children"],J=b.forwardRef(function(n,e){var a=n.showArrow,t=a===void 0?!0:a,o=n.headerClass,m=n.isActive,p=n.onItemClick,i=n.forceRender,g=n.className,r=n.prefixCls,C=n.collapsible,c=n.accordion,u=n.panelKey,d=n.extra,w=n.header,h=n.expandIcon,l=n.openMotion,$=n.destroyInactivePanel,y=n.children,I=V(n,me),s=C==="disabled",P=C==="header",v=C==="icon",k=d!=null&&typeof d!="boolean",x=function(){p==null||p(u)},S=function(_){(_.key==="Enter"||_.keyCode===L.ENTER||_.which===L.ENTER)&&x()},A=typeof h=="function"?h(n):b.createElement("i",{className:"arrow"});A&&(A=b.createElement("div",{className:"".concat(r,"-expand-icon"),onClick:["header","icon"].includes(C)?x:void 0},A));var f=B(O(O(O({},"".concat(r,"-item"),!0),"".concat(r,"-item-active"),m),"".concat(r,"-item-disabled"),s),g),N=B(o,O(O(O({},"".concat(r,"-header"),!0),"".concat(r,"-header-collapsible-only"),P),"".concat(r,"-icon-collapsible-only"),v)),E={className:N,"aria-expanded":m,"aria-disabled":s,onKeyDown:S};return!P&&!v&&(E.onClick=x,E.role=c?"tab":"button",E.tabIndex=s?-1:0),b.createElement("div",T({},I,{ref:e,className:f}),b.createElement("div",E,t&&A,b.createElement("span",{className:"".concat(r,"-header-text"),onClick:C==="header"?x:void 0},w),k&&b.createElement("div",{className:"".concat(r,"-extra")},d)),b.createElement(Y,T({visible:m,leavedClassName:"".concat(r,"-content-hidden")},l,{forceRender:i,removeOnLeave:$}),function(K,_){var H=K.className,j=K.style;return b.createElement(F,{ref:_,prefixCls:r,className:H,style:j,isActive:m,forceRender:i,role:c?"tabpanel":void 0},y)}))}),ue=["children","label","key","collapsible","onItemClick","destroyInactivePanel"],ve=function(e,a){var t=a.prefixCls,o=a.accordion,m=a.collapsible,p=a.destroyInactivePanel,i=a.onItemClick,g=a.activeKey,r=a.openMotion,C=a.expandIcon;return e.map(function(c,u){var d=c.children,w=c.label,h=c.key,l=c.collapsible,$=c.onItemClick,y=c.destroyInactivePanel,I=V(c,ue),s=String(h??u),P=l??m,v=y??p,k=function(A){P!=="disabled"&&(i(A),$==null||$(A))},x=!1;return o?x=g[0]===s:x=g.indexOf(s)>-1,b.createElement(J,T({},I,{prefixCls:t,key:s,panelKey:s,isActive:x,accordion:o,openMotion:r,expandIcon:C,header:w,collapsible:P,onItemClick:k,destroyInactivePanel:v}),d)})},fe=function(e,a,t){if(!e)return null;var o=t.prefixCls,m=t.accordion,p=t.collapsible,i=t.destroyInactivePanel,g=t.onItemClick,r=t.activeKey,C=t.openMotion,c=t.expandIcon,u=e.key||String(a),d=e.props,w=d.header,h=d.headerClass,l=d.destroyInactivePanel,$=d.collapsible,y=d.onItemClick,I=!1;m?I=r[0]===u:I=r.indexOf(u)>-1;var s=$??p,P=function(x){s!=="disabled"&&(g(x),y==null||y(x))},v={key:u,panelKey:u,header:w,headerClass:h,isActive:I,prefixCls:o,destroyInactivePanel:l??i,openMotion:C,accordion:m,children:e.props.children,onItemClick:P,expandIcon:c,collapsible:s};return typeof e.type=="string"?e:(Object.keys(v).forEach(function(k){typeof v[k]>"u"&&delete v[k]}),b.cloneElement(e,v))};function pe(n,e,a){return Array.isArray(n)?ve(n,a):q(e).map(function(t,o){return fe(t,o,a)})}function ge(n){var e=n;if(!Array.isArray(e)){var a=ee(e);e=a==="number"||a==="string"?[e]:[]}return e.map(function(t){return String(t)})}var Ce=b.forwardRef(function(n,e){var a=n.prefixCls,t=a===void 0?"rc-collapse":a,o=n.destroyInactivePanel,m=o===void 0?!1:o,p=n.style,i=n.accordion,g=n.className,r=n.children,C=n.collapsible,c=n.openMotion,u=n.expandIcon,d=n.activeKey,w=n.defaultActiveKey,h=n.onChange,l=n.items,$=B(t,g),y=le([],{value:d,onChange:function(S){return h==null?void 0:h(S)},defaultValue:w,postState:ge}),I=X(y,2),s=I[0],P=I[1],v=function(S){return P(function(){if(i)return s[0]===S?[]:[S];var A=s.indexOf(S),f=A>-1;return f?s.filter(function(N){return N!==S}):[].concat(ne(s),[S])})};Z(!r,"[rc-collapse] `children` will be removed in next major version. Please use `items` instead.");var k=pe(l,r,{prefixCls:t,accordion:i,openMotion:c,expandIcon:u,collapsible:C,destroyInactivePanel:m,onItemClick:v,activeKey:s});return b.createElement("div",T({ref:e,className:$,style:p,role:i?"tablist":void 0},ce(n,{aria:!0,data:!0})),k)});const z=Object.assign(Ce,{Panel:J});z.Panel;const be=M.forwardRef((n,e)=>{const{getPrefixCls:a}=M.useContext(W),{prefixCls:t,className:o,showArrow:m=!0}=n,p=a("collapse",t),i=B({[`${p}-no-arrow`]:!m},o);return M.createElement(z.Panel,Object.assign({ref:e},n,{prefixCls:p,className:i}))}),he=be,xe=n=>{const{componentCls:e,contentBg:a,padding:t,headerBg:o,headerPadding:m,collapseHeaderPaddingSM:p,collapseHeaderPaddingLG:i,collapsePanelBorderRadius:g,lineWidth:r,lineType:C,colorBorder:c,colorText:u,colorTextHeading:d,colorTextDisabled:w,fontSizeLG:h,lineHeight:l,lineHeightLG:$,marginSM:y,paddingSM:I,paddingLG:s,paddingXS:P,motionDurationSlow:v,fontSizeIcon:k,contentPadding:x,fontHeight:S,fontHeightLG:A}=n,f=`${R(r)} ${C} ${c}`;return{[e]:Object.assign(Object.assign({},oe(n)),{backgroundColor:o,border:f,borderRadius:g,"&-rtl":{direction:"rtl"},[`& > ${e}-item`]:{borderBottom:f,"&:last-child":{[`
            &,
            & > ${e}-header`]:{borderRadius:`0 0 ${R(g)} ${R(g)}`}},[`> ${e}-header`]:{position:"relative",display:"flex",flexWrap:"nowrap",alignItems:"flex-start",padding:m,color:d,lineHeight:l,cursor:"pointer",transition:`all ${v}, visibility 0s`,[`> ${e}-header-text`]:{flex:"auto"},"&:focus":{outline:"none"},[`${e}-expand-icon`]:{height:S,display:"flex",alignItems:"center",paddingInlineEnd:y},[`${e}-arrow`]:Object.assign(Object.assign({},re()),{fontSize:k,transition:`transform ${v}`,svg:{transition:`transform ${v}`}}),[`${e}-header-text`]:{marginInlineEnd:"auto"}},[`${e}-icon-collapsible-only`]:{cursor:"unset",[`${e}-expand-icon`]:{cursor:"pointer"}}},[`${e}-content`]:{color:u,backgroundColor:a,borderTop:f,[`& > ${e}-content-box`]:{padding:x},"&-hidden":{display:"none"}},"&-small":{[`> ${e}-item`]:{[`> ${e}-header`]:{padding:p,paddingInlineStart:P,[`> ${e}-expand-icon`]:{marginInlineStart:n.calc(I).sub(P).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:I}}},"&-large":{[`> ${e}-item`]:{fontSize:h,lineHeight:$,[`> ${e}-header`]:{padding:i,paddingInlineStart:t,[`> ${e}-expand-icon`]:{height:A,marginInlineStart:n.calc(s).sub(t).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:s}}},[`${e}-item:last-child`]:{borderBottom:0,[`> ${e}-content`]:{borderRadius:`0 0 ${R(g)} ${R(g)}`}},[`& ${e}-item-disabled > ${e}-header`]:{"\n          &,\n          & > .arrow\n        ":{color:w,cursor:"not-allowed"}},[`&${e}-icon-position-end`]:{[`& > ${e}-item`]:{[`> ${e}-header`]:{[`${e}-expand-icon`]:{order:1,paddingInlineEnd:0,paddingInlineStart:y}}}}})}},ye=n=>{const{componentCls:e}=n,a=`> ${e}-item > ${e}-header ${e}-arrow`;return{[`${e}-rtl`]:{[a]:{transform:"rotate(180deg)"}}}},$e=n=>{const{componentCls:e,headerBg:a,paddingXXS:t,colorBorder:o}=n;return{[`${e}-borderless`]:{backgroundColor:a,border:0,[`> ${e}-item`]:{borderBottom:`1px solid ${o}`},[`
        > ${e}-item:last-child,
        > ${e}-item:last-child ${e}-header
      `]:{borderRadius:0},[`> ${e}-item:last-child`]:{borderBottom:0},[`> ${e}-item > ${e}-content`]:{backgroundColor:"transparent",borderTop:0},[`> ${e}-item > ${e}-content > ${e}-content-box`]:{paddingTop:t}}}},Ie=n=>{const{componentCls:e,paddingSM:a}=n;return{[`${e}-ghost`]:{backgroundColor:"transparent",border:0,[`> ${e}-item`]:{borderBottom:0,[`> ${e}-content`]:{backgroundColor:"transparent",border:0,[`> ${e}-content-box`]:{paddingBlock:a}}}}}},Pe=n=>({headerPadding:`${n.paddingSM}px ${n.padding}px`,headerBg:n.colorFillAlter,contentPadding:`${n.padding}px 16px`,contentBg:n.colorBgContainer}),Se=ae("Collapse",n=>{const e=te(n,{collapseHeaderPaddingSM:`${R(n.paddingXS)} ${R(n.paddingSM)}`,collapseHeaderPaddingLG:`${R(n.padding)} ${R(n.paddingLG)}`,collapsePanelBorderRadius:n.borderRadiusLG});return[xe(e),$e(e),Ie(e),ye(e),de(e)]},Pe),Ne=M.forwardRef((n,e)=>{const{getPrefixCls:a,direction:t,collapse:o}=M.useContext(W),{prefixCls:m,className:p,rootClassName:i,style:g,bordered:r=!0,ghost:C,size:c,expandIconPosition:u="start",children:d,expandIcon:w}=n,h=ie(f=>{var N;return(N=c??f)!==null&&N!==void 0?N:"middle"}),l=a("collapse",m),$=a(),[y,I,s]=Se(l),P=M.useMemo(()=>u==="left"?"start":u==="right"?"end":u,[u]),v=w??(o==null?void 0:o.expandIcon),k=M.useCallback(function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const N=typeof v=="function"?v(f):M.createElement(U,{rotate:f.isActive?90:void 0});return D(N,()=>{var E;return{className:B((E=N==null?void 0:N.props)===null||E===void 0?void 0:E.className,`${l}-arrow`)}})},[v,l]),x=B(`${l}-icon-position-${P}`,{[`${l}-borderless`]:!r,[`${l}-rtl`]:t==="rtl",[`${l}-ghost`]:!!C,[`${l}-${h}`]:h!=="middle"},o==null?void 0:o.className,p,i,I,s),S=Object.assign(Object.assign({},se($)),{motionAppear:!1,leavedClassName:`${l}-content-hidden`}),A=M.useMemo(()=>d?q(d).map((f,N)=>{var E,K;if(!((E=f.props)===null||E===void 0)&&E.disabled){const _=(K=f.key)!==null&&K!==void 0?K:String(N),{disabled:H,collapsible:j}=f.props,Q=Object.assign(Object.assign({},G(f.props,["disabled"])),{key:_,collapsible:j??(H?"disabled":void 0)});return D(f,Q)}return f}):null,[d]);return y(M.createElement(z,Object.assign({ref:e,openMotion:S},G(n,["rootClassName"]),{expandIcon:k,prefixCls:l,className:x,style:Object.assign(Object.assign({},o==null?void 0:o.style),g)}),A))}),je=Object.assign(Ne,{Panel:he});export{je as C};