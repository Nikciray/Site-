import{g as v,n as $,h as B,w as x,d as C,t as ee,k as L,e as oe,j as I,_ as ae,l as ne,p as K,M as G,q as J,s as Q,v as se,x as le,y as ie,z as de,A as W}from"./chunk-CVos-TWr.js";const q=t=>t.cause===null?t:q(t.cause),ce=(t,a)=>q(t.cause)===q(a.cause),ue=(t,a)=>(t.__reatom.connectHooks??=new Set).add(a),me=(t,a)=>(t.__reatom.disconnectHooks??=new Set).add(a),he=v((t,a,i,r)=>{t.cause.cause=q(t.cause),B.set(t.cause,r);const o=i(x({...t,controller:r,isConnected:()=>fe(t,a)}));return o instanceof Promise&&r.signal.addEventListener("abort",()=>o.catch($)),o},"_onConnect"),V=(t,a)=>{const i=o=>{const m=new AbortController,u=he(o,t,a,m);u instanceof Promise&&u.catch($);const n=s=>{ce(o,s)&&e.delete(n)&&r.has(i)&&(m.abort(ee("disconnect "+t.__reatom.name)),typeof u=="function"&&u())},e=me(t,n)},r=ue(t,i);return()=>r.delete(i)},fe=(t,{__reatom:a})=>t.get(i=>{const r=a.patch??i(a);return!!r&&r.subs.size+r.listeners.size>0}),pe=C(null,"initializations");pe.__reatom.initState=()=>new WeakMap;const te=t=>a=>L(a,t(a,a.__reatom.name)),ge=(t=new Map,a)=>{const i=t instanceof Map?t:new Map(t);return C(i,a).pipe(te((r,o)=>{const m=v((n,e,s)=>(u.set(n,e,s),s),`${o}.getOrCreate`),u={get:(n,e)=>n.get(r).get(e),getOrCreate:(n,e,s)=>u.has(n,e)?u.get(n,e):m(n,e,s()),has:(n,e)=>n.get(r).has(e),set:v((n,e,s)=>r(n,p=>{const P=p.get(e);return Object.is(P,s)&&(s!==void 0||p.has(e))?p:new Map(p).set(e,s)}),`${o}.set`),delete:v((n,e)=>r(n,s=>{if(!s.has(e))return s;const p=new Map(s);return p.delete(e),p}),`${o}.delete`),clear:v(n=>r(n,new Map),`${o}.clear`),reset:v(n=>r(n,i),`${o}.reset`),sizeAtom:C(n=>n.spy(r).size,`${o}.size`)};return u}))},be=({id:t})=>{const a=`tl-search-form-${t}`,i=(m,u)=>{var n=["ru-ibe.tlintegration.ru","ibe.tlintegration.ru","ibe.tlintegration.com"],e=m.travelline=m.travelline||{},s=e.integration=e.integration||{};if(s.__cq=s.__cq?s.__cq.concat(u):u,!s.__loader){let b=function(k,w){return function(){m.TL||(P.removeChild(k),w())}};s.__loader=!0;var p=m.document,P=p.getElementsByTagName("head")[0]||p.getElementsByTagName("body")[0];(function k(w){if(w.length!==0){var E=p.createElement("script");E.type="text/javascript",E.async=!0,E.src="https://"+w[0]+"/integration/loader.js",E.onerror=E.onload=b(E,function(){k(w.slice(1,w.length))}),P.appendChild(E)}})(n)}},r=m=>{i(m,[["setContext","TL-INT-github_2025-09-16","ru"],["embed","search-form",{container:a}]])};return oe.useEffect(()=>{r(window)},[]),I.jsxs(I.Fragment,{children:[I.jsx("style",{children:`
    #block-search,
    #block-search * {
      box-sizing: border-box;
    }
    #tl-block-search-wrapper {
    position: relative;
    width: 100%;
    }
    #block-search {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(40px);
      max-width: 1040px;
      margin: 0 auto;
      border-radius: 30px;
    }
    #tl-block-search-wrapper:has(#tl-search-form-main) {
      top: 65px;
    }
    #tl-block-search-wrapper:has(#tl-search-form-mobile) {
      padding: 30px 0 0;
    }
    #tl-block-search-wrapper:has(#tl-search-form-detail) {
      padding: 30px 0 0;
    }
    #tl-block-search-wrapper:has(#tl-search-form-inner) {
      padding: 0 0 30px;
    }
    #block-search:has(#tl-search-form-mobile),
    #block-search:has(#tl-search-form-inner),
    #block-search:has(#tl-search-form-detail) {
       background: #d2e0f5;
    }
    #block-search:has(#tl-search-form-inner) {
       max-width: 1376px;
    }
    #block-search:has(#tl-search-form-detail) {
       max-width: 1100px;
    }
    .tl-container {
      padding: 0 25px;
    }
    @media screen and (max-width: 1240px) {
      #tl-block-search-wrapper:has(#tl-search-form-detail) {
        padding: 30px 20px 0;
      }
    }
    @media screen and (min-width: 1221px) {
      #tl-block-search-wrapper:has(#tl-search-form-mobile) {
        display: none;
      }
    }
    @media screen and (max-width: 1220px) {
      #tl-block-search-wrapper:has(#tl-search-form-main) {
        display: none;
      }

    }
    
    [class*="viewing"],
    [class*="viewer"],
    [class*="people"],
    [class*="currently"],
    [class*="просматривают"],
    [class*="человек"],
    div[style*="position: fixed"][style*="bottom"],
    div[style*="position: fixed"][style*="left"] {
      display: none !important;
      visibility: hidden !important;
    }
    
    .tl-viewing-banner,
    .tl-social-proof,
    .tl-notification,
    [data-tl="viewing"],
    [data-tl="notification"] {
      display: none !important;
    }
  `}),I.jsx("div",{id:"tl-block-search-wrapper",children:I.jsx("div",{id:"block-search",children:I.jsx("div",{id:a,className:"tl-container",children:I.jsx("a",{href:"https://www.travelline.ru/products/tl-hotel/",rel:"nofollow",target:"_blank",children:"TravelLine"})})})})]})},H=(t,a,{shouldPending:i=!0,shouldFulfill:r=!0,shouldReject:o=!0,effect:m=t.__reatom.unstable_fn}={})=>{const u=t.pendingAtom,[n]=a;i&&u(n,s=>++s);const e=n.schedule(()=>new Promise((s,p)=>{se(n.controller),m(...a).then(s,p),n.controller.signal.addEventListener("abort",()=>p(ee(n.controller.signal.reason)))}));return L(K(n,e,s=>{r&&t.onFulfill(n,s),i&&u(n,p=>--p)},s=>{o&&!W(s)&&t.onReject(n,s),i&&u(n,p=>--p)}),{controller:n.controller})},Y=-1,ve=({ignoreAbort:t=!0,length:a=5,paramsLength:i,staleTime:r=3e5,swr:o=!0,withPersist:m,paramsToKey:u,isEqual:n=(e,s,p)=>J(s,p)}={})=>e=>{if(!e.cacheAtom){const s=!!o,{shouldPending:p=!1,shouldFulfill:P=s,shouldReject:b=!1}=o;r!==1/0&&(r=Math.min(G,r));const k=u?(l,c,d=l.get(_))=>{const h=u(l,c);return{cached:d.get(h),key:h}}:(l,c,d=l.get(_))=>{for(const[h,f]of d)if(n(l,h,c))return{cached:f,key:h};return{cached:void 0,key:c}},w=(l,c=l.get(_))=>{for(const h of c.values())if(h.version>0&&(!d||h.lastUpdate>d.lastUpdate))var d=h;return d},E=l=>{for(const[h,f]of l)if(!d||d.lastUpdate>f.lastUpdate)var c=h,d=f;d&&l.delete(c)},j=(l,c,d=r)=>{const h=r===1/0?Y:le(()=>{_.get(l,c)?.clearTimeoutId===h&&_.delete(l,c)},d);return h.unref?.(),l.schedule(()=>clearTimeout(h),-1),h},_=e.cacheAtom=ge(new Map,`${e.__reatom.name}._cacheAtom`).pipe(te((l,c)=>({setWithParams:v((d,h,f)=>{const{cached:g,key:S}=k(d,h);clearTimeout(g?.clearTimeoutId),_.set(d,S,{clearTimeoutId:j(d,S),promise:void 0,value:f,version:g?g.version+1:1,controller:new AbortController,lastUpdate:Date.now(),params:h})}),deleteWithParams:v((d,h)=>{const{cached:f,key:g}=k(d,h);f&&_.delete(d,g)})})));_.invalidate=v(l=>{const c=w(l);return _.clear(l),"promiseAtom"in e?e(l):c?e(l,...c.params):null},`${_.__reatom.name}.invalidate`),_.options={ignoreAbort:t,length:a,paramsLength:i,staleTime:r,swr:s,withPersist:m},m&&_.pipe(m({key:_.__reatom.name,fromSnapshot:(l,c,d=new Map)=>{if(c.length<=d?.size&&c.every(([,{params:f,value:g}])=>{const{cached:S}=k(l,f,d);return!!S&&J(S.value,g)}))return d;const h=new Map(c);for(const[f,g]of h)r-(Date.now()-g.lastUpdate)<=0?h.delete(f):(clearTimeout(g.clearTimeoutId),g.clearTimeoutId=j(l,f,r-(Date.now()-g.lastUpdate)));for(const[f,g]of d)if(g.promise){const{cached:S}=k(l,g.params,h);S?S.promise=g.promise:h.set(f,g)}return h},time:Math.min(r,G),toSnapshot:(l,c)=>[...c].filter(([,d])=>!d.promise)}));const M=e.swrPendingAtom=C(0,`${e.__reatom.name}.swrPendingAtom`),T=(l,c,d,h)=>{clearTimeout(d.clearTimeoutId),d.clearTimeoutId=j(l,c);const f=()=>_.get(l,c)?.clearTimeoutId===d.clearTimeoutId,{unstable_fn:g}=e.__reatom;let S,O;return d.promise=new Promise(function(){return[S,O]=[].slice.call(arguments)}),function(){try{let z=function(){return d.promise};var F;F=[].slice.call(arguments);const D=(function(X,U){try{var A=Promise.resolve(t?ie(F[0],function(R){return g({...R,controller:Q(R.cause)},...[].slice.call(arguments,1))},F.slice(1)):g(...F)).then(function(R){S(R),l.get(()=>{f()&&_.set(l,c,{...d,promise:void 0,value:R,version:d.version+1}),h&&M(l,re=>re-1)})})}catch(R){return U(R)}return A&&A.then?A.then(void 0,U):A})(0,function(X){O(X),l.get(()=>{f()&&(d.version>0?_.set(l,c,{...d,promise:void 0}):_.delete(l,c)),h&&M(l,U=>U-1)})});return Promise.resolve(D&&D.then?D.then(z):z())}catch(z){return Promise.reject(z)}}};if(e._handleCache=v(function(){var l=[].slice.call(arguments);const[c]=l,d=Q(c.cause.cause);B.set(c.cause,c.controller=d);const h=l.slice(1,1+(i??l.length));let{cached:f={clearTimeoutId:Y,promise:void 0,value:void 0,version:0,controller:d,lastUpdate:-1,params:[]},key:g}=k(c,h);const S=f.controller;f={...f,lastUpdate:Date.now(),params:h,controller:d};const O=_.set(c,g,f);return O.size>a&&E(O),f.version===0&&!f.promise||f.promise&&S.signal.aborted?H(e,l,{effect:T(c,g,f,!1)}):(f.version>0&&e.onFulfill(c,f.value),f.promise||!s?H(e,l,{effect:function(){try{return Promise.resolve(f.promise??f.value)}catch(F){return Promise.reject(F)}},shouldPending:!1,shouldFulfill:P,shouldReject:b}):(s&&M(c,F=>F+1),H(e,l,{effect:T(c,g,f,s),shouldPending:p,shouldFulfill:P,shouldReject:b})))},`${e.__reatom.name}._handleCache`),"dataAtom"in e){const{initState:l}=e.dataAtom.__reatom;e.dataAtom.__reatom.initState=c=>{const d=w(c),h=l(c);return d?e.dataAtom.mapFulfill?e.dataAtom.mapFulfill(c,d.value,h):d.value:h}}m&&"dataAtom"in e&&V(e.dataAtom,l=>l.subscribe(_,()=>{}))}return e},N=t=>a=>{const i=t(a);return de(a,i)?a:i},Z={isPending:!1,isFulfilled:!1,isRejected:!1,isSettled:!1,isFirstPending:!1,isEverPending:!1,isEverSettled:!1},we=()=>t=>{if(!t.statusesAtom){const a=C(new WeakSet,`${t.__reatom.name}.statusesAtom._relatedPromisesAtom`),i=C(null,`${t.__reatom.name}.statusesAtom._lastSettledStatusAtom`),r=C(Z,`${t.__reatom.name}.statusesAtom`);r.__reatom.computer=(o,m)=>(o.spy(t,({payload:u})=>{o.get(a).add(u);const n=o.get(t.pendingAtom);m=N(e=>({isPending:n>0,isFulfilled:!1,isRejected:!1,isSettled:!1,isFirstPending:!e.isEverPending,isEverPending:!0,isEverSettled:e.isEverSettled}))(m)}),m),t.statusesAtom=Object.assign(r,{reset:v(o=>(a(o,new Set),r(o,Z)))}),t.onCall((o,m)=>{o.get(r),K(o,m,()=>{o.get(a).has(m)&&(r(o,N(()=>{const u=o.get(t.pendingAtom)>0;return{isPending:u,isFulfilled:!u,isRejected:!1,isSettled:!u,isFirstPending:!1,isEverPending:!0,isEverSettled:!0}})),i(o,"fulfilled"))},u=>{if(o.get(a).has(m)){const n=o.get(t.pendingAtom)>0;r(o,N(e=>{if(W(u)){const s=o.get(i);return e.isEverSettled&&!n?{isPending:n,isFulfilled:s==="fulfilled",isRejected:s==="rejected",isSettled:!0,isFirstPending:!1,isEverPending:!0,isEverSettled:!0}:{isPending:n,isFulfilled:!1,isRejected:!1,isSettled:!1,isFirstPending:!1,isEverPending:!0,isEverSettled:e.isEverSettled}}return{isPending:n,isFulfilled:!1,isRejected:!n,isSettled:!n,isFirstPending:!1,isEverPending:!0,isEverSettled:!0}})),W(u)||i(o,"rejected")}})})}return t},y=(t,a={})=>{const{name:i=ae("async"),onEffect:r,onFulfill:o,onReject:m,onSettle:u}=typeof a=="string"?{name:a}:a,n=C(0,`${i}.pendingAtom`),e=Object.assign(function(){var b=[].slice.call(arguments);return b[0].get((k,w)=>{const{state:E}=w(b[0],e.__reatom,(j,_)=>{B.set(j.cause,j.controller=new AbortController);const M=ne(b[0],l=>{T?.catch($),j.controller.abort(l)});M&&j.controller.signal.addEventListener("abort",M),b[0]=x(j);var T=e._handleCache?e._handleCache(...b):H(e,b);K(j,T,void 0,()=>{p.__reatom.updateHooks.size>1&&T.catch($)}),_.state=[..._.state,{params:b.slice(1),payload:T}]});return E[E.length-1].payload})},v(t,i)),s=v(`${i}.onFulfill`),p=v(`${i}.onReject`),P=v(`${i}._onSettle`);return s.onCall(b=>P(b)),p.onCall(b=>P(b)),r&&e.onCall((b,k,w)=>r(b,w,k)),o&&s.onCall(o),m&&p.onCall(m),u&&P.onCall(u),V(n,b=>b.subscribe(e,$)),L(e,{onFulfill:s,onReject:p,onSettle:P,pendingAtom:n})};y.from=(t,a={})=>(t.name.length>2&&(typeof a=="object"?a.name??=t.name:a??=t.name),y(function(i){return t(...[].slice.call(arguments,1))},a));const Se=(t,a)=>i=>{if(!i.dataAtom){const r=i.dataAtom=Object.assign(C(t,`${i.__reatom.name}.dataAtom`),{reset:v(o=>{r(o,t)},`${i.__reatom.name}.dataAtom.reset`),mapFulfill:a});r.__reatom.computer=(o,m)=>(o.spy(i.onFulfill,({payload:u})=>{m=a?a(o,u,m):u}),m),i.onFulfill.onCall(o=>{o.get(r)}),V(r,o=>o.subscribe(i,$))}return i},Pe=(t=(r,o)=>o instanceof Error?o:new Error(String(o)),{initState:a,resetTrigger:i="onEffect"}={})=>r=>{if(!r.errorAtom){const o=`${r.__reatom.name}.errorAtom`,m=i&&{...r,onEffect:r}[i],u=r.errorAtom=L(C(a,o),{reset:v(e=>{u(e,a)},`${o}.reset`)});u.__reatom.computer=(e,s)=>(m&&e.spy(m,p=>{s=a}),e.spy(r.onReject,({payload:p})=>{s=t(e,p)}),s);const n=[r.onReject];m&&n.push(m),n.forEach(e=>e.onChange(s=>{s.get(u)}))}return r};export{be as T,ve as a,we as b,Pe as c,y as r,Se as w};
