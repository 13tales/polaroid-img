let e,t,n=!1;const l="undefined"!=typeof window?window:{},s=l.document||{head:{}},o={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},r=e=>Promise.resolve(e),i=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),c=new WeakMap,u=e=>"sc-"+e.o,a={},f=e=>"object"==(e=typeof e)||"function"===e,$=(e,t,...n)=>{let l=null,s=!1,o=!1,r=[];const i=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?i(l):null!=l&&"boolean"!=typeof l&&((s="function"!=typeof e&&!f(l))&&(l+=""),s&&o?r[r.length-1].i+=l:r.push(s?h(null,l):l),o=s)};if(i(n),t){const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}const c=h(e,null);return c.u=t,r.length>0&&(c.$=r),c},h=(e,t)=>({t:0,h:e,i:t,p:null,$:null,u:null}),y={},d=(e,t,n,s,r,i)=>{if(n!==s){let c=_(e,t),u=t.toLowerCase();if("class"===t){const t=e.classList,l=m(n),o=m(s);t.remove(...l.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!l.includes(e))))}else if("style"===t){for(const t in n)s&&null!=s[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in s)n&&s[t]===n[t]||(t.includes("-")?e.style.setProperty(t,s[t]):e.style[t]=s[t])}else if("ref"===t)s&&s(e);else if(c||"o"!==t[0]||"n"!==t[1]){const l=f(s);if((c||l&&null!==s)&&!r)try{if(e.tagName.includes("-"))e[t]=s;else{let l=null==s?"":s;"list"===t?c=!1:null!=n&&e[t]==l||(e[t]=l)}}catch(e){}null==s||!1===s?!1===s&&""!==e.getAttribute(t)||e.removeAttribute(t):(!c||4&i||r)&&!l&&e.setAttribute(t,s=!0===s?"":s)}else t="-"===t[2]?t.slice(3):_(l,u)?u.slice(2):u[2]+t.slice(3),n&&o.rel(e,t,n,!1),s&&o.ael(e,t,s,!1)}},p=/\s/,m=e=>e?e.split(p):[],b=(e,t,n,l)=>{const s=11===t.p.nodeType&&t.p.host?t.p.host:t.p,o=e&&e.u||a,r=t.u||a;for(l in o)l in r||d(s,l,o[l],void 0,n,t.t);for(l in r)d(s,l,o[l],r[l],n,t.t)},w=(t,n,l)=>{let o,r,i=n.$[l],c=0;if(null!==i.i)o=i.p=s.createTextNode(i.i);else if(o=i.p=s.createElement(i.h),b(null,i,!1),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),i.$)for(c=0;c<i.$.length;++c)r=w(t,i,c),r&&o.appendChild(r);return o},S=(e,n,l,s,o,r)=>{let i,c=e;for(c.shadowRoot&&c.tagName===t&&(c=c.shadowRoot);o<=r;++o)s[o]&&(i=w(null,l,o),i&&(s[o].p=i,c.insertBefore(i,n)))},g=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.p,v(l),s.remove())},j=(e,t)=>e.h===t.h,M=(e,t)=>{const n=t.p=e.p,l=e.$,s=t.$,o=t.i;null===o?(b(e,t,!1),null!==l&&null!==s?((e,t,n,l)=>{let s,o=0,r=0,i=t.length-1,c=t[0],u=t[i],a=l.length-1,f=l[0],$=l[a];for(;o<=i&&r<=a;)null==c?c=t[++o]:null==u?u=t[--i]:null==f?f=l[++r]:null==$?$=l[--a]:j(c,f)?(M(c,f),c=t[++o],f=l[++r]):j(u,$)?(M(u,$),u=t[--i],$=l[--a]):j(c,$)?(M(c,$),e.insertBefore(c.p,u.p.nextSibling),c=t[++o],$=l[--a]):j(u,f)?(M(u,f),e.insertBefore(u.p,c.p),u=t[--i],f=l[++r]):(s=w(t&&t[r],n,r),f=l[++r],s&&c.p.parentNode.insertBefore(s,c.p));o>i?S(e,null==l[a+1]?null:l[a+1].p,n,l,r,a):r>a&&g(t,o,i)})(n,l,t,s):null!==s?(null!==e.i&&(n.textContent=""),S(n,null,t,s,0,s.length-1)):null!==l&&g(l,0,l.length-1)):e.i!==o&&(n.data=o)},v=e=>{e.u&&e.u.ref&&e.u.ref(null),e.$&&e.$.map(v)},k=(e,t)=>{t&&!e.m&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.m=t)))},C=(e,t)=>{if(e.t|=16,!(4&e.t))return k(e,e.S),Z((()=>O(e,t)));e.t|=512},O=(e,t)=>{const n=e.g;let l;return t&&(l=N(n,"componentWillLoad")),R(l,(()=>L(e,n,t)))},L=async(e,t,n)=>{const l=e.j,o=l["s-rc"];n&&(e=>{const t=e.M,n=e.j,l=t.t,o=((e,t)=>{let n=u(t),l=G.get(n);if(e=11===e.nodeType?e:s,l)if("string"==typeof l){let t,o=c.get(e=e.head||e);o||c.set(e,o=new Set),o.has(n)||(t=s.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"))})(e);P(e,t),o&&(o.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>x(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},P=(n,l)=>{try{l=l.render(),n.t&=-17,n.t|=2,((n,l)=>{const s=n.j,o=n.v||h(null,null),r=(e=>e&&e.h===y)(l)?l:$(null,null,l);t=s.tagName,r.h=null,r.t|=4,n.v=r,r.p=o.p=s.shadowRoot||s,e=s["s-sc"],M(o,r)})(n,l)}catch(e){z(e,n.j)}return null},x=e=>{const t=e.j,n=e.S;64&e.t||(e.t|=64,T(t),e.k(t),n||E()),e.m&&(e.m(),e.m=void 0),512&e.t&&Y((()=>C(e,!1))),e.t&=-517},E=()=>{T(s.documentElement),Y((()=>(e=>{const t=o.ce("appload",{detail:{namespace:"polaroid"}});return e.dispatchEvent(t),t})(l)))},N=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){z(e)}},R=(e,t)=>e&&e.then?e.then(t):t(),T=e=>e.classList.add("hydrated"),U=(e,t,n)=>{if(t.C){const l=Object.entries(t.C),s=e.prototype;if(l.map((([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(s,e,{get(){return((e,t)=>q(this).O.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=q(e),o=s.O.get(t),r=s.t,i=s.g;n=((e,t)=>null==e||f(e)?e:1&t?e+"":e)(n,l.C[t][0]),8&r&&void 0!==o||n===o||Number.isNaN(o)&&Number.isNaN(n)||(s.O.set(t,n),i&&2==(18&r)&&C(s,!1))})(this,e,n,t)},configurable:!0,enumerable:!0})})),1&n){const t=new Map;s.attributeChangedCallback=function(e,n,l){o.jmp((()=>{const n=t.get(e);if(this.hasOwnProperty(n))l=this[n],delete this[n];else if(s.hasOwnProperty(n)&&"number"==typeof this[n]&&this[n]==l)return;this[n]=(null!==l||"boolean"!=typeof this[n])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,n])=>{const l=n[1]||e;return t.set(l,e),l}))}}return e},W=(e,t={})=>{const n=[],r=t.exclude||[],c=l.customElements,a=s.head,f=a.querySelector("meta[charset]"),$=s.createElement("style"),h=[];let y,d=!0;Object.assign(o,t),o.l=new URL(t.resourcesUrl||"./",s.baseURI).href,e.map((e=>{e[1].map((t=>{const l={t:t[0],o:t[1],C:t[2],L:t[3]};l.C=t[2];const s=l.o,a=class extends HTMLElement{constructor(e){super(e),V(e=this,l),1&l.t&&e.attachShadow({mode:"open"})}connectedCallback(){y&&(clearTimeout(y),y=null),d?h.push(this):o.jmp((()=>(e=>{if(0==(1&o.t)){const t=q(e),n=t.M,l=()=>{};if(!(1&t.t)){t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){k(t,t.S=n);break}}n.C&&Object.entries(n.C).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=D(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(U(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){z(e)}t.t&=-9,e()}if(s.style){let e=s.style;const t=u(n);if(!G.has(t)){const l=()=>{};((e,t,n)=>{let l=G.get(e);i&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,G.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.S,r=()=>C(t,!0);o&&o["s-rc"]?o["s-rc"].push(r):r()})(0,t,n)}l()}})(this)))}disconnectedCallback(){o.jmp((()=>{}))}componentOnReady(){return q(this).P}};l.N=e[0],r.includes(s)||c.get(s)||(n.push(s),c.define(s,U(a,l,1)))}))})),$.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",$.setAttribute("data-styles",""),a.insertBefore($,f?f.nextSibling:a.firstChild),d=!1,h.length?h.map((e=>e.connectedCallback())):o.jmp((()=>y=setTimeout(E,30)))},A=e=>{const t=new URL(e,o.l);return t.origin!==l.location.origin?t.href:t.pathname},H=new WeakMap,q=e=>H.get(e),F=(e,t)=>H.set(t.g=e,t),V=(e,t)=>{const n={t:0,j:e,M:t,O:new Map};return n.P=new Promise((e=>n.k=e)),e["s-p"]=[],e["s-rc"]=[],H.set(e,n)},_=(e,t)=>t in e,z=(e,t)=>(0,console.error)(e,t),B=new Map,D=e=>{const t=e.o.replace(/-/g,"_"),n=e.N,l=B.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(B.set(n,e),e[t])),z)},G=new Map,I=[],J=[],K=(e,t)=>l=>{e.push(l),n||(n=!0,t&&4&o.t?Y(X):o.raf(X))},Q=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){z(e)}e.length=0},X=()=>{Q(I),Q(J),(n=I.length>0)&&o.raf(X)},Y=e=>r().then(e),Z=K(J,!0);export{y as H,W as b,A as g,$ as h,r as p,F as r}