import{I as C,e as H,h as E,a as y,V as M,m as $,u as m,o as z,R as N}from"./asyncToGenerator-CaN3ZOWd.js";import{r as o}from"./page-Z5sU5TGy.js";import{V as D}from"./index-Bxi7iSBX.js";import{R as O}from"./useLocale-BQU_ZDLM.js";import{a as P,R as W}from"./pickAttrs-C18JNuNA.js";import{R as _}from"./Overflow-Gg_RUgn7.js";var q={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"}}]},name:"search",theme:"outlined"},L=function(t,i){return o.createElement(C,H({},t,{ref:i,icon:q}))},V=o.forwardRef(L);function Q(e,t,i){return E({[`${e}-status-success`]:t==="success",[`${e}-status-warning`]:t==="warning",[`${e}-status-error`]:t==="error",[`${e}-status-validating`]:t==="validating",[`${e}-has-feedback`]:i})}const Z=(e,t)=>t||e,k=function(e,t){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:void 0;var n,l;const{variant:a,[e]:r}=o.useContext(y),s=o.useContext(D),c=r==null?void 0:r.variant;let d;typeof t<"u"?d=t:i===!1?d="borderless":d=(l=(n=s??c)!==null&&n!==void 0?n:a)!==null&&l!==void 0?l:"outlined";const u=M.includes(d);return[d,u]},B=e=>{const{multipleSelectItemHeight:t,paddingXXS:i,lineWidth:n,INTERNAL_FIXED_ITEM_MARGIN:l}=e,a=e.max(e.calc(i).sub(n).equal(),0),r=e.max(e.calc(a).sub(l).equal(),0);return{basePadding:a,containerPadding:r,itemHeight:m(t),itemLineHeight:m(e.calc(t).sub(e.calc(e.lineWidth).mul(2)).equal())}},A=e=>{const{multipleSelectItemHeight:t,selectHeight:i,lineWidth:n}=e;return e.calc(i).sub(t).div(2).sub(n).equal()},T=e=>{const{componentCls:t,iconCls:i,borderRadiusSM:n,motionDurationSlow:l,paddingXS:a,multipleItemColorDisabled:r,multipleItemBorderColorDisabled:s,colorIcon:c,colorIconHover:d,INTERNAL_FIXED_ITEM_MARGIN:u}=e;return{[`${t}-selection-overflow`]:{position:"relative",display:"flex",flex:"auto",flexWrap:"wrap",maxWidth:"100%","&-item":{flex:"none",alignSelf:"center",maxWidth:"100%",display:"inline-flex"},[`${t}-selection-item`]:{display:"flex",alignSelf:"center",flex:"none",boxSizing:"border-box",maxWidth:"100%",marginBlock:u,borderRadius:n,cursor:"default",transition:`font-size ${l}, line-height ${l}, height ${l}`,marginInlineEnd:e.calc(u).mul(2).equal(),paddingInlineStart:a,paddingInlineEnd:e.calc(a).div(2).equal(),[`${t}-disabled&`]:{color:r,borderColor:s,cursor:"not-allowed"},"&-content":{display:"inline-block",marginInlineEnd:e.calc(a).div(2).equal(),overflow:"hidden",whiteSpace:"pre",textOverflow:"ellipsis"},"&-remove":Object.assign(Object.assign({},z()),{display:"inline-flex",alignItems:"center",color:c,fontWeight:"bold",fontSize:10,lineHeight:"inherit",cursor:"pointer",[`> ${i}`]:{verticalAlign:"-0.2em"},"&:hover":{color:d}})}}}},F=(e,t)=>{const{componentCls:i,INTERNAL_FIXED_ITEM_MARGIN:n}=e,l=`${i}-selection-overflow`,a=e.multipleSelectItemHeight,r=A(e),s=t?`${i}-${t}`:"",c=B(e);return{[`${i}-multiple${s}`]:Object.assign(Object.assign({},T(e)),{[`${i}-selector`]:{display:"flex",flexWrap:"wrap",alignItems:"center",height:"100%",paddingInline:c.basePadding,paddingBlock:c.containerPadding,borderRadius:e.borderRadius,[`${i}-disabled&`]:{background:e.multipleSelectorBgDisabled,cursor:"not-allowed"},"&:after":{display:"inline-block",width:0,margin:`${m(n)} 0`,lineHeight:m(a),visibility:"hidden",content:'"\\a0"'}},[`${i}-selection-item`]:{height:c.itemHeight,lineHeight:m(c.itemLineHeight)},[`${l}-item + ${l}-item`]:{[`${i}-selection-search`]:{marginInlineStart:0}},[`${l}-item-suffix`]:{height:"100%"},[`${i}-selection-search`]:{display:"inline-flex",position:"relative",maxWidth:"100%",marginInlineStart:e.calc(e.inputPaddingHorizontalBase).sub(r).equal(),"\n          &-input,\n          &-mirror\n        ":{height:a,fontFamily:e.fontFamily,lineHeight:m(a),transition:`all ${e.motionDurationSlow}`},"&-input":{width:"100%",minWidth:4.1},"&-mirror":{position:"absolute",top:0,insetInlineStart:0,insetInlineEnd:"auto",zIndex:999,whiteSpace:"pre",visibility:"hidden"}},[`${i}-selection-placeholder`]:{position:"absolute",top:"50%",insetInlineStart:e.inputPaddingHorizontalBase,insetInlineEnd:e.inputPaddingHorizontalBase,transform:"translateY(-50%)",transition:`all ${e.motionDurationSlow}`}})}};function S(e,t){const{componentCls:i}=e,n=t?`${i}-${t}`:"",l={[`${i}-multiple${n}`]:{fontSize:e.fontSize,[`${i}-selector`]:{[`${i}-show-search&`]:{cursor:"text"}},[`
        &${i}-show-arrow ${i}-selector,
        &${i}-allow-clear ${i}-selector
      `]:{paddingInlineEnd:e.calc(e.fontSizeIcon).add(e.controlPaddingHorizontal).equal()}}};return[F(e,t),l]}const ee=e=>{const{componentCls:t}=e,i=$(e,{selectHeight:e.controlHeightSM,multipleSelectItemHeight:e.multipleItemHeightSM,borderRadius:e.borderRadiusSM,borderRadiusSM:e.borderRadiusXS}),n=$(e,{fontSize:e.fontSizeLG,selectHeight:e.controlHeightLG,multipleSelectItemHeight:e.multipleItemHeightLG,borderRadius:e.borderRadiusLG,borderRadiusSM:e.borderRadius});return[S(e),S(i,"sm"),{[`${t}-multiple${t}-sm`]:{[`${t}-selection-placeholder`]:{insetInline:e.calc(e.controlPaddingHorizontalSM).sub(e.lineWidth).equal()},[`${t}-selection-search`]:{marginInlineStart:2}}},S(n,"lg")]};function te(e){let{suffixIcon:t,clearIcon:i,menuItemSelectedIcon:n,removeIcon:l,loading:a,multiple:r,hasFeedback:s,prefixCls:c,showSuffixIcon:d,feedbackIcon:u,showArrow:b,componentName:G}=e;const v=i??o.createElement(P,null),g=I=>t===null&&!s&&!b?null:o.createElement(o.Fragment,null,d!==!1&&I,s&&u);let f=null;if(t!==void 0)f=g(t);else if(a)f=g(o.createElement(N,{spin:!0}));else{const I=`${c}-suffix`;f=x=>{let{open:w,showSearch:R}=x;return g(w&&R?o.createElement(V,{className:I}):o.createElement(_,{className:I}))}}let h=null;n!==void 0?h=n:r?h=o.createElement(O,null):h=null;let p=null;return l!==void 0?p=l:p=o.createElement(W,null),{clearIcon:v,suffixIcon:f,itemIcon:h,removeIcon:p}}export{V as R,te as a,Q as b,Z as c,T as d,B as e,ee as g,k as u};