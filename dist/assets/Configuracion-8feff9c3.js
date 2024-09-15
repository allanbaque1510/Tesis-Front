import{r as f,A as ue,_ as fe,w as ae,f as Re,K as R,g as pe,h as B,i as Me,k as J,C as Le,m as me,n as ze,o as M,p as X,q as E,t as ge,v as He,I as Ge,x as Ae,E as De,R as c,y as qe,z as Ve,D as We,F as Ue,G as Xe,T as ke,H as he,J as Ke,L as Ye,M as Je,N as Qe,b as Ze,j as r,c as ie,d as V,e as re}from"./index-15240922.js";import{U as Y}from"./UtilService-4db337ed.js";import{N as et,u as tt,a as ot,A as nt}from"./context-70b9985a.js";import{F as _,C as z}from"./index-5590f4ee.js";import{s as at,g as it}from"./scrollTo-528c30a2.js";import{B as rt}from"./index-9451a5c1.js";import{a as st,C as H,S as lt}from"./index-6ab464cc.js";import{R as ct}from"./row-5d227883.js";import{A}from"./index-e68c2b59.js";import{I as F}from"./index-bb414d21.js";import"./BaseInput-d53a2d9c.js";var dt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"}}]},name:"file-text",theme:"outlined"};const ut=dt;var ft=function(t,n){return f.createElement(ue,fe({},t,{ref:n,icon:ut}))},pt=f.forwardRef(ft);const be=pt;var mt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"}}]},name:"vertical-align-top",theme:"outlined"};const gt=mt;var ht=function(t,n){return f.createElement(ue,fe({},t,{ref:n,icon:gt}))},bt=f.forwardRef(ht);const xt=bt;function vt(e){let t;const n=a=>()=>{t=null,e.apply(void 0,Re(a))},o=function(){if(t==null){for(var a=arguments.length,i=new Array(a),p=0;p<a;p++)i[p]=arguments[p];t=ae(n(i))}};return o.cancel=()=>{ae.cancel(t),t=null},o}const yt=e=>{const{componentCls:t,notificationMarginEdge:n,animationMaxHeight:o}=e,a=`${t}-notice`,i=new R("antNotificationFadeIn",{"0%":{transform:"translate3d(100%, 0, 0)",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",opacity:1}}),p=new R("antNotificationTopFadeIn",{"0%":{top:-o,opacity:0},"100%":{top:0,opacity:1}}),l=new R("antNotificationBottomFadeIn",{"0%":{bottom:e.calc(o).mul(-1).equal(),opacity:0},"100%":{bottom:0,opacity:1}}),s=new R("antNotificationLeftFadeIn",{"0%":{transform:"translate3d(-100%, 0, 0)",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",opacity:1}});return{[t]:{[`&${t}-top, &${t}-bottom`]:{marginInline:0,[a]:{marginInline:"auto auto"}},[`&${t}-top`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:p}},[`&${t}-bottom`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:l}},[`&${t}-topRight, &${t}-bottomRight`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:i}},[`&${t}-topLeft, &${t}-bottomLeft`]:{marginRight:{value:0,_skip_check_:!0},marginLeft:{value:n,_skip_check_:!0},[a]:{marginInlineEnd:"auto",marginInlineStart:0},[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:s}}}}},Ct=yt,$t=["top","topLeft","topRight","bottom","bottomLeft","bottomRight"],St={topLeft:"left",topRight:"right",bottomLeft:"left",bottomRight:"right",top:"left",bottom:"left"},jt=(e,t)=>{const{componentCls:n}=e;return{[`${n}-${t}`]:{[`&${n}-stack > ${n}-notice-wrapper`]:{[t.startsWith("top")?"top":"bottom"]:0,[St[t]]:{value:0,_skip_check_:!0}}}}},Ot=e=>{const t={};for(let n=1;n<e.notificationStackLayer;n++)t[`&:nth-last-child(${n+1})`]={overflow:"hidden",[`& > ${e.componentCls}-notice`]:{opacity:0,transition:`opacity ${e.motionDurationMid}`}};return Object.assign({[`&:not(:nth-last-child(-n+${e.notificationStackLayer}))`]:{opacity:0,overflow:"hidden",color:"transparent",pointerEvents:"none"}},t)},wt=e=>{const t={};for(let n=1;n<e.notificationStackLayer;n++)t[`&:nth-last-child(${n+1})`]={background:e.colorBgBlur,backdropFilter:"blur(10px)","-webkit-backdrop-filter":"blur(10px)"};return Object.assign({},t)},Et=e=>{const{componentCls:t}=e;return Object.assign({[`${t}-stack`]:{[`& > ${t}-notice-wrapper`]:Object.assign({transition:`all ${e.motionDurationSlow}, backdrop-filter 0s`,position:"absolute"},Ot(e))},[`${t}-stack:not(${t}-stack-expanded)`]:{[`& > ${t}-notice-wrapper`]:Object.assign({},wt(e))},[`${t}-stack${t}-stack-expanded`]:{[`& > ${t}-notice-wrapper`]:{"&:not(:nth-last-child(-n + 1))":{opacity:1,overflow:"unset",color:"inherit",pointerEvents:"auto",[`& > ${e.componentCls}-notice`]:{opacity:1}},"&:after":{content:'""',position:"absolute",height:e.margin,width:"100%",insetInline:0,bottom:e.calc(e.margin).mul(-1).equal(),background:"transparent",pointerEvents:"auto"}}}},$t.map(n=>jt(e,n)).reduce((n,o)=>Object.assign(Object.assign({},n),o),{}))},It=Et,xe=e=>{const{iconCls:t,componentCls:n,boxShadow:o,fontSizeLG:a,notificationMarginBottom:i,borderRadiusLG:p,colorSuccess:l,colorInfo:s,colorWarning:d,colorError:u,colorTextHeading:b,notificationBg:h,notificationPadding:$,notificationMarginEdge:S,fontSize:x,lineHeight:v,width:O,notificationIconSize:j,colorText:w}=e,y=`${n}-notice`;return{position:"relative",marginBottom:i,marginInlineStart:"auto",background:h,borderRadius:p,boxShadow:o,[y]:{padding:$,width:O,maxWidth:`calc(100vw - ${B(e.calc(S).mul(2).equal())})`,overflow:"hidden",lineHeight:v,wordWrap:"break-word"},[`${y}-message`]:{marginBottom:e.marginXS,color:b,fontSize:a,lineHeight:e.lineHeightLG},[`${y}-description`]:{fontSize:x,color:w},[`${y}-closable ${y}-message`]:{paddingInlineEnd:e.paddingLG},[`${y}-with-icon ${y}-message`]:{marginBottom:e.marginXS,marginInlineStart:e.calc(e.marginSM).add(j).equal(),fontSize:a},[`${y}-with-icon ${y}-description`]:{marginInlineStart:e.calc(e.marginSM).add(j).equal(),fontSize:x},[`${y}-icon`]:{position:"absolute",fontSize:j,lineHeight:1,[`&-success${t}`]:{color:l},[`&-info${t}`]:{color:s},[`&-warning${t}`]:{color:d},[`&-error${t}`]:{color:u}},[`${y}-close`]:Object.assign({position:"absolute",top:e.notificationPaddingVertical,insetInlineEnd:e.notificationPaddingHorizontal,color:e.colorIcon,outline:"none",width:e.notificationCloseButtonSize,height:e.notificationCloseButtonSize,borderRadius:e.borderRadiusSM,transition:`background-color ${e.motionDurationMid}, color ${e.motionDurationMid}`,display:"flex",alignItems:"center",justifyContent:"center","&:hover":{color:e.colorIconHover,backgroundColor:e.colorBgTextHover},"&:active":{backgroundColor:e.colorBgTextActive}},Me(e)),[`${y}-btn`]:{float:"right",marginTop:e.marginSM}}},Pt=e=>{const{componentCls:t,notificationMarginBottom:n,notificationMarginEdge:o,motionDurationMid:a,motionEaseInOut:i}=e,p=`${t}-notice`,l=new R("antNotificationFadeOut",{"0%":{maxHeight:e.animationMaxHeight,marginBottom:n},"100%":{maxHeight:0,marginBottom:0,paddingTop:0,paddingBottom:0,opacity:0}});return[{[t]:Object.assign(Object.assign({},J(e)),{position:"fixed",zIndex:e.zIndexPopup,marginRight:{value:o,_skip_check_:!0},[`${t}-hook-holder`]:{position:"relative"},[`${t}-fade-appear-prepare`]:{opacity:"0 !important"},[`${t}-fade-enter, ${t}-fade-appear`]:{animationDuration:e.motionDurationMid,animationTimingFunction:i,animationFillMode:"both",opacity:0,animationPlayState:"paused"},[`${t}-fade-leave`]:{animationTimingFunction:i,animationFillMode:"both",animationDuration:a,animationPlayState:"paused"},[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationPlayState:"running"},[`${t}-fade-leave${t}-fade-leave-active`]:{animationName:l,animationPlayState:"running"},"&-rtl":{direction:"rtl",[`${p}-btn`]:{float:"left"}}})},{[t]:{[`${p}-wrapper`]:Object.assign({},xe(e))}}]},ve=e=>({zIndexPopup:e.zIndexPopupBase+Le+50,width:384}),ye=e=>{const t=e.paddingMD,n=e.paddingLG;return me(e,{notificationBg:e.colorBgElevated,notificationPaddingVertical:t,notificationPaddingHorizontal:n,notificationIconSize:e.calc(e.fontSizeLG).mul(e.lineHeightLG).equal(),notificationCloseButtonSize:e.calc(e.controlHeightLG).mul(.55).equal(),notificationMarginBottom:e.margin,notificationPadding:`${B(e.paddingMD)} ${B(e.paddingContentHorizontalLG)}`,notificationMarginEdge:e.marginLG,animationMaxHeight:150,notificationStackLayer:3})},Ce=pe("Notification",e=>{const t=ye(e);return[Pt(t),Ct(t),It(t)]},ve),Bt=ze(["Notification","PurePanel"],e=>{const t=`${e.componentCls}-notice`,n=ye(e);return{[`${t}-pure-panel`]:Object.assign(Object.assign({},xe(n)),{width:n.width,maxWidth:`calc(100vw - ${B(e.calc(n.notificationMarginEdge).mul(2).equal())})`,margin:0})}},ve);var Nt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};function Q(e,t){return t===null||t===!1?null:t||f.createElement(ge,{className:`${e}-close-icon`})}const _t={success:He,info:Ge,error:Ae,warning:De},$e=e=>{const{prefixCls:t,icon:n,type:o,message:a,description:i,btn:p,role:l="alert"}=e;let s=null;return n?s=f.createElement("span",{className:`${t}-icon`},n):o&&(s=f.createElement(_t[o]||null,{className:E(`${t}-icon`,`${t}-icon-${o}`)})),f.createElement("div",{className:E({[`${t}-with-icon`]:s}),role:l},s,f.createElement("div",{className:`${t}-message`},a),f.createElement("div",{className:`${t}-description`},i),p&&f.createElement("div",{className:`${t}-btn`},p))},Tt=e=>{const{prefixCls:t,className:n,icon:o,type:a,message:i,description:p,btn:l,closable:s=!0,closeIcon:d,className:u}=e,b=Nt(e,["prefixCls","className","icon","type","message","description","btn","closable","closeIcon","className"]),{getPrefixCls:h}=f.useContext(M),$=t||h("notification"),S=`${$}-notice`,x=X($),[v,O,j]=Ce($,x);return v(f.createElement("div",{className:E(`${S}-pure-panel`,O,n,j,x)},f.createElement(Bt,{prefixCls:$}),f.createElement(et,Object.assign({},b,{prefixCls:$,eventKey:"pure",duration:null,closable:s,className:E({notificationClassName:u}),closeIcon:Q($,d),content:f.createElement($e,{prefixCls:S,icon:o,type:a,message:i,description:p,btn:l})}))))},Ft=Tt;function Rt(e,t,n){let o;switch(e){case"top":o={left:"50%",transform:"translateX(-50%)",right:"auto",top:t,bottom:"auto"};break;case"topLeft":o={left:0,top:t,bottom:"auto"};break;case"topRight":o={right:0,top:t,bottom:"auto"};break;case"bottom":o={left:"50%",transform:"translateX(-50%)",right:"auto",top:"auto",bottom:n};break;case"bottomLeft":o={left:0,top:"auto",bottom:n};break;default:o={right:0,top:"auto",bottom:n};break}return o}function Mt(e){return{motionName:`${e}-fade`}}var Lt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const se=24,zt=4.5,Ht="topRight",Gt=e=>{let{children:t,prefixCls:n}=e;const o=X(n),[a,i,p]=Ce(n,o);return a(c.createElement(ot,{classNames:{list:E(i,p,o)}},t))},At=(e,t)=>{let{prefixCls:n,key:o}=t;return c.createElement(Gt,{prefixCls:n,key:o},e)},Dt=c.forwardRef((e,t)=>{const{top:n,bottom:o,prefixCls:a,getContainer:i,maxCount:p,rtl:l,onAllRemoved:s,stack:d,duration:u}=e,{getPrefixCls:b,getPopupContainer:h,notification:$,direction:S}=f.useContext(M),[,x]=qe(),v=a||b("notification"),O=g=>Rt(g,n??se,o??se),j=()=>E({[`${v}-rtl`]:l??S==="rtl"}),w=()=>Mt(v),[y,P]=tt({prefixCls:v,style:O,className:j,motion:w,closable:!0,closeIcon:Q(v),duration:u??zt,getContainer:()=>(i==null?void 0:i())||(h==null?void 0:h())||document.body,maxCount:p,onAllRemoved:s,renderNotifications:At,stack:d===!1?!1:{threshold:typeof d=="object"?d==null?void 0:d.threshold:void 0,offset:8,gap:x.margin}});return c.useImperativeHandle(t,()=>Object.assign(Object.assign({},y),{prefixCls:v,notification:$})),P});function Se(e){const t=c.useRef(null);return Ve(),[c.useMemo(()=>{const o=l=>{var s;if(!t.current)return;const{open:d,prefixCls:u,notification:b}=t.current,h=`${u}-notice`,{message:$,description:S,icon:x,type:v,btn:O,className:j,style:w,role:y="alert",closeIcon:P,closable:g}=l,m=Lt(l,["message","description","icon","type","btn","className","style","role","closeIcon","closable"]),C=Q(h,typeof P<"u"?P:b==null?void 0:b.closeIcon);return d(Object.assign(Object.assign({placement:(s=e==null?void 0:e.placement)!==null&&s!==void 0?s:Ht},m),{content:c.createElement($e,{prefixCls:h,icon:x,type:v,message:$,description:S,btn:O,role:y}),className:E(v&&`${h}-${v}`,j,b==null?void 0:b.className),style:Object.assign(Object.assign({},b==null?void 0:b.style),w),closeIcon:C,closable:g??!!C}))},i={open:o,destroy:l=>{var s,d;l!==void 0?(s=t.current)===null||s===void 0||s.close(l):(d=t.current)===null||d===void 0||d.destroy()}};return["success","info","warning","error"].forEach(l=>{i[l]=s=>o(Object.assign(Object.assign({},s),{type:l}))}),i},[]),c.createElement(Dt,Object.assign({key:"notification-holder"},e,{ref:t}))]}function qt(e){return Se(e)}const je=c.createContext(void 0),{Provider:Vt}=je,Oe=je,Wt=e=>{const{icon:t,description:n,prefixCls:o,className:a}=e,i=c.createElement("div",{className:`${o}-icon`},c.createElement(be,null));return c.createElement("div",{onClick:e.onClick,onFocus:e.onFocus,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,className:E(a,`${o}-content`)},t||n?c.createElement(c.Fragment,null,t&&c.createElement("div",{className:`${o}-icon`},t),n&&c.createElement("div",{className:`${o}-description`},n)):i)},Ut=f.memo(Wt),Xt=e=>e===0?0:e-Math.sqrt(Math.pow(e,2)/2),le=Xt,kt=e=>{const{componentCls:t,floatButtonSize:n,motionDurationSlow:o,motionEaseInOutCirc:a}=e,i=`${t}-group`,p=new R("antFloatButtonMoveDownIn",{"0%":{transform:`translate3d(0, ${B(n)}, 0)`,transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),l=new R("antFloatButtonMoveDownOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:`translate3d(0, ${B(n)}, 0)`,transformOrigin:"0 0",opacity:0}});return[{[`${i}-wrap`]:Object.assign({},Ue(`${i}-wrap`,p,l,o,!0))},{[`${i}-wrap`]:{[`
          &${i}-wrap-enter,
          &${i}-wrap-appear
        `]:{opacity:0,animationTimingFunction:a},[`&${i}-wrap-leave`]:{animationTimingFunction:a}}}]},Kt=e=>{const{antCls:t,componentCls:n,floatButtonSize:o,margin:a,borderRadiusLG:i,borderRadiusSM:p,badgeOffset:l,floatButtonBodyPadding:s,calc:d}=e,u=`${n}-group`;return{[u]:Object.assign(Object.assign({},J(e)),{zIndex:99,display:"block",border:"none",position:"fixed",width:o,height:"auto",boxShadow:"none",minHeight:o,insetInlineEnd:e.floatButtonInsetInlineEnd,insetBlockEnd:e.floatButtonInsetBlockEnd,borderRadius:i,[`${u}-wrap`]:{zIndex:-1,display:"block",position:"relative",marginBottom:a},[`&${u}-rtl`]:{direction:"rtl"},[n]:{position:"static"}}),[`${u}-circle`]:{[`${n}-circle:not(:last-child)`]:{marginBottom:e.margin,[`${n}-body`]:{width:o,height:o,borderRadius:"50%"}}},[`${u}-square`]:{[`${n}-square`]:{borderRadius:0,padding:0,"&:first-child":{borderStartStartRadius:i,borderStartEndRadius:i},"&:last-child":{borderEndStartRadius:i,borderEndEndRadius:i},"&:not(:last-child)":{borderBottom:`${B(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${t}-badge`]:{[`${t}-badge-count`]:{top:d(d(s).add(l)).mul(-1).equal(),insetInlineEnd:d(d(s).add(l)).mul(-1).equal()}}},[`${u}-wrap`]:{display:"block",borderRadius:i,boxShadow:e.boxShadowSecondary,[`${n}-square`]:{boxShadow:"none",marginTop:0,borderRadius:0,padding:s,"&:first-child":{borderStartStartRadius:i,borderStartEndRadius:i},"&:last-child":{borderEndStartRadius:i,borderEndEndRadius:i},"&:not(:last-child)":{borderBottom:`${B(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${n}-body`]:{width:e.floatButtonBodySize,height:e.floatButtonBodySize}}}},[`${u}-circle-shadow`]:{boxShadow:"none"},[`${u}-square-shadow`]:{boxShadow:e.boxShadowSecondary,[`${n}-square`]:{boxShadow:"none",padding:s,[`${n}-body`]:{width:e.floatButtonBodySize,height:e.floatButtonBodySize,borderRadius:p}}}}},Yt=e=>{const{antCls:t,componentCls:n,floatButtonBodyPadding:o,floatButtonIconSize:a,floatButtonSize:i,borderRadiusLG:p,badgeOffset:l,dotOffsetInSquare:s,dotOffsetInCircle:d,calc:u}=e;return{[n]:Object.assign(Object.assign({},J(e)),{border:"none",position:"fixed",cursor:"pointer",zIndex:99,display:"block",width:i,height:i,insetInlineEnd:e.floatButtonInsetInlineEnd,insetBlockEnd:e.floatButtonInsetBlockEnd,boxShadow:e.boxShadowSecondary,"&-pure":{position:"relative",inset:"auto"},"&:empty":{display:"none"},[`${t}-badge`]:{width:"100%",height:"100%",[`${t}-badge-count`]:{transform:"translate(0, 0)",transformOrigin:"center",top:u(l).mul(-1).equal(),insetInlineEnd:u(l).mul(-1).equal()}},[`${n}-body`]:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",transition:`all ${e.motionDurationMid}`,[`${n}-content`]:{overflow:"hidden",textAlign:"center",minHeight:i,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:`${B(u(o).div(2).equal())} ${B(o)}`,[`${n}-icon`]:{textAlign:"center",margin:"auto",width:a,fontSize:a,lineHeight:1}}}}),[`${n}-rtl`]:{direction:"rtl"},[`${n}-circle`]:{height:i,borderRadius:"50%",[`${t}-badge`]:{[`${t}-badge-dot`]:{top:d,insetInlineEnd:d}},[`${n}-body`]:{borderRadius:"50%"}},[`${n}-square`]:{height:"auto",minHeight:i,borderRadius:p,[`${t}-badge`]:{[`${t}-badge-dot`]:{top:s,insetInlineEnd:s}},[`${n}-body`]:{height:"auto",borderRadius:p}},[`${n}-default`]:{backgroundColor:e.floatButtonBackgroundColor,transition:`background-color ${e.motionDurationMid}`,[`${n}-body`]:{backgroundColor:e.floatButtonBackgroundColor,transition:`background-color ${e.motionDurationMid}`,"&:hover":{backgroundColor:e.colorFillContent},[`${n}-content`]:{[`${n}-icon`]:{color:e.colorText},[`${n}-description`]:{display:"flex",alignItems:"center",lineHeight:B(e.fontSizeLG),color:e.colorText,fontSize:e.fontSizeSM}}}},[`${n}-primary`]:{backgroundColor:e.colorPrimary,[`${n}-body`]:{backgroundColor:e.colorPrimary,transition:`background-color ${e.motionDurationMid}`,"&:hover":{backgroundColor:e.colorPrimaryHover},[`${n}-content`]:{[`${n}-icon`]:{color:e.colorTextLightSolid},[`${n}-description`]:{display:"flex",alignItems:"center",lineHeight:B(e.fontSizeLG),color:e.colorTextLightSolid,fontSize:e.fontSizeSM}}}}}},Jt=e=>({dotOffsetInCircle:le(e.controlHeightLG/2),dotOffsetInSquare:le(e.borderRadiusLG)}),we=pe("FloatButton",e=>{const{colorTextLightSolid:t,colorBgElevated:n,controlHeightLG:o,marginXXL:a,marginLG:i,fontSize:p,fontSizeIcon:l,controlItemBgHover:s,paddingXXS:d,calc:u}=e,b=me(e,{floatButtonBackgroundColor:n,floatButtonColor:t,floatButtonHoverBackgroundColor:s,floatButtonFontSize:p,floatButtonIconSize:u(l).mul(1.5).equal(),floatButtonSize:o,floatButtonInsetBlockEnd:a,floatButtonInsetInlineEnd:i,floatButtonBodySize:u(o).sub(u(d).mul(2)).equal(),floatButtonBodyPadding:d,badgeOffset:u(d).mul(1.5).equal()});return[Kt(b),Yt(b),We(e),kt(b)]},Jt);var Qt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const k="float-btn",Zt=c.forwardRef((e,t)=>{const{prefixCls:n,className:o,rootClassName:a,type:i="default",shape:p="circle",icon:l,description:s,tooltip:d,badge:u={}}=e,b=Qt(e,["prefixCls","className","rootClassName","type","shape","icon","description","tooltip","badge"]),{getPrefixCls:h,direction:$}=f.useContext(M),S=f.useContext(Oe),x=h(k,n),v=X(x),[O,j,w]=we(x,v),y=S||p,P=E(j,w,v,x,o,a,`${x}-${i}`,`${x}-${y}`,{[`${x}-rtl`]:$==="rtl"}),g=f.useMemo(()=>Xe(u,["title","children","status","text"]),[u]),m=f.useMemo(()=>({prefixCls:x,description:s,icon:l,type:i}),[x,s,l,i]);let C=c.createElement("div",{className:`${x}-body`},c.createElement(Ut,Object.assign({},m)));return"badge"in e&&(C=c.createElement(rt,Object.assign({},g),C)),"tooltip"in e&&(C=c.createElement(ke,{title:d,placement:$==="rtl"?"right":"left"},C)),O(e.href?c.createElement("a",Object.assign({ref:t},b,{className:P}),C):c.createElement("button",Object.assign({ref:t},b,{className:P,type:"button"}),C))}),eo=Zt,L=eo;var to=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const oo=c.forwardRef((e,t)=>{const{prefixCls:n,className:o,type:a="default",shape:i="circle",visibilityHeight:p=400,icon:l=c.createElement(xt,null),target:s,onClick:d,duration:u=450}=e,b=to(e,["prefixCls","className","type","shape","visibilityHeight","icon","target","onClick","duration"]),[h,$]=f.useState(p===0),S=c.useRef(null);c.useImperativeHandle(t,()=>({nativeElement:S.current}));const x=()=>S.current&&S.current.ownerDocument?S.current.ownerDocument:window,v=vt(C=>{const I=it(C.target,!0);$(I>=p)});f.useEffect(()=>{const I=(s||x)();return v({target:I}),I==null||I.addEventListener("scroll",v),()=>{v.cancel(),I==null||I.removeEventListener("scroll",v)}},[s]);const O=C=>{at(0,{getContainer:s||x,duration:u}),d==null||d(C)},{getPrefixCls:j}=f.useContext(M),w=j(k,n),y=j(),g=f.useContext(Oe)||i,m=Object.assign({prefixCls:w,icon:l,type:a,shape:g},b);return c.createElement(he,{visible:h,motionName:`${y}-fade`},C=>{let{className:I}=C;return c.createElement(L,Object.assign({ref:S},m,{onClick:O,className:E(o,I)}))})}),Ee=oo;var no=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const ao=e=>{var t;const{prefixCls:n,className:o,style:a,shape:i="circle",type:p="default",icon:l=c.createElement(be,null),closeIcon:s,description:d,trigger:u,children:b,onOpenChange:h,open:$}=e,S=no(e,["prefixCls","className","style","shape","type","icon","closeIcon","description","trigger","children","onOpenChange","open"]),{direction:x,getPrefixCls:v,floatButtonGroup:O}=f.useContext(M),j=(t=s??(O==null?void 0:O.closeIcon))!==null&&t!==void 0?t:c.createElement(ge,null),w=v(k,n),y=X(w),[P,g,m]=we(w,y),C=`${w}-group`,I=E(C,g,m,y,o,{[`${C}-rtl`]:x==="rtl",[`${C}-${i}`]:i,[`${C}-${i}-shadow`]:!u}),_e=E(g,`${C}-wrap`),[ee,q]=Ke(!1,{value:$}),te=c.useRef(null),oe=c.useRef(null),Te=c.useMemo(()=>u==="hover"?{onMouseEnter(){q(!0),h==null||h(!0)},onMouseLeave(){q(!1),h==null||h(!1)}}:{},[u]),Fe=()=>{q(T=>(h==null||h(!T),!T))},ne=f.useCallback(T=>{var G,K;if(!((G=te.current)===null||G===void 0)&&G.contains(T.target)){!((K=oe.current)===null||K===void 0)&&K.contains(T.target)&&Fe();return}q(!1),h==null||h(!1)},[u]);return f.useEffect(()=>{if(u==="click")return document.addEventListener("click",ne),()=>{document.removeEventListener("click",ne)}},[u]),P(c.createElement(Vt,{value:i},c.createElement("div",Object.assign({ref:te,className:I,style:a},Te),u&&["click","hover"].includes(u)?c.createElement(c.Fragment,null,c.createElement(he,{visible:ee,motionName:`${C}-wrap`},T=>{let{className:G}=T;return c.createElement("div",{className:E(G,_e)},b)}),c.createElement(L,Object.assign({ref:oe,type:p,shape:i,icon:ee?j:l,description:d,"aria-label":e["aria-label"]},S))):b)))},Ie=f.memo(ao);var Pe=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const ce=e=>{var{backTop:t}=e,n=Pe(e,["backTop"]);return t?f.createElement(Ee,Object.assign({},n,{visibilityHeight:0})):f.createElement(L,Object.assign({},n))},io=e=>{var{className:t,items:n}=e,o=Pe(e,["className","items"]);const{prefixCls:a}=o,{getPrefixCls:i}=f.useContext(M),l=`${i(k,a)}-pure`;return n?f.createElement(Ie,Object.assign({className:E(t,l)},o),n.map((s,d)=>f.createElement(ce,Object.assign({key:d},s)))):f.createElement(ce,Object.assign({className:E(t,l)},o))},ro=io;L.BackTop=Ee;L.Group=Ie;L._InternalPanelDoNotUseOrYouWillBeFired=ro;let N=null,W=e=>e(),U=[],D={};function de(){const{getContainer:e,rtl:t,maxCount:n,top:o,bottom:a}=D,i=(e==null?void 0:e())||document.body;return{getContainer:()=>i,rtl:t,maxCount:n,top:o,bottom:a}}const so=c.forwardRef((e,t)=>{const{notificationConfig:n,sync:o}=e,{getPrefixCls:a}=f.useContext(M),i=D.prefixCls||a("notification"),p=f.useContext(nt),[l,s]=Se(Object.assign(Object.assign(Object.assign({},n),{prefixCls:i}),p.notification));return c.useEffect(o,[]),c.useImperativeHandle(t,()=>{const d=Object.assign({},l);return Object.keys(d).forEach(u=>{d[u]=function(){return o(),l[u].apply(l,arguments)}}),{instance:d,sync:o}}),s}),lo=c.forwardRef((e,t)=>{const[n,o]=c.useState(de),a=()=>{o(de)};c.useEffect(a,[]);const i=Qe(),p=i.getRootPrefixCls(),l=i.getIconPrefixCls(),s=i.getTheme(),d=c.createElement(so,{ref:t,sync:a,notificationConfig:n});return c.createElement(Je,{prefixCls:p,iconPrefixCls:l,theme:s},i.holderRender?i.holderRender(d):d)});function Z(){if(!N){const e=document.createDocumentFragment(),t={fragment:e};N=t,W(()=>{Ye(c.createElement(lo,{ref:n=>{const{instance:o,sync:a}=n||{};Promise.resolve().then(()=>{!t.instance&&o&&(t.instance=o,t.sync=a,Z())})}}),e)});return}N.instance&&(U.forEach(e=>{switch(e.type){case"open":{W(()=>{N.instance.open(Object.assign(Object.assign({},D),e.config))});break}case"destroy":W(()=>{N==null||N.instance.destroy(e.key)});break}}),U=[])}function co(e){D=Object.assign(Object.assign({},D),e),W(()=>{var t;(t=N==null?void 0:N.sync)===null||t===void 0||t.call(N)})}function Be(e){U.push({type:"open",config:e}),Z()}const uo=e=>{U.push({type:"destroy",key:e}),Z()},fo=["success","info","warning","error"],po={open:Be,destroy:uo,config:co,useNotification:qt,_InternalPanelDoNotUseOrYouWillBeFired:Ft},Ne=po;fo.forEach(e=>{Ne[e]=t=>Be(Object.assign(Object.assign({},t),{type:e}))});const mo=Ne,wo=()=>{const[e,t]=mo.useNotification(),[n]=_.useForm(),o=Ze(),[a,i]=f.useState([]),[p,l]=f.useState([]),[s,d]=f.useState(!1),[u,b]=f.useState(null),[h,$]=f.useState([]),[S,x]=f.useState(""),v=()=>{Y.getComboCarreras().then(g=>{g.data.ok&&i(g.data.data)})},O=g=>{o(ie()),Y.getConfiguracion(g).then(m=>{m.data.ok?m.data.data!==null?(x(""),n.setFieldsValue({id_configuracion:m.data.data.id_configuracion,cantidad_periodos:m.data.data.periodos_desercion,cantidad_total_periodos:m.data.data.total_periodos,cantidad_periodos_gracia:m.data.data.periodos_gracia,porcentaje_min_asistencia:m.data.data.prom_min_asistencia,nota_prom_general:m.data.data.prom_min_notas,puntuacion:m.data.data.puntuacion}),l(m.data)):(n.resetFields(),x("No existen datos de configuracion de la carrera seleccionada, ingrese los datos correspondientes para poder presentar informacion."),n.setFieldsValue({carrera:g})):o(V({success:!1,title:"Error al obtener datos de configuración"}))}).catch(m=>{o(V({success:!1,title:"Error al obtener datos de configuración",message:m.response.data.message}))}).finally(()=>o(re()))};f.useEffect(()=>{v()},[]);const j=()=>{const g=[],m=n.getFieldsValue();return(m.cantidad_periodos===void 0||m.cantidad_periodos===null)&&g.push({title:"Cantidad de periodos",message:"Este campo no puede estar vacio"}),(m.cantidad_total_periodos===void 0||m.cantidad_total_periodos===null)&&g.push({title:"Cantidad total de periodos",message:"Este campo no puede estar vacio"}),(m.cantidad_periodos_gracia===void 0||m.cantidad_periodos_gracia===null)&&g.push({title:"Cantidad de periodos de gracia",message:"Este campo no puede estar vacio"}),(m.porcentaje_min_asistencia===void 0||m.porcentaje_min_asistencia===null)&&g.push({title:"Porcentaje minimo de asistencia",message:"Este campo no puede estar vacio"}),(m.nota_prom_general===void 0||m.nota_prom_general===null)&&g.push({title:"Nota minima de promedio general",message:"Este campo no puede estar vacio"}),(m.puntuacion===void 0||m.puntuacion===null)&&g.push({title:"Puntuación total",message:"Este campo no puede estar vacio"}),$(g),g.length>0},w=()=>{h.map((g,m)=>{e.error({message:g.title,description:g.message})}),d(!1)};f.useEffect(()=>{s&&w()},[s]);const y=()=>{o(ie());const g=n.getFieldsValue();Y.saveConfiguration(g).then(m=>{o(V({success:!0,title:"Configuración guardada exitosamente"}))}).catch(m=>{o(V({success:!1,title:"Error al guardar los datos de configuración",message:m.response.data.message}))}).finally(()=>o(re()))},P=()=>{j()?d(!0):y()};return r.jsxs("div",{children:[t,u!==null&&r.jsx(L,{icon:r.jsx(st,{}),type:"primary",description:r.jsx(r.Fragment,{children:" GUARDAR"}),shape:"square",style:{right:24,width:"100px"},onClick:P}),r.jsx("h1",{children:"Configuracion de la aplicacion"}),r.jsx(_,{form:n,layout:"vertical",children:r.jsxs(ct,{justify:"space-around",children:[r.jsx(z,{xs:{flex:"100%"},sm:{flex:"100%"},md:{flex:"99%"},lg:{flex:"97%"},xl:{flex:"95%"},children:r.jsxs(H,{children:[S.length>0&&r.jsx(A,{message:"Alerta de configuracion",description:S,type:"warning",showIcon:!0}),r.jsx(_.Item,{label:r.jsx("h3",{children:"Carreras"}),name:"carrera",children:r.jsx(lt,{placeholder:"Seleccione una carrera",options:a,onChange:g=>{O(g),b(g)}})})]})}),r.jsx(z,{xs:{flex:"100%"},sm:{flex:"100%"},md:{flex:"99%"},lg:{flex:"97%"},xl:{flex:"95%"},children:r.jsxs(H,{children:[r.jsx(z,{xs:{flex:"100%"},sm:{flex:"100%"},md:{flex:"49%"},lg:{flex:"49%"},xl:{flex:"49%"},children:r.jsxs(H.Grid,{style:{width:"100%"},children:[r.jsx(A,{showIcon:!0,closable:!0,description:r.jsxs(r.Fragment,{children:["La cantidad de periodos de la tasa de desercion se usa para ver cuantos periodos se recorre apartir del primer semestre de los estudiantes. ",r.jsx("br",{}),"  ",r.jsx("b",{children:"Ejemplo:"})," Si la carrera tiene 10 periodos, y la tasa de desercion evalua hasta la mitad de la carrera, ingrese el numero 5."]})}),r.jsx("h3",{children:"Tasa de deserción"}),r.jsx(_.Item,{style:{display:"none"},name:"id_configuracion",children:r.jsx(F,{})}),r.jsx(_.Item,{label:"Cantidad de periodos",name:"cantidad_periodos",children:r.jsx(F,{style:{width:"100%"}})})]})}),r.jsx(z,{xs:{flex:"100%"},sm:{flex:"100%"},md:{flex:"49%"},lg:{flex:"49%"},xl:{flex:"49%"},children:r.jsxs(H.Grid,{style:{width:"100%"},children:[r.jsx(A,{showIcon:!0,closable:!0,description:r.jsxs(r.Fragment,{children:["La cantidad total de periodos se refiere a la cantidad de ciclos que tiene la carrera.",r.jsx("br",{})," Los periodos de gracia hacen referencia a la cantidad maxima de periodos contables despues de que pase los ciclos totales "]})}),r.jsx("h3",{children:"Tasa de titulación"}),r.jsx(_.Item,{label:"Cantidad total de periodos",name:"cantidad_total_periodos",children:r.jsx(F,{style:{width:"100%"}})}),r.jsx(_.Item,{label:"Cantidad de periodos de gracia",name:"cantidad_periodos_gracia",children:r.jsx(F,{style:{width:"100%"}})})]})}),r.jsx(z,{xs:{flex:"100%"},sm:{flex:"100%"},md:{flex:"49%"},lg:{flex:"49%"},xl:{flex:"49%"},children:r.jsxs(H.Grid,{style:{width:"100%"},children:[r.jsx(A,{showIcon:!0,closable:!0,description:r.jsxs(r.Fragment,{children:["El porcentaje minimo de asistencia es evaluado sobre ",r.jsx("b",{children:"100%"}),", es decir si el porcentaje minimo de asistencia es ",r.jsx("b",{children:"70%"})," ingrese ",r.jsx("b",{children:"70"}),".",r.jsx("br",{}),"La nota minima del promedio general es evaluada en relacion a la ",r.jsx("b",{children:"Puntuacion total"})," si la puntuacion total es sobre ",r.jsx("b",{children:"10"})," y la nota minima es ",r.jsx("b",{children:"7"})," coloque el ",r.jsx("b",{children:"7"})," "]})}),r.jsx("h3",{children:"Tasa de reprobados"}),r.jsx(_.Item,{label:"Porcentaje minimo de asistencia",name:"porcentaje_min_asistencia",children:r.jsx(F,{style:{width:"100%"}})}),r.jsx(_.Item,{label:"Nota minima de promedio general",name:"nota_prom_general",children:r.jsx(F,{style:{width:"100%"}})})]})}),r.jsx(z,{xs:{flex:"100%"},sm:{flex:"100%"},md:{flex:"49%"},lg:{flex:"49%"},xl:{flex:"49%"},children:r.jsxs(H.Grid,{style:{width:"100%"},children:[r.jsx(A,{showIcon:!0,closable:!0,description:r.jsxs(r.Fragment,{children:["La puntuacion total se refiere al puntaje total sobre el que se calificaran los logros. ",r.jsx("br",{})," ",r.jsx("b",{children:"Ejemplo:"}),"Si el puntaje final al sumar todos los logros es de 10, ingrese el numero 10."]})}),r.jsx("h3",{children:"Logros de aprendizaje"}),r.jsx(_.Item,{label:"Puntuación total",name:"puntuacion",children:r.jsx(F,{style:{width:"100%"}})})]})})]})})]})})]})};export{wo as default};
