import{I as He,e as R,q as P,h as fe,_ as M,A as Je,s as g,B as Ze,E as et}from"./asyncToGenerator-CaN3ZOWd.js";import{r as n,G as tt}from"./page-Z5sU5TGy.js";import{K as m}from"./useZIndex-D7WMXbQk.js";import{i as Ie,R as Ce}from"./index-Bxi7iSBX.js";import{r as nt}from"./index-DsXjZlsd.js";var rt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"},at=function(i,f){return n.createElement(He,R({},i,{ref:f,icon:rt}))},At=n.forwardRef(at);const it=new m("antMoveDownIn",{"0%":{transform:"translate3d(0, 100%, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),st=new m("antMoveDownOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(0, 100%, 0)",transformOrigin:"0 0",opacity:0}}),ot=new m("antMoveLeftIn",{"0%":{transform:"translate3d(-100%, 0, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),ft=new m("antMoveLeftOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(-100%, 0, 0)",transformOrigin:"0 0",opacity:0}}),lt=new m("antMoveRightIn",{"0%":{transform:"translate3d(100%, 0, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),mt=new m("antMoveRightOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(100%, 0, 0)",transformOrigin:"0 0",opacity:0}}),ct=new m("antMoveUpIn",{"0%":{transform:"translate3d(0, -100%, 0)",transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),ut=new m("antMoveUpOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(0, -100%, 0)",transformOrigin:"0 0",opacity:0}}),dt={"move-up":{inKeyframes:ct,outKeyframes:ut},"move-down":{inKeyframes:it,outKeyframes:st},"move-left":{inKeyframes:ot,outKeyframes:ft},"move-right":{inKeyframes:lt,outKeyframes:mt}},Xt=(e,i)=>{const{antCls:f}=e,a=`${f}-${i}`,{inKeyframes:l,outKeyframes:s}=dt[i];return[Ie(a,l,s,e.motionDurationMid),{[`
        ${a}-enter,
        ${a}-appear
      `]:{opacity:0,animationTimingFunction:e.motionEaseOutCirc},[`${a}-leave`]:{animationTimingFunction:e.motionEaseInOutCirc}}]},vt=new m("antSlideUpIn",{"0%":{transform:"scaleY(0.8)",transformOrigin:"0% 0%",opacity:0},"100%":{transform:"scaleY(1)",transformOrigin:"0% 0%",opacity:1}}),yt=new m("antSlideUpOut",{"0%":{transform:"scaleY(1)",transformOrigin:"0% 0%",opacity:1},"100%":{transform:"scaleY(0.8)",transformOrigin:"0% 0%",opacity:0}}),pt=new m("antSlideDownIn",{"0%":{transform:"scaleY(0.8)",transformOrigin:"100% 100%",opacity:0},"100%":{transform:"scaleY(1)",transformOrigin:"100% 100%",opacity:1}}),gt=new m("antSlideDownOut",{"0%":{transform:"scaleY(1)",transformOrigin:"100% 100%",opacity:1},"100%":{transform:"scaleY(0.8)",transformOrigin:"100% 100%",opacity:0}}),Ot=new m("antSlideLeftIn",{"0%":{transform:"scaleX(0.8)",transformOrigin:"0% 0%",opacity:0},"100%":{transform:"scaleX(1)",transformOrigin:"0% 0%",opacity:1}}),wt=new m("antSlideLeftOut",{"0%":{transform:"scaleX(1)",transformOrigin:"0% 0%",opacity:1},"100%":{transform:"scaleX(0.8)",transformOrigin:"0% 0%",opacity:0}}),Rt=new m("antSlideRightIn",{"0%":{transform:"scaleX(0.8)",transformOrigin:"100% 0%",opacity:0},"100%":{transform:"scaleX(1)",transformOrigin:"100% 0%",opacity:1}}),ht=new m("antSlideRightOut",{"0%":{transform:"scaleX(1)",transformOrigin:"100% 0%",opacity:1},"100%":{transform:"scaleX(0.8)",transformOrigin:"100% 0%",opacity:0}}),St={"slide-up":{inKeyframes:vt,outKeyframes:yt},"slide-down":{inKeyframes:pt,outKeyframes:gt},"slide-left":{inKeyframes:Ot,outKeyframes:wt},"slide-right":{inKeyframes:Rt,outKeyframes:ht}},Ft=(e,i)=>{const{antCls:f}=e,a=`${f}-${i}`,{inKeyframes:l,outKeyframes:s}=St[i];return[Ie(a,l,s,e.motionDurationMid),{[`
      ${a}-enter,
      ${a}-appear
    `]:{transform:"scale(0)",transformOrigin:"0% 0%",opacity:0,animationTimingFunction:e.motionEaseOutQuint,"&-prepare":{transform:"scale(1)"}},[`${a}-leave`]:{animationTimingFunction:e.motionEaseInQuint}}]};var Et=["prefixCls","invalidate","item","renderItem","responsive","responsiveDisabled","registerSize","itemKey","className","style","children","display","order","component"],K=void 0;function It(e,i){var f=e.prefixCls,a=e.invalidate,l=e.item,s=e.renderItem,c=e.responsive,O=e.responsiveDisabled,d=e.registerSize,I=e.itemKey,C=e.className,k=e.style,q=e.children,H=e.display,v=e.order,W=e.component,b=W===void 0?"div":W,x=P(e,Et),y=c&&!H;function L(w){d(I,w)}n.useEffect(function(){return function(){L(null)}},[]);var J=s&&l!==K?s(l):q,_;a||(_={opacity:y?0:1,height:y?0:K,overflowY:y?"hidden":K,order:c?v:K,pointerEvents:y?"none":K,position:y?"absolute":K});var A={};y&&(A["aria-hidden"]=!0);var h=n.createElement(b,R({className:fe(!a&&f,C),style:M(M({},_),k)},A,x,{ref:i}),J);return c&&(h=n.createElement(Ce,{onResize:function(Z){var X=Z.offsetWidth;L(X)},disabled:O},h)),h}var U=n.forwardRef(It);U.displayName="Item";function Ct(e){if(typeof MessageChannel>"u")Je(e);else{var i=new MessageChannel;i.port1.onmessage=function(){return e()},i.port2.postMessage(void 0)}}function _t(){var e=n.useRef(null),i=function(a){e.current||(e.current=[],Ct(function(){nt.unstable_batchedUpdates(function(){e.current.forEach(function(l){l()}),e.current=null})})),e.current.push(a)};return i}function z(e,i){var f=n.useState(i),a=g(f,2),l=a[0],s=a[1],c=Ze(function(O){e(function(){s(O)})});return[l,c]}var j=tt.createContext(null),Nt=["component"],Kt=["className"],Mt=["className"],bt=function(i,f){var a=n.useContext(j);if(!a){var l=i.component,s=l===void 0?"div":l,c=P(i,Nt);return n.createElement(s,R({},c,{ref:f}))}var O=a.className,d=P(a,Kt),I=i.className,C=P(i,Mt);return n.createElement(j.Provider,{value:null},n.createElement(U,R({ref:f,className:fe(O,I)},d,C)))},_e=n.forwardRef(bt);_e.displayName="RawItem";var xt=["prefixCls","data","renderItem","renderRawItem","itemKey","itemWidth","ssr","style","className","maxCount","renderRest","renderRawRest","suffix","component","itemComponent","onVisibleChange"],Ne="responsive",Ke="invalidate";function Dt(e){return"+ ".concat(e.length," ...")}function $t(e,i){var f=e.prefixCls,a=f===void 0?"rc-overflow":f,l=e.data,s=l===void 0?[]:l,c=e.renderItem,O=e.renderRawItem,d=e.itemKey,I=e.itemWidth,C=I===void 0?10:I,k=e.ssr,q=e.style,H=e.className,v=e.maxCount,W=e.renderRest,b=e.renderRawRest,x=e.suffix,y=e.component,L=y===void 0?"div":y,J=e.itemComponent,_=e.onVisibleChange,A=P(e,xt),h=k==="full",w=_t(),Z=z(w,null),X=g(Z,2),F=X[0],Me=X[1],S=F||0,be=z(w,new Map),le=g(be,2),me=le[0],xe=le[1],De=z(w,0),ce=g(De,2),$e=ce[0],ze=ce[1],Pe=z(w,0),ue=g(Pe,2),T=ue[0],Ue=ue[1],We=z(w,0),de=g(We,2),Y=de[0],Le=de[1],Ae=n.useState(null),ve=g(Ae,2),ee=ve[0],ye=ve[1],Xe=n.useState(null),pe=g(Xe,2),V=pe[0],Fe=pe[1],N=n.useMemo(function(){return V===null&&h?Number.MAX_SAFE_INTEGER:V||0},[V,F]),Te=n.useState(!1),ge=g(Te,2),Ye=ge[0],Ve=ge[1],te="".concat(a,"-item"),Oe=Math.max($e,T),ne=v===Ne,p=s.length&&ne,we=v===Ke,Be=p||typeof v=="number"&&s.length>v,E=n.useMemo(function(){var t=s;return p?F===null&&h?t=s:t=s.slice(0,Math.min(s.length,S/C)):typeof v=="number"&&(t=s.slice(0,v)),t},[s,C,F,v,p]),re=n.useMemo(function(){return p?s.slice(N+1):s.slice(E.length)},[s,E,p,N]),B=n.useCallback(function(t,r){var o;return typeof d=="function"?d(t):(o=d&&(t==null?void 0:t[d]))!==null&&o!==void 0?o:r},[d]),Ge=n.useCallback(c||function(t){return t},[c]);function G(t,r,o){V===t&&(r===void 0||r===ee)||(Fe(t),o||(Ve(t<s.length-1),_==null||_(t)),r!==void 0&&ye(r))}function je(t,r){Me(r.clientWidth)}function Re(t,r){xe(function(o){var u=new Map(o);return r===null?u.delete(t):u.set(t,r),u})}function Qe(t,r){Ue(r),ze(T)}function ke(t,r){Le(r)}function ae(t){return me.get(B(E[t],t))}et(function(){if(S&&typeof Oe=="number"&&E){var t=Y,r=E.length,o=r-1;if(!r){G(0,null);return}for(var u=0;u<r;u+=1){var $=ae(u);if(h&&($=$||0),$===void 0){G(u-1,void 0,!0);break}if(t+=$,o===0&&t<=S||u===o-1&&t+ae(o)<=S){G(o,null);break}else if(t+Oe>S){G(u-1,t-$-Y+T);break}}x&&ae(0)+Y>S&&ye(null)}},[S,me,T,Y,B,E]);var he=Ye&&!!re.length,Se={};ee!==null&&p&&(Se={position:"absolute",left:ee,top:0});var D={prefixCls:te,responsive:p,component:J,invalidate:we},qe=O?function(t,r){var o=B(t,r);return n.createElement(j.Provider,{key:o,value:M(M({},D),{},{order:r,item:t,itemKey:o,registerSize:Re,display:r<=N})},O(t,r))}:function(t,r){var o=B(t,r);return n.createElement(U,R({},D,{order:r,key:o,item:t,renderItem:Ge,itemKey:o,registerSize:Re,display:r<=N}))},ie,Ee={order:he?N:Number.MAX_SAFE_INTEGER,className:"".concat(te,"-rest"),registerSize:Qe,display:he};if(b)b&&(ie=n.createElement(j.Provider,{value:M(M({},D),Ee)},b(re)));else{var se=W||Dt;ie=n.createElement(U,R({},D,Ee),typeof se=="function"?se(re):se)}var oe=n.createElement(L,R({className:fe(!we&&a,H),style:q,ref:i},A),E.map(qe),Be?ie:null,x&&n.createElement(U,R({},D,{responsive:ne,responsiveDisabled:!p,order:N,className:"".concat(te,"-suffix"),registerSize:ke,display:!0,style:Se}),x));return ne&&(oe=n.createElement(Ce,{onResize:je,disabled:!p},oe)),oe}var Q=n.forwardRef($t);Q.displayName="Overflow";Q.Item=_e;Q.RESPONSIVE=Ne;Q.INVALIDATE=Ke;export{Q as F,At as R,pt as a,yt as b,gt as c,Xt as d,Ft as i,vt as s};