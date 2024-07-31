import{r as a,ag as H,as as ve,p as Re,_ as J,h as B,ah as ae,ay as Ae,R as j,bc as pe,af as de,ai as O,k as W,aD as Le}from"./index-5aad39ae.js";var be=a.forwardRef(function(e,i){var d=e.prefixCls,r=e.style,u=e.className,C=e.duration,k=C===void 0?4.5:C,R=e.eventKey,p=e.content,N=e.closable,P=e.closeIcon,L=P===void 0?"x":P,f=e.props,m=e.onClick,b=e.onNoticeClose,A=e.times,v=e.hovering,w=a.useState(!1),M=H(w,2),E=M[0],g=M[1],S=v||E,c=function(){b(R)},h=function(l){(l.key==="Enter"||l.code==="Enter"||l.keyCode===Ae.ENTER)&&c()};a.useEffect(function(){if(!S&&k>0){var o=setTimeout(function(){c()},k*1e3);return function(){clearTimeout(o)}}},[k,S,A]);var n=a.useMemo(function(){return ve(N)==="object"&&N!==null?N:N?{closeIcon:L}:{}},[N,L]),t=Re(n,!0),s="".concat(d,"-notice");return a.createElement("div",J({},f,{ref:i,className:B(s,u,ae({},"".concat(s,"-closable"),N)),style:r,onMouseEnter:function(l){var y;g(!0),f==null||(y=f.onMouseEnter)===null||y===void 0||y.call(f,l)},onMouseLeave:function(l){var y;g(!1),f==null||(y=f.onMouseLeave)===null||y===void 0||y.call(f,l)},onClick:m}),a.createElement("div",{className:"".concat(s,"-content")},p),N&&a.createElement("a",J({tabIndex:0,className:"".concat(s,"-close"),onKeyDown:h,"aria-label":"Close"},t,{onClick:function(l){l.preventDefault(),l.stopPropagation(),c()}}),n.closeIcon))}),me=j.createContext({}),je=function(i){var d=i.children,r=i.classNames;return j.createElement(me.Provider,{value:{classNames:r}},d)},ce=8,le=3,ue=16,Me=function(i){var d={offset:ce,threshold:le,gap:ue};if(i&&ve(i)==="object"){var r,u,C;d.offset=(r=i.offset)!==null&&r!==void 0?r:ce,d.threshold=(u=i.threshold)!==null&&u!==void 0?u:le,d.gap=(C=i.gap)!==null&&C!==void 0?C:ue}return[!!i,d]},_e=["className","style","classNames","styles"],Pe=function(i){var d=i.configList,r=i.placement,u=i.prefixCls,C=i.className,k=i.style,R=i.motion,p=i.onAllNoticeRemoved,N=i.onNoticeClose,P=i.stack,L=a.useContext(me),f=L.classNames,m=a.useRef({}),b=a.useState(null),A=H(b,2),v=A[0],w=A[1],M=a.useState([]),E=H(M,2),g=E[0],S=E[1],c=d.map(function(x){return{config:x,key:String(x.key)}}),h=Me(P),n=H(h,2),t=n[0],s=n[1],o=s.offset,l=s.threshold,y=s.gap,I=t&&(g.length>0||c.length<=l),V=typeof R=="function"?R(r):R;return a.useEffect(function(){t&&g.length>1&&S(function(x){return x.filter(function(D){return c.some(function(G){var X=G.key;return D===X})})})},[g,c,t]),a.useEffect(function(){var x;if(t&&m.current[(x=c[c.length-1])===null||x===void 0?void 0:x.key]){var D;w(m.current[(D=c[c.length-1])===null||D===void 0?void 0:D.key])}},[c,t]),j.createElement(pe,J({key:r,className:B(u,"".concat(u,"-").concat(r),f==null?void 0:f.list,C,ae(ae({},"".concat(u,"-stack"),!!t),"".concat(u,"-stack-expanded"),I)),style:k,keys:c,motionAppear:!0},V,{onAllRemoved:function(){p(r)}}),function(x,D){var G=x.config,X=x.className,ye=x.style,Ce=x.index,ie=G,Y=ie.key,Ne=ie.times,_=String(Y),F=G,ge=F.className,ke=F.style,U=F.classNames,Q=F.styles,he=de(F,_e),Z=c.findIndex(function(z){return z.key===_}),q={};if(t){var K=c.length-1-(Z>-1?Z:Ce-1),re=r==="top"||r==="bottom"?"-50%":"0";if(K>0){var $,ee,te;q.height=I?($=m.current[_])===null||$===void 0?void 0:$.offsetHeight:v==null?void 0:v.offsetHeight;for(var se=0,ne=0;ne<K;ne++){var oe;se+=((oe=m.current[c[c.length-1-ne].key])===null||oe===void 0?void 0:oe.offsetHeight)+y}var xe=(I?se:K*o)*(r.startsWith("top")?1:-1),Ee=!I&&v!==null&&v!==void 0&&v.offsetWidth&&(ee=m.current[_])!==null&&ee!==void 0&&ee.offsetWidth?((v==null?void 0:v.offsetWidth)-o*2*(K<3?K:3))/((te=m.current[_])===null||te===void 0?void 0:te.offsetWidth):1;q.transform="translate3d(".concat(re,", ").concat(xe,"px, 0) scaleX(").concat(Ee,")")}else q.transform="translate3d(".concat(re,", 0, 0)")}return j.createElement("div",{ref:D,className:B("".concat(u,"-notice-wrapper"),X,U==null?void 0:U.wrapper),style:O(O(O({},ye),q),Q==null?void 0:Q.wrapper),onMouseEnter:function(){return S(function(T){return T.includes(_)?T:[].concat(W(T),[_])})},onMouseLeave:function(){return S(function(T){return T.filter(function(Se){return Se!==_})})}},j.createElement(be,J({},he,{ref:function(T){Z>-1?m.current[_]=T:delete m.current[_]},prefixCls:u,classNames:U,styles:Q,className:B(ge,f==null?void 0:f.notice),style:ke,times:Ne,key:Y,eventKey:Y,onNoticeClose:N,hovering:t&&g.length>0})))})},Ie=a.forwardRef(function(e,i){var d=e.prefixCls,r=d===void 0?"rc-notification":d,u=e.container,C=e.motion,k=e.maxCount,R=e.className,p=e.style,N=e.onAllRemoved,P=e.stack,L=e.renderNotifications,f=a.useState([]),m=H(f,2),b=m[0],A=m[1],v=function(t){var s,o=b.find(function(l){return l.key===t});o==null||(s=o.onClose)===null||s===void 0||s.call(o),A(function(l){return l.filter(function(y){return y.key!==t})})};a.useImperativeHandle(i,function(){return{open:function(t){A(function(s){var o=W(s),l=o.findIndex(function(V){return V.key===t.key}),y=O({},t);if(l>=0){var I;y.times=(((I=s[l])===null||I===void 0?void 0:I.times)||0)+1,o[l]=y}else y.times=0,o.push(y);return k>0&&o.length>k&&(o=o.slice(-k)),o})},close:function(t){v(t)},destroy:function(){A([])}}});var w=a.useState({}),M=H(w,2),E=M[0],g=M[1];a.useEffect(function(){var n={};b.forEach(function(t){var s=t.placement,o=s===void 0?"topRight":s;o&&(n[o]=n[o]||[],n[o].push(t))}),Object.keys(E).forEach(function(t){n[t]=n[t]||[]}),g(n)},[b]);var S=function(t){g(function(s){var o=O({},s),l=o[t]||[];return l.length||delete o[t],o})},c=a.useRef(!1);if(a.useEffect(function(){Object.keys(E).length>0?c.current=!0:c.current&&(N==null||N(),c.current=!1)},[E]),!u)return null;var h=Object.keys(E);return Le.createPortal(a.createElement(a.Fragment,null,h.map(function(n){var t=E[n],s=a.createElement(Pe,{key:n,configList:t,placement:n,prefixCls:r,className:R==null?void 0:R(n),style:p==null?void 0:p(n),motion:C,onNoticeClose:v,onAllNoticeRemoved:S,stack:P});return L?L(s,{prefixCls:r,key:n}):s})),u)}),He=["getContainer","motion","prefixCls","maxCount","className","style","onAllRemoved","stack","renderNotifications"],we=function(){return document.body},fe=0;function De(){for(var e={},i=arguments.length,d=new Array(i),r=0;r<i;r++)d[r]=arguments[r];return d.forEach(function(u){u&&Object.keys(u).forEach(function(C){var k=u[C];k!==void 0&&(e[C]=k)})}),e}function Fe(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=e.getContainer,d=i===void 0?we:i,r=e.motion,u=e.prefixCls,C=e.maxCount,k=e.className,R=e.style,p=e.onAllRemoved,N=e.stack,P=e.renderNotifications,L=de(e,He),f=a.useState(),m=H(f,2),b=m[0],A=m[1],v=a.useRef(),w=a.createElement(Ie,{container:b,ref:v,prefixCls:u,motion:r,maxCount:C,className:k,style:R,onAllRemoved:p,stack:N,renderNotifications:P}),M=a.useState([]),E=H(M,2),g=E[0],S=E[1],c=a.useMemo(function(){return{open:function(n){var t=De(L,n);(t.key===null||t.key===void 0)&&(t.key="rc-notification-".concat(fe),fe+=1),S(function(s){return[].concat(W(s),[{type:"open",config:t}])})},close:function(n){S(function(t){return[].concat(W(t),[{type:"close",key:n}])})},destroy:function(){S(function(n){return[].concat(W(n),[{type:"destroy"}])})}}},[]);return a.useEffect(function(){A(d())}),a.useEffect(function(){v.current&&g.length&&(g.forEach(function(h){switch(h.type){case"open":v.current.open(h.config);break;case"close":v.current.close(h.key);break;case"destroy":v.current.destroy();break}}),S(function(h){return h.filter(function(n){return!g.includes(n)})}))},[g]),[c,w]}const Ke=j.createContext({});export{Ke as A,be as N,je as a,Fe as u};