import{G as b,r as M}from"./page-Z5sU5TGy.js";import{R as U}from"./RightOutlined-DL5R8SJO.js";import{s as X,h as B,k as O,q,e as T,x as Y,y as Z,d as ee,z as ne,a as V,g as ae,m as te,u as R,r as oe,o as re}from"./asyncToGenerator-CaN3ZOWd.js";import{u as le}from"./index-Bxi7iSBX.js";import{t as W,a as ie,o as G}from"./compact-item-BNKHHmgc.js";import{K as L}from"./KeyCode-DNlgD2sM.js";import{p as ce}from"./pickAttrs-C18JNuNA.js";import{i as se}from"./motion-4S5rSXvC.js";import{c as D}from"./button-DzgIoOCX.js";import{b as de}from"./index-jPrSxhyu.js";var F=b.forwardRef(function(n,e){var a=n.prefixCls,t=n.forceRender,o=n.className,u=n.style,p=n.children,i=n.isActive,g=n.role,r=b.useState(i||t),C=X(r,2),c=C[0],v=C[1];return b.useEffect(function(){(t||i)&&v(!0)},[t,i]),c?b.createElement("div",{ref:e,className:B("".concat(a,"-content"),O(O({},"".concat(a,"-content-active"),i),"".concat(a,"-content-inactive"),!i),o),style:u,role:g},b.createElement("div",{className:"".concat(a,"-content-box")},p)):null});F.displayName="PanelContent";var me=["showArrow","headerClass","isActive","onItemClick","forceRender","className","prefixCls","collapsible","accordion","panelKey","extra","header","expandIcon","openMotion","destroyInactivePanel","children"],J=b.forwardRef(function(n,e){var a=n.showArrow,t=a===void 0?!0:a,o=n.headerClass,u=n.isActive,p=n.onItemClick,i=n.forceRender,g=n.className,r=n.prefixCls,C=n.collapsible,c=n.accordion,v=n.panelKey,d=n.extra,w=n.header,h=n.expandIcon,l=n.openMotion,$=n.destroyInactivePanel,y=n.children,I=q(n,me),s=C==="disabled",P=C==="header",f=C==="icon",A=d!=null&&typeof d!="boolean",x=function(){p==null||p(v)},S=function(_){(_.key==="Enter"||_.keyCode===L.ENTER||_.which===L.ENTER)&&x()},k=typeof h=="function"?h(n):b.createElement("i",{className:"arrow"});k&&(k=b.createElement("div",{className:"".concat(r,"-expand-icon"),onClick:["header","icon"].includes(C)?x:void 0},k));var m=B(O(O(O({},"".concat(r,"-item"),!0),"".concat(r,"-item-active"),u),"".concat(r,"-item-disabled"),s),g),N=B(o,O(O(O({},"".concat(r,"-header"),!0),"".concat(r,"-header-collapsible-only"),P),"".concat(r,"-icon-collapsible-only"),f)),E={className:N,"aria-expanded":u,"aria-disabled":s,onKeyDown:S};return!P&&!f&&(E.onClick=x,E.role=c?"tab":"button",E.tabIndex=s?-1:0),b.createElement("div",T({},I,{ref:e,className:m}),b.createElement("div",E,t&&k,b.createElement("span",{className:"".concat(r,"-header-text"),onClick:C==="header"?x:void 0},w),A&&b.createElement("div",{className:"".concat(r,"-extra")},d)),b.createElement(Y,T({visible:u,leavedClassName:"".concat(r,"-content-hidden")},l,{forceRender:i,removeOnLeave:$}),function(K,_){var z=K.className,j=K.style;return b.createElement(F,{ref:_,prefixCls:r,className:z,style:j,isActive:u,forceRender:i,role:c?"tabpanel":void 0},y)}))}),ue=["children","label","key","collapsible","onItemClick","destroyInactivePanel"],ve=function(e,a){var t=a.prefixCls,o=a.accordion,u=a.collapsible,p=a.destroyInactivePanel,i=a.onItemClick,g=a.activeKey,r=a.openMotion,C=a.expandIcon;return e.map(function(c,v){var d=c.children,w=c.label,h=c.key,l=c.collapsible,$=c.onItemClick,y=c.destroyInactivePanel,I=q(c,ue),s=String(h??v),P=l??u,f=y??p,A=function(k){P!=="disabled"&&(i(k),$==null||$(k))},x=!1;return o?x=g[0]===s:x=g.indexOf(s)>-1,b.createElement(J,T({},I,{prefixCls:t,key:s,panelKey:s,isActive:x,accordion:o,openMotion:r,expandIcon:C,header:w,collapsible:P,onItemClick:A,destroyInactivePanel:f}),d)})},fe=function(e,a,t){if(!e)return null;var o=t.prefixCls,u=t.accordion,p=t.collapsible,i=t.destroyInactivePanel,g=t.onItemClick,r=t.activeKey,C=t.openMotion,c=t.expandIcon,v=e.key||String(a),d=e.props,w=d.header,h=d.headerClass,l=d.destroyInactivePanel,$=d.collapsible,y=d.onItemClick,I=!1;u?I=r[0]===v:I=r.indexOf(v)>-1;var s=$??p,P=function(x){s!=="disabled"&&(g(x),y==null||y(x))},f={key:v,panelKey:v,header:w,headerClass:h,isActive:I,prefixCls:o,destroyInactivePanel:l??i,openMotion:C,accordion:u,children:e.props.children,onItemClick:P,expandIcon:c,collapsible:s};return typeof e.type=="string"?e:(Object.keys(f).forEach(function(A){typeof f[A]>"u"&&delete f[A]}),b.cloneElement(e,f))};function pe(n,e,a){return Array.isArray(n)?ve(n,a):W(e).map(function(t,o){return fe(t,o,a)})}function ge(n){var e=n;if(!Array.isArray(e)){var a=ee(e);e=a==="number"||a==="string"?[e]:[]}return e.map(function(t){return String(t)})}var Ce=b.forwardRef(function(n,e){var a=n.prefixCls,t=a===void 0?"rc-collapse":a,o=n.destroyInactivePanel,u=o===void 0?!1:o,p=n.style,i=n.accordion,g=n.className,r=n.children,C=n.collapsible,c=n.openMotion,v=n.expandIcon,d=n.activeKey,w=n.defaultActiveKey,h=n.onChange,l=n.items,$=B(t,g),y=le([],{value:d,onChange:function(S){return h==null?void 0:h(S)},defaultValue:w,postState:ge}),I=X(y,2),s=I[0],P=I[1],f=function(S){return P(function(){if(i)return s[0]===S?[]:[S];var k=s.indexOf(S),m=k>-1;return m?s.filter(function(N){return N!==S}):[].concat(ne(s),[S])})};Z(!r,"[rc-collapse] `children` will be removed in next major version. Please use `items` instead.");var A=pe(l,r,{prefixCls:t,accordion:i,openMotion:c,expandIcon:v,collapsible:C,destroyInactivePanel:u,onItemClick:f,activeKey:s});return b.createElement("div",T({ref:e,className:$,style:p,role:i?"tablist":void 0},ce(n,{aria:!0,data:!0})),A)});const H=Object.assign(Ce,{Panel:J});H.Panel;const be=M.forwardRef((n,e)=>{const{getPrefixCls:a}=M.useContext(V),{prefixCls:t,className:o,showArrow:u=!0}=n,p=a("collapse",t),i=B({[`${p}-no-arrow`]:!u},o);return M.createElement(H.Panel,Object.assign({ref:e},n,{prefixCls:p,className:i}))}),he=n=>{const{componentCls:e,contentBg:a,padding:t,headerBg:o,headerPadding:u,collapseHeaderPaddingSM:p,collapseHeaderPaddingLG:i,collapsePanelBorderRadius:g,lineWidth:r,lineType:C,colorBorder:c,colorText:v,colorTextHeading:d,colorTextDisabled:w,fontSizeLG:h,lineHeight:l,lineHeightLG:$,marginSM:y,paddingSM:I,paddingLG:s,paddingXS:P,motionDurationSlow:f,fontSizeIcon:A,contentPadding:x,fontHeight:S,fontHeightLG:k}=n,m=`${R(r)} ${C} ${c}`;return{[e]:Object.assign(Object.assign({},oe(n)),{backgroundColor:o,border:m,borderRadius:g,"&-rtl":{direction:"rtl"},[`& > ${e}-item`]:{borderBottom:m,"&:last-child":{[`
            &,
            & > ${e}-header`]:{borderRadius:`0 0 ${R(g)} ${R(g)}`}},[`> ${e}-header`]:{position:"relative",display:"flex",flexWrap:"nowrap",alignItems:"flex-start",padding:u,color:d,lineHeight:l,cursor:"pointer",transition:`all ${f}, visibility 0s`,[`> ${e}-header-text`]:{flex:"auto"},"&:focus":{outline:"none"},[`${e}-expand-icon`]:{height:S,display:"flex",alignItems:"center",paddingInlineEnd:y},[`${e}-arrow`]:Object.assign(Object.assign({},re()),{fontSize:A,transition:`transform ${f}`,svg:{transition:`transform ${f}`}}),[`${e}-header-text`]:{marginInlineEnd:"auto"}},[`${e}-icon-collapsible-only`]:{cursor:"unset",[`${e}-expand-icon`]:{cursor:"pointer"}}},[`${e}-content`]:{color:v,backgroundColor:a,borderTop:m,[`& > ${e}-content-box`]:{padding:x},"&-hidden":{display:"none"}},"&-small":{[`> ${e}-item`]:{[`> ${e}-header`]:{padding:p,paddingInlineStart:P,[`> ${e}-expand-icon`]:{marginInlineStart:n.calc(I).sub(P).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:I}}},"&-large":{[`> ${e}-item`]:{fontSize:h,lineHeight:$,[`> ${e}-header`]:{padding:i,paddingInlineStart:t,[`> ${e}-expand-icon`]:{height:k,marginInlineStart:n.calc(s).sub(t).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:s}}},[`${e}-item:last-child`]:{borderBottom:0,[`> ${e}-content`]:{borderRadius:`0 0 ${R(g)} ${R(g)}`}},[`& ${e}-item-disabled > ${e}-header`]:{"\n          &,\n          & > .arrow\n        ":{color:w,cursor:"not-allowed"}},[`&${e}-icon-position-end`]:{[`& > ${e}-item`]:{[`> ${e}-header`]:{[`${e}-expand-icon`]:{order:1,paddingInlineEnd:0,paddingInlineStart:y}}}}})}},xe=n=>{const{componentCls:e}=n,a=`> ${e}-item > ${e}-header ${e}-arrow`;return{[`${e}-rtl`]:{[a]:{transform:"rotate(180deg)"}}}},ye=n=>{const{componentCls:e,headerBg:a,paddingXXS:t,colorBorder:o}=n;return{[`${e}-borderless`]:{backgroundColor:a,border:0,[`> ${e}-item`]:{borderBottom:`1px solid ${o}`},[`
        > ${e}-item:last-child,
        > ${e}-item:last-child ${e}-header
      `]:{borderRadius:0},[`> ${e}-item:last-child`]:{borderBottom:0},[`> ${e}-item > ${e}-content`]:{backgroundColor:"transparent",borderTop:0},[`> ${e}-item > ${e}-content > ${e}-content-box`]:{paddingTop:t}}}},$e=n=>{const{componentCls:e,paddingSM:a}=n;return{[`${e}-ghost`]:{backgroundColor:"transparent",border:0,[`> ${e}-item`]:{borderBottom:0,[`> ${e}-content`]:{backgroundColor:"transparent",border:0,[`> ${e}-content-box`]:{paddingBlock:a}}}}}},Ie=n=>({headerPadding:`${n.paddingSM}px ${n.padding}px`,headerBg:n.colorFillAlter,contentPadding:`${n.padding}px 16px`,contentBg:n.colorBgContainer}),Pe=ae("Collapse",n=>{const e=te(n,{collapseHeaderPaddingSM:`${R(n.paddingXS)} ${R(n.paddingSM)}`,collapseHeaderPaddingLG:`${R(n.padding)} ${R(n.paddingLG)}`,collapsePanelBorderRadius:n.borderRadiusLG});return[he(e),ye(e),$e(e),xe(e),de(e)]},Ie),Se=M.forwardRef((n,e)=>{const{getPrefixCls:a,direction:t,collapse:o}=M.useContext(V),{prefixCls:u,className:p,rootClassName:i,style:g,bordered:r=!0,ghost:C,size:c,expandIconPosition:v="start",children:d,expandIcon:w}=n,h=ie(m=>{var N;return(N=c??m)!==null&&N!==void 0?N:"middle"}),l=a("collapse",u),$=a(),[y,I,s]=Pe(l),P=M.useMemo(()=>v==="left"?"start":v==="right"?"end":v,[v]),f=w??(o==null?void 0:o.expandIcon),A=M.useCallback(function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const N=typeof f=="function"?f(m):M.createElement(U,{rotate:m.isActive?90:void 0,"aria-label":m.isActive?"expanded":"collapsed"});return D(N,()=>{var E;return{className:B((E=N==null?void 0:N.props)===null||E===void 0?void 0:E.className,`${l}-arrow`)}})},[f,l]),x=B(`${l}-icon-position-${P}`,{[`${l}-borderless`]:!r,[`${l}-rtl`]:t==="rtl",[`${l}-ghost`]:!!C,[`${l}-${h}`]:h!=="middle"},o==null?void 0:o.className,p,i,I,s),S=Object.assign(Object.assign({},se($)),{motionAppear:!1,leavedClassName:`${l}-content-hidden`}),k=M.useMemo(()=>d?W(d).map((m,N)=>{var E,K;if(!((E=m.props)===null||E===void 0)&&E.disabled){const _=(K=m.key)!==null&&K!==void 0?K:String(N),{disabled:z,collapsible:j}=m.props,Q=Object.assign(Object.assign({},G(m.props,["disabled"])),{key:_,collapsible:j??(z?"disabled":void 0)});return D(m,Q)}return m}):null,[d]);return y(M.createElement(H,Object.assign({ref:e,openMotion:S},G(n,["rootClassName"]),{expandIcon:A,prefixCls:l,className:x,style:Object.assign(Object.assign({},o==null?void 0:o.style),g)}),k))}),Be=Object.assign(Se,{Panel:be});export{Be as C};