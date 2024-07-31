import{r as l,A as we,_ as Te,ay as ne,b3 as nt,n as ot,g as lt,h as oe,i as rt,Q as it,a7 as st,C as je,ak as Re,T as de,aT as at,ar as $e,Y as X,k as ct,az as dt,J as Ie,M as he,aH as ut}from"./index-5aad39ae.js";import{E as pt}from"./EditOutlined-80ae876f.js";import{o as _e,i as Ee}from"./styleChecker-72068623.js";import{T as ft}from"./TextArea-9f6e28af.js";import{b as gt}from"./index-bd599e66.js";var mt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"};const yt=mt;var bt=function(t,o){return l.createElement(we,Te({},t,{ref:o,icon:yt}))},vt=l.forwardRef(bt);const ht=vt;var Et={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"};const xt=Et;var Ct=function(t,o){return l.createElement(we,Te({},t,{ref:o,icon:xt}))},Ot=l.forwardRef(Ct);const St=Ot;var wt=globalThis&&globalThis.__rest||function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const Tt={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},jt=l.forwardRef((e,t)=>{const o=i=>{const{keyCode:u}=i;u===ne.ENTER&&i.preventDefault()},n=i=>{const{keyCode:u}=i,{onClick:g}=e;u===ne.ENTER&&g&&g()},{style:r,noStyle:a,disabled:f,tabIndex:c=0}=e,m=wt(e,["style","noStyle","disabled","tabIndex"]);let d={};return a||(d=Object.assign({},Tt)),f&&(d.pointerEvents="none"),d=Object.assign(Object.assign({},d),r),l.createElement("div",Object.assign({role:"button",tabIndex:c,ref:t},m,{onKeyDown:o,onKeyUp:n,style:d}))}),ke=jt,Rt=(e,t,o,n)=>{const{titleMarginBottom:r,fontWeightStrong:a}=n;return{marginBottom:r,color:o,fontWeight:a,fontSize:e,lineHeight:t}},$t=e=>{const t=[1,2,3,4,5],o={};return t.forEach(n=>{o[`
      h${n}&,
      div&-h${n},
      div&-h${n} > textarea,
      h${n}
    `]=Rt(e[`fontSizeHeading${n}`],e[`lineHeightHeading${n}`],e.colorTextHeading,e)}),o},It=e=>{const{componentCls:t}=e;return{"a&, a":Object.assign(Object.assign({},_e(e)),{textDecoration:e.linkDecoration,"&:active, &:hover":{textDecoration:e.linkHoverDecoration},[`&[disabled], &${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed","&:active, &:hover":{color:e.colorTextDisabled},"&:active":{pointerEvents:"none"}}})}},_t=e=>({code:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.2em 0.1em",fontSize:"85%",fontFamily:e.fontFamilyCode,background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3},kbd:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.15em 0.1em",fontSize:"90%",fontFamily:e.fontFamilyCode,background:"rgba(150, 150, 150, 0.06)",border:"1px solid rgba(100, 100, 100, 0.2)",borderBottomWidth:2,borderRadius:3},mark:{padding:0,backgroundColor:nt[2]},"u, ins":{textDecoration:"underline",textDecorationSkipInk:"auto"},"s, del":{textDecoration:"line-through"},strong:{fontWeight:600},"ul, ol":{marginInline:0,marginBlock:"0 1em",padding:0,li:{marginInline:"20px 0",marginBlock:0,paddingInline:"4px 0",paddingBlock:0}},ul:{listStyleType:"circle",ul:{listStyleType:"disc"}},ol:{listStyleType:"decimal"},"pre, blockquote":{margin:"1em 0"},pre:{padding:"0.4em 0.6em",whiteSpace:"pre-wrap",wordWrap:"break-word",background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3,fontFamily:e.fontFamilyCode,code:{display:"inline",margin:0,padding:0,fontSize:"inherit",fontFamily:"inherit",background:"transparent",border:0}},blockquote:{paddingInline:"0.6em 0",paddingBlock:0,borderInlineStart:"4px solid rgba(100, 100, 100, 0.2)",opacity:.85}}),kt=e=>{const{componentCls:t,paddingSM:o}=e,n=o;return{"&-edit-content":{position:"relative","div&":{insetInlineStart:e.calc(e.paddingSM).mul(-1).equal(),marginTop:e.calc(n).mul(-1).equal(),marginBottom:`calc(1em - ${ot(n)})`},[`${t}-edit-content-confirm`]:{position:"absolute",insetInlineEnd:e.calc(e.marginXS).add(2).equal(),insetBlockEnd:e.marginXS,color:e.colorTextDescription,fontWeight:"normal",fontSize:e.fontSize,fontStyle:"normal",pointerEvents:"none"},textarea:{margin:"0!important",MozTransition:"none",height:"1em"}}}},Dt=e=>({[`${e.componentCls}-copy-success`]:{"\n    &,\n    &:hover,\n    &:focus":{color:e.colorSuccess}},[`${e.componentCls}-copy-icon-only`]:{marginInlineStart:0}}),Lt=()=>({"\n  a&-ellipsis,\n  span&-ellipsis\n  ":{display:"inline-block",maxWidth:"100%"},"&-single-line":{whiteSpace:"nowrap"},"&-ellipsis-single-line":{overflow:"hidden",textOverflow:"ellipsis","a&, span&":{verticalAlign:"bottom"},"> code":{paddingBlock:0,maxWidth:"calc(100% - 1.2em)",display:"inline-block",overflow:"hidden",textOverflow:"ellipsis",verticalAlign:"bottom",boxSizing:"content-box"}},"&-ellipsis-multiple-line":{display:"-webkit-box",overflow:"hidden",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}),Pt=e=>{const{componentCls:t,titleMarginTop:o}=e;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:e.colorText,wordBreak:"break-word",lineHeight:e.lineHeight,[`&${t}-secondary`]:{color:e.colorTextDescription},[`&${t}-success`]:{color:e.colorSuccess},[`&${t}-warning`]:{color:e.colorWarning},[`&${t}-danger`]:{color:e.colorError,"a&:active, a&:focus":{color:e.colorErrorActive},"a&:hover":{color:e.colorErrorHover}},[`&${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",userSelect:"none"},"\n        div&,\n        p\n      ":{marginBottom:"1em"}},$t(e)),{[`
      & + h1${t},
      & + h2${t},
      & + h3${t},
      & + h4${t},
      & + h5${t}
      `]:{marginTop:o},"\n      div,\n      ul,\n      li,\n      p,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5":{"\n        + h1,\n        + h2,\n        + h3,\n        + h4,\n        + h5\n        ":{marginTop:o}}}),_t(e)),It(e)),{[`
        ${t}-expand,
        ${t}-collapse,
        ${t}-edit,
        ${t}-copy
      `]:Object.assign(Object.assign({},_e(e)),{marginInlineStart:e.marginXXS})}),kt(e)),Dt(e)),Lt()),{"&-rtl":{direction:"rtl"}})}},Mt=()=>({titleMarginTop:"1.2em",titleMarginBottom:"0.5em"}),De=lt("Typography",e=>[Pt(e)],Mt),Nt=e=>{const{prefixCls:t,"aria-label":o,className:n,style:r,direction:a,maxLength:f,autoSize:c=!0,value:m,onSave:d,onCancel:i,onEnd:u,component:g,enterIcon:y=l.createElement(St,null)}=e,O=l.useRef(null),C=l.useRef(!1),$=l.useRef(),[N,H]=l.useState(m);l.useEffect(()=>{H(m)},[m]),l.useEffect(()=>{if(O.current&&O.current.resizableTextArea){const{textArea:h}=O.current.resizableTextArea;h.focus();const{length:x}=h.value;h.setSelectionRange(x,x)}},[]);const v=h=>{let{target:x}=h;H(x.value.replace(/[\n\r]/g,""))},S=()=>{C.current=!0},D=()=>{C.current=!1},w=h=>{let{keyCode:x}=h;C.current||($.current=x)},U=()=>{d(N.trim())},L=h=>{let{keyCode:x,ctrlKey:q,altKey:B,metaKey:K,shiftKey:V}=h;$.current===x&&!C.current&&!q&&!B&&!K&&!V&&(x===ne.ENTER?(U(),u==null||u()):x===ne.ESC&&i())},b=()=>{U()},_=g?`${t}-${g}`:"",[T,I,j]=De(t),A=oe(t,`${t}-edit-content`,{[`${t}-rtl`]:a==="rtl"},n,_,I,j);return T(l.createElement("div",{className:A,style:r},l.createElement(ft,{ref:O,maxLength:f,value:N,onChange:v,onKeyDown:w,onKeyUp:L,onCompositionStart:S,onCompositionEnd:D,onBlur:b,"aria-label":o,rows:1,autoSize:c}),y!==null?rt(y,{className:`${t}-edit-content-confirm`}):null))},Ht=Nt;var At=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,o=[],n=0;n<e.rangeCount;n++)o.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||o.forEach(function(r){e.addRange(r)}),t&&t.focus()}},Bt=At,xe={"text/plain":"Text","text/html":"Url",default:"Text"},zt="Copy to clipboard: #{key}, Enter";function Wt(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function Ut(e,t){var o,n,r,a,f,c,m=!1;t||(t={}),o=t.debug||!1;try{r=Bt(),a=document.createRange(),f=document.getSelection(),c=document.createElement("span"),c.textContent=e,c.ariaHidden="true",c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",function(i){if(i.stopPropagation(),t.format)if(i.preventDefault(),typeof i.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var u=xe[t.format]||xe.default;window.clipboardData.setData(u,e)}else i.clipboardData.clearData(),i.clipboardData.setData(t.format,e);t.onCopy&&(i.preventDefault(),t.onCopy(i.clipboardData))}),document.body.appendChild(c),a.selectNodeContents(c),f.addRange(a);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");m=!0}catch(i){o&&console.error("unable to copy using execCommand: ",i),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),m=!0}catch(u){o&&console.error("unable to copy using clipboardData: ",u),o&&console.error("falling back to prompt"),n=Wt("message"in t?t.message:zt),window.prompt(n,e)}}finally{f&&(typeof f.removeRange=="function"?f.removeRange(a):f.removeAllRanges()),c&&document.body.removeChild(c),r()}return m}var Kt=Ut;const Vt=it(Kt);var Ft=globalThis&&globalThis.__awaiter||function(e,t,o,n){function r(a){return a instanceof o?a:new o(function(f){f(a)})}return new(o||(o=Promise))(function(a,f){function c(i){try{d(n.next(i))}catch(u){f(u)}}function m(i){try{d(n.throw(i))}catch(u){f(u)}}function d(i){i.done?a(i.value):r(i.value).then(c,m)}d((n=n.apply(e,t||[])).next())})};const qt=e=>{let{copyConfig:t,children:o}=e;const[n,r]=l.useState(!1),[a,f]=l.useState(!1),c=l.useRef(null),m=()=>{c.current&&clearTimeout(c.current)},d={};t.format&&(d.format=t.format),l.useEffect(()=>m,[]);const i=st(u=>Ft(void 0,void 0,void 0,function*(){var g;u==null||u.preventDefault(),u==null||u.stopPropagation(),f(!0);try{const y=typeof t.text=="function"?yield t.text():t.text;Vt(y||String(o)||"",d),f(!1),r(!0),m(),c.current=setTimeout(()=>{r(!1)},3e3),(g=t.onCopy)===null||g===void 0||g.call(t,u)}catch(y){throw f(!1),y}}));return{copied:n,copyLoading:a,onClick:i}},Xt=qt;function ie(e,t){return l.useMemo(()=>{const o=!!e;return[o,Object.assign(Object.assign({},t),o&&typeof e=="object"?e:null)]},[e])}const Jt=(e,t)=>{const o=l.useRef(!1);l.useEffect(()=>{o.current?e():o.current=!0},t)},Qt=Jt,Yt=e=>{const t=l.useRef();return l.useEffect(()=>{t.current=e}),t.current},Gt=Yt;var Zt=globalThis&&globalThis.__rest||function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const en=l.forwardRef((e,t)=>{const{prefixCls:o,component:n="article",className:r,rootClassName:a,setContentRef:f,children:c,direction:m,style:d}=e,i=Zt(e,["prefixCls","component","className","rootClassName","setContentRef","children","direction","style"]),{getPrefixCls:u,direction:g,typography:y}=l.useContext(je),O=m??g;let C=t;f&&(C=Re(t,f));const $=u("typography",o),[N,H,v]=De($),S=oe($,y==null?void 0:y.className,{[`${$}-rtl`]:O==="rtl"},r,a,H,v),D=Object.assign(Object.assign({},y==null?void 0:y.style),d);return N(l.createElement(n,Object.assign({className:S,style:D,ref:C},i),c))}),Le=en;function Ce(e){return e===!1?[!1,!1]:Array.isArray(e)?e:[e]}function Z(e,t,o){return e===!0||e===void 0?t:e||o&&t}const tn=e=>{const{prefixCls:t,copied:o,locale:n,iconOnly:r,tooltips:a,icon:f,loading:c,tabIndex:m,onCopy:d}=e,i=Ce(a),u=Ce(f),{copied:g,copy:y}=n??{},O=o?Z(i[1],g):Z(i[0],y),$=typeof O=="string"?O:o?g:y;return l.createElement(de,{key:"copy",title:O},l.createElement(ke,{className:oe(`${t}-copy`,{[`${t}-copy-success`]:o,[`${t}-copy-icon-only`]:r}),onClick:d,"aria-label":$,tabIndex:m},o?Z(u[1],l.createElement(gt,null),!0):Z(u[0],c?l.createElement(at,null):l.createElement(ht,null),!0)))},nn=tn,ee=l.forwardRef((e,t)=>{let{style:o,children:n}=e;const r=l.useRef(null);return l.useImperativeHandle(t,()=>({isExceed:()=>{const a=r.current;return a.scrollHeight>a.clientHeight},getHeight:()=>r.current.clientHeight})),l.createElement("span",{"aria-hidden":!0,ref:r,style:Object.assign({position:"fixed",display:"block",left:0,top:0,pointerEvents:"none",backgroundColor:"rgba(255, 0, 0, 0.65)"},o)},n)});function Pe(e){const t=typeof e;return t==="string"||t==="number"}function on(e){let t=0;return e.forEach(o=>{Pe(o)?t+=String(o).length:t+=1}),t}function Oe(e,t){let o=0;const n=[];for(let r=0;r<e.length;r+=1){if(o===t)return n;const a=e[r],c=Pe(a)?String(a).length:1,m=o+c;if(m>t){const d=t-o;return n.push(String(a).slice(0,d)),n}n.push(a),o=m}return e}const se=0,ae=1,ce=2,Se=3,te={display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical"};function ln(e){const{enableMeasure:t,width:o,text:n,children:r,rows:a,expanded:f,miscDeps:c,onEllipsis:m}=e,d=l.useMemo(()=>$e(n),[n]),i=l.useMemo(()=>on(d),[n]),u=l.useMemo(()=>r(d,!1),[n]),[g,y]=l.useState(null),O=l.useRef(null),C=l.useRef(null),$=l.useRef(null),N=l.useRef(null),[H,v]=l.useState(!1),[S,D]=l.useState(se),[w,U]=l.useState(0);X(()=>{D(t&&o&&i?ae:se)},[o,n,a,t,d]),X(()=>{var T,I,j,A;if(S===ae){const h=!!(!((T=C.current)===null||T===void 0)&&T.isExceed());D(h?ce:Se),y(h?[0,i]:null),v(h);const x=((I=C.current)===null||I===void 0?void 0:I.getHeight())||0,q=a===1?0:((j=$.current)===null||j===void 0?void 0:j.getHeight())||0,B=((A=N.current)===null||A===void 0?void 0:A.getHeight())||0,K=q+B,V=Math.max(x,K);U(V+1),m(h)}},[S]);const L=g?Math.ceil((g[0]+g[1])/2):0;X(()=>{var T;const[I,j]=g||[0,0];if(I!==j){const h=(((T=O.current)===null||T===void 0?void 0:T.getHeight())||0)>w;let x=L;j-I===1&&(x=h?I:j),y(h?[I,x]:[x,j])}},[g,L]);const b=l.useMemo(()=>{if(S!==ce||!g||g[0]!==g[1]){const T=r(d,!1);return S!==Se&&S!==se?l.createElement("span",{style:Object.assign(Object.assign({},te),{WebkitLineClamp:a})},T):T}return r(f?d:Oe(d,g[0]),H)},[f,S,g,d].concat(ct(c))),_={width:o,whiteSpace:"normal",margin:0,padding:0};return l.createElement(l.Fragment,null,b,S===ae&&l.createElement(l.Fragment,null,l.createElement(ee,{style:Object.assign(Object.assign(Object.assign({},_),te),{WebkitLineClamp:a}),ref:C},u),l.createElement(ee,{style:Object.assign(Object.assign(Object.assign({},_),te),{WebkitLineClamp:a-1}),ref:$},u),l.createElement(ee,{style:Object.assign(Object.assign(Object.assign({},_),te),{WebkitLineClamp:1}),ref:N},r([],!0))),S===ce&&g&&g[0]!==g[1]&&l.createElement(ee,{style:Object.assign(Object.assign({},_),{top:400}),ref:O},r(Oe(d,L),!0)))}const rn=e=>{let{enableEllipsis:t,isEllipsis:o,children:n,tooltipProps:r}=e;return!(r!=null&&r.title)||!t?n:l.createElement(de,Object.assign({open:o?void 0:!1},r),n)},sn=rn;var an=globalThis&&globalThis.__rest||function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};function cn(e,t){let{mark:o,code:n,underline:r,delete:a,strong:f,keyboard:c,italic:m}=e,d=t;function i(u,g){g&&(d=l.createElement(u,{},d))}return i("strong",f),i("u",r),i("del",a),i("code",n),i("mark",o),i("kbd",c),i("i",m),d}const dn="...",un=l.forwardRef((e,t)=>{var o,n,r;const{prefixCls:a,className:f,style:c,type:m,disabled:d,children:i,ellipsis:u,editable:g,copyable:y,component:O,title:C}=e,$=an(e,["prefixCls","className","style","type","disabled","children","ellipsis","editable","copyable","component","title"]),{getPrefixCls:N,direction:H}=l.useContext(je),[v]=dt("Text"),S=l.useRef(null),D=l.useRef(null),w=N("typography",a),U=Ie($,["mark","code","delete","underline","strong","keyboard","italic"]),[L,b]=ie(g),[_,T]=he(!1,{value:b.editing}),{triggerType:I=["icon"]}=b,j=s=>{var p;s&&((p=b.onStart)===null||p===void 0||p.call(b)),T(s)},A=Gt(_);Qt(()=>{var s;!_&&A&&((s=D.current)===null||s===void 0||s.focus())},[_]);const h=s=>{s==null||s.preventDefault(),j(!0)},x=s=>{var p;(p=b.onChange)===null||p===void 0||p.call(b,s),j(!1)},q=()=>{var s;(s=b.onCancel)===null||s===void 0||s.call(b),j(!1)},[B,K]=ie(y),{copied:V,copyLoading:ue,onClick:Me}=Xt({copyConfig:K,children:i}),[pe,Ne]=l.useState(!1),[fe,He]=l.useState(!1),[ge,Ae]=l.useState(!1),[me,Be]=l.useState(!1),[ze,We]=l.useState(!0),[z,E]=ie(u,{expandable:!1,symbol:s=>s?v==null?void 0:v.collapse:v==null?void 0:v.expand}),[k,Ue]=he(E.defaultExpanded||!1,{value:E.expanded}),R=z&&(!k||E.expandable==="collapsible"),{rows:F=1}=E,Q=l.useMemo(()=>R&&(E.suffix!==void 0||E.onEllipsis||E.expandable||L||B),[R,E,L,B]);X(()=>{z&&!Q&&(Ne(Ee("webkitLineClamp")),He(Ee("textOverflow")))},[Q,z]);const[P,Ke]=l.useState(R),ye=l.useMemo(()=>Q?!1:F===1?fe:pe,[Q,fe,pe]);X(()=>{Ke(ye&&R)},[ye,R]);const be=R&&(P?me:ge),Ve=R&&F===1&&P,Y=R&&F>1&&P,Fe=(s,p)=>{var M;Ue(p.expanded),(M=E.onExpand)===null||M===void 0||M.call(E,s,p)},[ve,qe]=l.useState(0),Xe=s=>{let{offsetWidth:p}=s;qe(p)},Je=s=>{var p;Ae(s),ge!==s&&((p=E.onEllipsis)===null||p===void 0||p.call(E,s))};l.useEffect(()=>{const s=S.current;if(z&&P&&s){const p=Y?s.offsetHeight<s.scrollHeight:s.offsetWidth<s.scrollWidth;me!==p&&Be(p)}},[z,P,i,Y,ze,ve]),l.useEffect(()=>{const s=S.current;if(typeof IntersectionObserver>"u"||!s||!P||!R)return;const p=new IntersectionObserver(()=>{We(!!s.offsetParent)});return p.observe(s),()=>{p.disconnect()}},[P,R]);let W={};E.tooltip===!0?W={title:(o=b.text)!==null&&o!==void 0?o:i}:l.isValidElement(E.tooltip)?W={title:E.tooltip}:typeof E.tooltip=="object"?W=Object.assign({title:(n=b.text)!==null&&n!==void 0?n:i},E.tooltip):W={title:E.tooltip};const G=l.useMemo(()=>{const s=p=>["string","number"].includes(typeof p);if(!(!z||P)){if(s(b.text))return b.text;if(s(i))return i;if(s(C))return C;if(s(W.title))return W.title}},[z,P,C,W.title,be]);if(_)return l.createElement(Ht,{value:(r=b.text)!==null&&r!==void 0?r:typeof i=="string"?i:"",onSave:x,onCancel:q,onEnd:b.onEnd,prefixCls:w,className:f,style:c,direction:H,component:O,maxLength:b.maxLength,autoSize:b.autoSize,enterIcon:b.enterIcon});const Qe=()=>{const{expandable:s,symbol:p}=E;return!s||k&&s!=="collapsible"?null:l.createElement("a",{key:"expand",className:`${w}-${k?"collapse":"expand"}`,onClick:M=>Fe(M,{expanded:!k}),"aria-label":k?v.collapse:v==null?void 0:v.expand},typeof p=="function"?p(k):p)},Ye=()=>{if(!L)return;const{icon:s,tooltip:p,tabIndex:M}=b,re=$e(p)[0]||(v==null?void 0:v.edit),tt=typeof re=="string"?re:"";return I.includes("icon")?l.createElement(de,{key:"edit",title:p===!1?"":re},l.createElement(ke,{ref:D,className:`${w}-edit`,onClick:h,"aria-label":tt,tabIndex:M},s||l.createElement(pt,{role:"button"}))):null},Ge=()=>B?l.createElement(nn,Object.assign({key:"copy"},K,{prefixCls:w,copied:V,locale:v,onCopy:Me,loading:ue,iconOnly:i==null})):null,Ze=s=>[s&&Qe(),Ye(),Ge()],et=s=>[s&&!k&&l.createElement("span",{"aria-hidden":!0,key:"ellipsis"},dn),E.suffix,Ze(s)];return l.createElement(ut,{onResize:Xe,disabled:!R},s=>l.createElement(sn,{tooltipProps:W,enableEllipsis:R,isEllipsis:be},l.createElement(Le,Object.assign({className:oe({[`${w}-${m}`]:m,[`${w}-disabled`]:d,[`${w}-ellipsis`]:z,[`${w}-single-line`]:R&&F===1&&!k,[`${w}-ellipsis-single-line`]:Ve,[`${w}-ellipsis-multiple-line`]:Y},f),prefixCls:a,style:Object.assign(Object.assign({},c),{WebkitLineClamp:Y?F:void 0}),component:O,ref:Re(s,S,t),direction:H,onClick:I.includes("text")?h:void 0,"aria-label":G==null?void 0:G.toString(),title:C},U),l.createElement(ln,{enableMeasure:R&&!P,text:i,rows:F,width:ve,onEllipsis:Je,expanded:k,miscDeps:[V,k,ue,L,B]},(p,M)=>cn(e,l.createElement(l.Fragment,null,p.length>0&&M&&!k&&G?l.createElement("span",{key:"show-content","aria-hidden":!0},p):p,et(M)))))))}),le=un;var pn=globalThis&&globalThis.__rest||function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const fn=l.forwardRef((e,t)=>{var{ellipsis:o,rel:n}=e,r=pn(e,["ellipsis","rel"]);const a=Object.assign(Object.assign({},r),{rel:n===void 0&&r.target==="_blank"?"noopener noreferrer":n});return delete a.navigate,l.createElement(le,Object.assign({},a,{ref:t,ellipsis:!!o,component:"a"}))}),gn=fn,mn=l.forwardRef((e,t)=>l.createElement(le,Object.assign({ref:t},e,{component:"div"}))),yn=mn;var bn=globalThis&&globalThis.__rest||function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const vn=(e,t)=>{var{ellipsis:o}=e,n=bn(e,["ellipsis"]);const r=l.useMemo(()=>o&&typeof o=="object"?Ie(o,["expandable","rows"]):o,[o]);return l.createElement(le,Object.assign({ref:t},n,{ellipsis:r,component:"span"}))},hn=l.forwardRef(vn);var En=globalThis&&globalThis.__rest||function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const xn=[1,2,3,4,5],Cn=l.forwardRef((e,t)=>{const{level:o=1}=e,n=En(e,["level"]);let r;return xn.includes(o)?r=`h${o}`:r="h1",l.createElement(le,Object.assign({ref:t},n,{component:r}))}),On=Cn,J=Le;J.Text=hn;J.Link=gn;J.Title=On;J.Paragraph=yn;const $n=J;export{$n as T};