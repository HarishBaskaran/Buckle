(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2888],{1118:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(5791)}])},5791:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return eO}});var i,n=r(5893);r(5303);var o=r(9008),l=r.n(o),a=r(7294);let s={prefix:String(Math.round(1e10*Math.random())),current:0},d=a.createContext(s);function c(e){let t=(0,a.useContext)(d),r=(0,a.useMemo)(()=>({prefix:t===s?"":`${t.prefix}-${++t.current}`,current:0}),[t]);return a.createElement(d.Provider,{value:r},e.children)}"undefined"!=typeof window&&window.document&&window.document.createElement,r(3935),"undefined"!=typeof window&&window.visualViewport,new WeakMap,"undefined"!=typeof window&&window.visualViewport,"undefined"!=typeof window&&window.visualViewport;let p=a.createContext(null);function g(e){let{children:t}=e,r=(0,a.useContext)(p),[i,n]=(0,a.useState)(0),o=(0,a.useMemo)(()=>({parent:r,modalCount:i,addModal(){n(e=>e+1),r&&r.addModal()},removeModal(){n(e=>e-1),r&&r.removeModal()}}),[r,i]);return a.createElement(p.Provider,{value:o},t)}function m(e){let t;let{modalProviderProps:r}={modalProviderProps:{"aria-hidden":!!(t=(0,a.useContext)(p))&&t.modalCount>0||null}};return a.createElement("div",{"data-overlay-container":!0,...e,...r})}function u(e){return a.createElement(g,null,a.createElement(m,e))}new WeakMap;var h="colors",f="sizes",b="space",x={gap:b,gridGap:b,columnGap:b,gridColumnGap:b,rowGap:b,gridRowGap:b,inset:b,insetBlock:b,insetBlockEnd:b,insetBlockStart:b,insetInline:b,insetInlineEnd:b,insetInlineStart:b,margin:b,marginTop:b,marginRight:b,marginBottom:b,marginLeft:b,marginBlock:b,marginBlockEnd:b,marginBlockStart:b,marginInline:b,marginInlineEnd:b,marginInlineStart:b,padding:b,paddingTop:b,paddingRight:b,paddingBottom:b,paddingLeft:b,paddingBlock:b,paddingBlockEnd:b,paddingBlockStart:b,paddingInline:b,paddingInlineEnd:b,paddingInlineStart:b,top:b,right:b,bottom:b,left:b,scrollMargin:b,scrollMarginTop:b,scrollMarginRight:b,scrollMarginBottom:b,scrollMarginLeft:b,scrollMarginX:b,scrollMarginY:b,scrollMarginBlock:b,scrollMarginBlockEnd:b,scrollMarginBlockStart:b,scrollMarginInline:b,scrollMarginInlineEnd:b,scrollMarginInlineStart:b,scrollPadding:b,scrollPaddingTop:b,scrollPaddingRight:b,scrollPaddingBottom:b,scrollPaddingLeft:b,scrollPaddingX:b,scrollPaddingY:b,scrollPaddingBlock:b,scrollPaddingBlockEnd:b,scrollPaddingBlockStart:b,scrollPaddingInline:b,scrollPaddingInlineEnd:b,scrollPaddingInlineStart:b,fontSize:"fontSizes",background:h,backgroundColor:h,backgroundImage:h,borderImage:h,border:h,borderBlock:h,borderBlockEnd:h,borderBlockStart:h,borderBottom:h,borderBottomColor:h,borderColor:h,borderInline:h,borderInlineEnd:h,borderInlineStart:h,borderLeft:h,borderLeftColor:h,borderRight:h,borderRightColor:h,borderTop:h,borderTopColor:h,caretColor:h,color:h,columnRuleColor:h,fill:h,outline:h,outlineColor:h,stroke:h,textDecorationColor:h,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:f,minBlockSize:f,maxBlockSize:f,inlineSize:f,minInlineSize:f,maxInlineSize:f,width:f,minWidth:f,maxWidth:f,height:f,minHeight:f,maxHeight:f,flexBasis:f,gridTemplateColumns:f,gridTemplateRows:f,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},$=(e,t)=>"function"==typeof t?{"()":Function.prototype.toString.call(t)}:t,y=()=>{let e=Object.create(null);return(t,r,...i)=>{let n=JSON.stringify(t,$);return n in e?e[n]:e[n]=r(t,...i)}},S=Symbol.for("sxs.internal"),w=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),k=e=>{for(let t in e)return!0;return!1},{hasOwnProperty:B}=Object.prototype,v=e=>e.includes("-")?e:e.replace(/[A-Z]/g,e=>"-"+e.toLowerCase()),E=/\s+(?![^()]*\))/,C=e=>t=>e(..."string"==typeof t?String(t).split(E):[t]),F={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:C((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e})),marginInline:C((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e})),maxSize:C((e,t)=>({maxBlockSize:e,maxInlineSize:t||e})),minSize:C((e,t)=>({minBlockSize:e,minInlineSize:t||e})),paddingBlock:C((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e})),paddingInline:C((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e}))},W=/([\d.]+)([^]*)/,z=(e,t)=>e.length?e.reduce((e,r)=>(e.push(...t.map(e=>e.includes("&")?e.replace(/&/g,/[ +>|~]/.test(r)&&/&.*&/.test(e)?`:is(${r})`:r):r+" "+e)),e),[]):t,R=(e,t)=>e in I&&"string"==typeof t?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,(t,r,i,n)=>r+("stretch"===i?`-moz-available${n};${v(e)}:${r}-webkit-fill-available`:`-moz-fit-content${n};${v(e)}:${r}fit-content`)+n):String(t),I={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},j=e=>e?e+"-":"",M=(e,t,r)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,(e,i,n,o,l)=>"$"==o==!!n?e:(i||"--"==o?"calc(":"")+"var(--"+("$"===o?j(t)+(l.includes("$")?"":j(r))+l.replace(/\$/g,"-"):l)+")"+(i||"--"==o?"*"+(i||"")+(n||"1")+")":"")),A=/\s*,\s*(?![^()]*\))/,L=Object.prototype.toString,T=(e,t,r,i,n)=>{let o,l,a;let s=(e,t,r)=>{let d,c;let p=e=>{var g;for(d in e){let m=64===d.charCodeAt(0),u=m&&Array.isArray(e[d])?e[d]:[e[d]];for(c of u){let e=/[A-Z]/.test(g=d)?g:g.replace(/-[^]/g,e=>e[1].toUpperCase()),u="object"==typeof c&&c&&c.toString===L&&(!i.utils[e]||!t.length);if(e in i.utils&&!u){let t=i.utils[e];if(t!==l){l=t,p(t(c)),l=null;continue}}else if(e in F){let t=F[e];if(t!==a){a=t,p(t(c)),a=null;continue}}if(m&&(d=(d.slice(1) in i.media?"@media "+i.media[d.slice(1)]:d).replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,(e,t,r,i,n,o)=>{let l=W.test(t),a=.0625*(l?-1:1),[s,d]=l?[i,t]:[t,i];return"("+("="===r[0]?"":">"===r[0]===l?"max-":"min-")+s+":"+("="!==r[0]&&1===r.length?d.replace(W,(e,t,i)=>Number(t)+a*(">"===r?1:-1)+i):d)+(n?") and ("+(">"===n[0]?"min-":"max-")+s+":"+(1===n.length?o.replace(W,(e,t,r)=>Number(t)+a*(">"===n?-1:1)+r):o):"")+")"})),u){let e=m?r.concat(d):[...r],i=m?[...t]:z(t,d.split(A));void 0!==o&&n(D(...o)),o=void 0,s(c,i,e)}else void 0===o&&(o=[[],t,r]),d=m||36!==d.charCodeAt(0)?d:`--${j(i.prefix)}${d.slice(1).replace(/\$/g,"-")}`,c=u?c:"number"==typeof c?c&&e in H?String(c)+"px":String(c):M(R(e,null==c?"":c),i.prefix,i.themeMap[e]),o[0].push(`${m?`${d} `:`${v(d)}:`}${c}`)}}};p(e),void 0!==o&&n(D(...o)),o=void 0};s(e,t,r)},D=(e,t,r)=>`${r.map(e=>`${e}{`).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(r.length?r.length+1:0).join("}")}`,H={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},P=e=>String.fromCharCode(e+(e>25?39:97)),O=e=>(e=>{let t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=P(t%52)+r;return P(t%52)+r})(((e,t)=>{let r=t.length;for(;r;)e=33*e^t.charCodeAt(--r);return e})(5381,JSON.stringify(e))>>>0),N=["themed","global","styled","onevar","resonevar","allvar","inline"],V=e=>{if(e.href&&!e.href.startsWith(location.origin))return!1;try{return!!e.cssRules}catch(e){return!1}},_=e=>{let t;let r=()=>{let{cssRules:e}=t.sheet;return[].map.call(e,(r,i)=>{let{cssText:n}=r,o="";if(n.startsWith("--sxs"))return"";if(e[i-1]&&(o=e[i-1].cssText).startsWith("--sxs")){if(!r.cssRules.length)return"";for(let e in t.rules)if(t.rules[e].group===r)return`--sxs{--sxs:${[...t.rules[e].cache].join(" ")}}${n}`;return r.cssRules.length?`${o}${n}`:""}return n}).join("")},i=()=>{if(t){let{rules:e,sheet:r}=t;if(!r.deleteRule){for(;3===Object(Object(r.cssRules)[0]).type;)r.cssRules.splice(0,1);r.cssRules=[]}for(let t in e)delete e[t]}let n=Object(e).styleSheets||[];for(let e of n)if(V(e)){for(let n=0,o=e.cssRules;o[n];++n){let l=Object(o[n]);if(1!==l.type)continue;let a=Object(o[n+1]);if(4!==a.type)continue;++n;let{cssText:s}=l;if(!s.startsWith("--sxs"))continue;let d=s.slice(14,-3).trim().split(/\s+/),c=N[d[0]];c&&(t||(t={sheet:e,reset:i,rules:{},toString:r}),t.rules[c]={group:a,index:n,cache:new Set(d)})}if(t)break}if(!t){let n=(e,t)=>({type:t,cssRules:[],insertRule(e,t){this.cssRules.splice(t,0,n(e,{import:3,undefined:1}[(e.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4))},get cssText(){return"@media{}"===e?`@media{${[].map.call(this.cssRules,e=>e.cssText).join("")}}`:e}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:n("","text/css"),rules:{},reset:i,toString:r}}let{sheet:o,rules:l}=t;for(let e=N.length-1;e>=0;--e){let t=N[e];if(!l[t]){let r=N[e+1],i=l[r]?l[r].index:o.cssRules.length;o.insertRule("@media{}",i),o.insertRule(`--sxs{--sxs:${e}}`,i),l[t]={group:o.cssRules[i+1],index:i,cache:new Set([e])}}G(l[t])}};return i(),t},G=e=>{let t=e.group,r=t.cssRules.length;e.apply=e=>{try{t.insertRule(e,r),++r}catch(e){}}},U=Symbol(),X=y(),q=(e,t)=>X(e,()=>(...r)=>{let i={type:null,composers:new Set};for(let t of r)if(null!=t){if(t[S])for(let e of(null==i.type&&(i.type=t[S].type),t[S].composers))i.composers.add(e);else t.constructor!==Object||t.$$typeof?null==i.type&&(i.type=t):i.composers.add(Y(t,e))}return null==i.type&&(i.type="span"),i.composers.size||i.composers.add(["PJLV",{},[],[],{},[]]),J(e,i,t)}),Y=({variants:e,compoundVariants:t,defaultVariants:r,...i},n)=>{let o=`${j(n.prefix)}c-${O(i)}`,l=[],a=[],s=Object.create(null),d=[];for(let e in r)s[e]=String(r[e]);if("object"==typeof e&&e)for(let t in e){B.call(s,t)||(s[t]="undefined");let r=e[t];for(let e in r){let i={[t]:String(e)};"undefined"===String(e)&&d.push(t);let n=r[e],o=[i,n,!k(n)];l.push(o)}}if("object"==typeof t&&t)for(let e of t){let{css:t,...r}=e;for(let e in t="object"==typeof t&&t||{},r)r[e]=String(r[e]);let i=[r,t,!k(t)];a.push(i)}return[o,i,l,a,s,d]},J=(e,t,r)=>{let[i,n,o,l]=Z(t.composers),a="function"==typeof t.type||t.type.$$typeof?(e=>{function t(){for(let r=0;r<t[U].length;r++){let[i,n]=t[U][r];e.rules[i].apply(n)}return t[U]=[],null}return t[U]=[],t.rules={},N.forEach(e=>t.rules[e]={apply:r=>t[U].push([e,r])}),t})(r):null,s=(a||r).rules,d=`.${i}${n.length>1?`:where(.${n.slice(1).join(".")})`:""}`,c=c=>{c="object"==typeof c&&c||Q;let{css:p,...g}=c,m={};for(let e in o)if(delete g[e],e in c){let t=c[e];"object"==typeof t&&t?m[e]={"@initial":o[e],...t}:(t=String(t),m[e]="undefined"!==t||l.has(e)?t:o[e])}else m[e]=o[e];let u=new Set([...n]);for(let[i,n,o,l]of t.composers){r.rules.styled.cache.has(i)||(r.rules.styled.cache.add(i),T(n,[`.${i}`],[],e,e=>{s.styled.apply(e)}));let t=K(o,m,e.media),a=K(l,m,e.media,!0);for(let n of t)if(void 0!==n)for(let[t,o,l]of n){let n=`${i}-${O(o)}-${t}`;u.add(n);let a=(l?r.rules.resonevar:r.rules.onevar).cache,d=l?s.resonevar:s.onevar;a.has(n)||(a.add(n),T(o,[`.${n}`],[],e,e=>{d.apply(e)}))}for(let t of a)if(void 0!==t)for(let[n,o]of t){let t=`${i}-${O(o)}-${n}`;u.add(t),r.rules.allvar.cache.has(t)||(r.rules.allvar.cache.add(t),T(o,[`.${t}`],[],e,e=>{s.allvar.apply(e)}))}}if("object"==typeof p&&p){let t=`${i}-i${O(p)}-css`;u.add(t),r.rules.inline.cache.has(t)||(r.rules.inline.cache.add(t),T(p,[`.${t}`],[],e,e=>{s.inline.apply(e)}))}for(let e of String(c.className||"").trim().split(/\s+/))e&&u.add(e);let h=g.className=[...u].join(" ");return{type:t.type,className:h,selector:d,props:g,toString:()=>h,deferredInjector:a}};return w(c,{className:i,selector:d,[S]:t,toString:()=>(r.rules.styled.cache.has(i)||c(),i)})},Z=e=>{let t="",r=[],i={},n=[];for(let[o,,,,l,a]of e)for(let e in""===t&&(t=o),r.push(o),n.push(...a),l){let t=l[e];(void 0===i[e]||"undefined"!==t||a.includes(t))&&(i[e]=t)}return[t,r,i,new Set(n)]},K=(e,t,r,i)=>{let n=[];e:for(let[o,l,a]of e){if(a)continue;let e,s=0,d=!1;for(e in o){let i=o[e],n=t[e];if(n!==i){if("object"!=typeof n||!n)continue e;{let e,t,o=0;for(let l in n){if(i===String(n[l])){if("@initial"!==l){let e=l.slice(1);(t=t||[]).push(e in r?r[e]:l.replace(/^@media ?/,"")),d=!0}s+=o,e=!0}++o}if(t&&t.length&&(l={["@media "+t.join(", ")]:l}),!e)continue e}}}(n[s]=n[s]||[]).push([i?"cv":`${e}-${o[e]}`,l,d])}return n},Q={},ee=y(),et=(e,t)=>ee(e,()=>(...r)=>{let i=()=>{for(let i of r){let r=O(i="object"==typeof i&&i||{});if(!t.rules.global.cache.has(r)){if(t.rules.global.cache.add(r),"@import"in i){let e=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let r of[].concat(i["@import"]))r=r.includes('"')||r.includes("'")?r:`"${r}"`,t.sheet.insertRule(`@import ${r};`,e++);delete i["@import"]}T(i,[],[],e,e=>{t.rules.global.apply(e)})}}return""};return w(i,{toString:i})}),er=y(),ei=(e,t)=>er(e,()=>r=>{let i=`${j(e.prefix)}k-${O(r)}`,n=()=>{if(!t.rules.global.cache.has(i)){t.rules.global.cache.add(i);let n=[];T(r,[],[],e,e=>n.push(e));let o=`@keyframes ${i}{${n.join("")}}`;t.rules.global.apply(o)}return i};return w(n,{get name(){return n()},toString:n})}),en=class{constructor(e,t,r,i){this.token=null==e?"":String(e),this.value=null==t?"":String(t),this.scale=null==r?"":String(r),this.prefix=null==i?"":String(i)}get computedValue(){return"var("+this.variable+")"}get variable(){return"--"+j(this.prefix)+j(this.scale)+this.token}toString(){return this.computedValue}},eo=y(),el=(e,t)=>eo(e,()=>(r,i)=>{i="object"==typeof r&&r||Object(i);let n=`.${r=(r="string"==typeof r?r:"")||`${j(e.prefix)}t-${O(i)}`}`,o={},l=[];for(let t in i)for(let r in o[t]={},i[t]){let n=`--${j(e.prefix)}${t}-${r}`,a=M(String(i[t][r]),e.prefix,t);o[t][r]=new en(r,a,t,e.prefix),l.push(`${n}:${a}`)}let a=()=>{if(l.length&&!t.rules.themed.cache.has(r)){t.rules.themed.cache.add(r);let n=`${i===e.theme?":root,":""}.${r}{${l.join(";")}}`;t.rules.themed.apply(n)}return r};return{...o,get className(){return a()},selector:n,toString:a}}),ea=y(),es=y();let ed={fonts:{sans:"-apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif;",mono:"Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono','Courier New', monospace;"},fontSizes:{xs:"0.75rem",sm:"0.875rem",base:"1rem",md:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem","6xl":"3.75rem","7xl":"4.5rem","8xl":"6rem","9xl":"8rem"},fontWeights:{hairline:100,thin:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900},lineHeights:{xs:1,sm:1.25,base:1.5,md:1.5,lg:1.75,xl:1.75,"2xl":2,"3xl":2.25,"4xl":2.5,"5xl":1,"6xl":1,"7xl":1,"8xl":1,"9xl":1},letterSpacings:{tighter:"-0.05em",tight:"-0.025em",normal:"0",wide:"0.025em",wider:"0.05em",widest:"0.1em"},space:{0:"0rem",xs:"0.5rem",sm:"0.75rem",md:"1rem",lg:"1.25rem",xl:"2.25rem","2xl":"3rem","3xl":"5rem","4xl":"10rem","5xl":"14rem","6xl":"18rem","7xl":"24rem","8xl":"32rem","9xl":"40rem",min:"min-content",max:"max-content",fit:"fit-content",screen:"100vw",full:"100%",px:"1px",1:"0.125rem",2:"0.25rem",3:"0.375rem",4:"0.5rem",5:"0.625rem",6:"0.75rem",7:"0.875rem",8:"1rem",9:"1.25rem",10:"1.5rem",11:"1.75rem",12:"2rem",13:"2.25rem",14:"2.5rem",15:"2.75rem",16:"3rem",17:"3.5rem",18:"4rem",20:"5rem",24:"6rem",28:"7rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem"},radii:{xs:"7px",sm:"9px",md:"12px",base:"14px",lg:"14px",xl:"18px","2xl":"24px","3xl":"32px",squared:"33%",rounded:"50%",pill:"9999px"},zIndices:{1:"100",2:"200",3:"300",4:"400",5:"500",10:"1000",max:"9999"},borderWeights:{light:"1px",normal:"2px",bold:"3px",extrabold:"4px",black:"5px"},transitions:{default:"all 250ms ease",button:"background 0.25s ease 0s, color 0.25s ease 0s, border-color 0.25s ease 0s, box-shadow 0.25s ease 0s, transform 0.25s ease 0s, opacity 0.25s ease 0s",avatar:"box-shadow 0.25s ease 0s, opacity 0.25s ease 0s",card:"transform 0.25s ease 0s, filter 0.25s ease 0s, box-shadow 0.25s ease 0s",dropdownItem:"background 0.12s ease, transform 0.12s ease, color 0.12s ease, box-shadow 0.12s ease 0s"},breakpoints:{xs:"650px",sm:"960px",md:"1280px",lg:"1400px",xl:"1920px"}},ec={xs:`(min-width: ${ed.breakpoints.xs})`,sm:`(min-width: ${ed.breakpoints.sm})`,md:`(min-width: ${ed.breakpoints.md})`,lg:`(min-width: ${ed.breakpoints.lg})`,xl:`(min-width: ${ed.breakpoints.xl})`,xsMin:`(min-width: ${ed.breakpoints.xs})`,smMin:`(min-width: ${ed.breakpoints.sm})`,mdMin:`(min-width: ${ed.breakpoints.md})`,lgMin:`(min-width: ${ed.breakpoints.lg})`,xlMin:`(min-width: ${ed.breakpoints.xl})`,xsMax:`(max-width: ${ed.breakpoints.xs})`,smMax:`(max-width: ${ed.breakpoints.sm})`,mdMax:`(max-width: ${ed.breakpoints.md})`,lgMax:`(max-width: ${ed.breakpoints.lg})`,xlMax:`(max-width: ${ed.breakpoints.xl})`,motion:"(prefers-reduced-motion: reduce)",safari:"not all and (min-resolution:.001dpcm)",hover:"(any-hover: hover)",dark:"(prefers-color-scheme: dark)",light:"(prefers-color-scheme: light)"},ep={...x,width:"space",height:"space",minWidth:"space",maxWidth:"space",minHeight:"space",maxHeight:"space",flexBasis:"space",gridTemplateColumns:"space",gridTemplateRows:"space",blockSize:"space",minBlockSize:"space",maxBlockSize:"space",inlineSize:"space",minInlineSize:"space",maxInlineSize:"space",borderWidth:"borderWeights"};var eg={prefix:"nextui",theme:{...ed,colors:{white:"#ffffff",black:"#000000",primaryLight:"$blue200",primaryLightHover:"$blue300",primaryLightActive:"$blue400",primaryLightContrast:"$blue600",primary:"$blue600",primaryBorder:"$blue500",primaryBorderHover:"$blue600",primarySolidHover:"$blue700",primarySolidContrast:"$white",primaryShadow:"$blue500",secondaryLight:"$purple200",secondaryLightHover:"$purple300",secondaryLightActive:"$purple400",secondaryLightContrast:"$purple600",secondary:"$purple600",secondaryBorder:"$purple500",secondaryBorderHover:"$purple600",secondarySolidHover:"$purple700",secondarySolidContrast:"$white",secondaryShadow:"$purple500",successLight:"$green200",successLightHover:"$green300",successLightActive:"$green400",successLightContrast:"$green700",success:"$green600",successBorder:"$green500",successBorderHover:"$green600",successSolidHover:"$green700",successSolidContrast:"$white",successShadow:"$green500",warningLight:"$yellow200",warningLightHover:"$yellow300",warningLightActive:"$yellow400",warningLightContrast:"$yellow700",warning:"$yellow600",warningBorder:"$yellow500",warningBorderHover:"$yellow600",warningSolidHover:"$yellow700",warningSolidContrast:"$white",warningShadow:"$yellow500",errorLight:"$red200",errorLightHover:"$red300",errorLightActive:"$red400",errorLightContrast:"$red600",error:"$red600",errorBorder:"$red500",errorBorderHover:"$red600",errorSolidHover:"$red700",errorSolidContrast:"$white",errorShadow:"$red500",neutralLight:"$gray100",neutralLightHover:"$gray200",neutralLightActive:"$gray300",neutralLightContrast:"$gray800",neutral:"$gray600",neutralBorder:"$gray400",neutralBorderHover:"$gray500",neutralSolidHover:"$gray600",neutralSolidContrast:"$white",neutralShadow:"$gray400",gradient:"linear-gradient(112deg, $cyan600 -63.59%, $pink600 -20.3%, $blue600 70.46%)",accents0:"$gray50",accents1:"$gray100",accents2:"$gray200",accents3:"$gray300",accents4:"$gray400",accents5:"$gray500",accents6:"$gray600",accents7:"$gray700",accents8:"$gray800",accents9:"$gray900"},shadows:{},dropShadows:{}},media:ec,utils:{p:e=>({padding:e}),pt:e=>({paddingTop:e}),pr:e=>({paddingRight:e}),pb:e=>({paddingBottom:e}),pl:e=>({paddingLeft:e}),px:e=>({paddingLeft:e,paddingRight:e}),py:e=>({paddingTop:e,paddingBottom:e}),m:e=>({margin:e}),mt:e=>({marginTop:e}),mr:e=>({marginRight:e}),mb:e=>({marginBottom:e}),ml:e=>({marginLeft:e}),mx:e=>({marginLeft:e,marginRight:e}),my:e=>({marginTop:e,marginBottom:e}),ta:e=>({textAlign:e}),tt:e=>({textTransform:e}),to:e=>({textOverflow:e}),d:e=>({display:e}),dflex:e=>({display:"flex",alignItems:e,justifyContent:e}),fd:e=>({flexDirection:e}),fw:e=>({flexWrap:e}),ai:e=>({alignItems:e}),ac:e=>({alignContent:e}),jc:e=>({justifyContent:e}),as:e=>({alignSelf:e}),fg:e=>({flexGrow:e}),fs:e=>({fontSize:e}),fb:e=>({flexBasis:e}),bc:e=>({backgroundColor:e}),bf:e=>({backdropFilter:e}),bg:e=>({background:e}),bgBlur:e=>({bf:"saturate(180%) blur(10px)",bg:e}),bgColor:e=>({backgroundColor:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),bgClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),br:e=>({borderRadius:e}),bw:e=>({borderWidth:e}),btrr:e=>({borderTopRightRadius:e}),bbrr:e=>({borderBottomRightRadius:e}),bblr:e=>({borderBottomLeftRadius:e}),btlr:e=>({borderTopLeftRadius:e}),bs:e=>({boxShadow:e}),ds:e=>({dropShadow:e}),shadow:e=>({boxShadow:e}),dshadow:e=>({dropShadow:e}),dropShadow:e=>({filter:`$dropShadows${e}`}),normalShadow:e=>({boxShadow:`0 4px 14px 0 $colors${e}`}),normalShadowVar:e=>({boxShadow:`0 4px 14px 0 ${e}`}),lh:e=>({lineHeight:e}),ov:e=>({overflow:e}),ox:e=>({overflowX:e}),oy:e=>({overflowY:e}),pe:e=>({pointerEvents:e}),events:e=>({pointerEvents:e}),us:e=>({WebkitUserSelect:e,userSelect:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),w:e=>({width:e}),h:e=>({height:e}),mw:e=>({maxWidth:e}),maxW:e=>({maxWidth:e}),mh:e=>({maxHeight:e}),maxH:e=>({maxHeight:e}),size:e=>({width:e,height:e}),minSize:e=>({minWidth:e,minHeight:e,width:e,height:e}),sizeMin:e=>({minWidth:e,minHeight:e,width:e,height:e}),maxSize:e=>({maxWidth:e,maxHeight:e}),sizeMax:e=>({maxWidth:e,maxHeight:e}),appearance:e=>({WebkitAppearance:e,appearance:e}),scale:e=>({transform:`scale(${e})`}),linearGradient:e=>({backgroundImage:`linear-gradient(${e})`}),tdl:e=>({textDecorationLine:e}),truncateText:e=>({maxWidth:e,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}),textGradient:e=>({backgroundImage:`linear-gradient(${e})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent","&::selection":{WebkitTextFillColor:"$colors$text"}})},themeMap:ep};let em=(e,t=null)=>{if("undefined"==typeof document||!e)return"";let r=t||document.documentElement,i=eu(e)?e.replace("var(","").replace(")",""):e.includes("--")?e:`--${e}`;return getComputedStyle(r).getPropertyValue(i)},eu=e=>!(!e||0!==(null==e?void 0:e.indexOf("var("))),eh=(e,t=1)=>{let r=0,i=0,n=0;return 4==e.length?(r="0x"+e[1]+e[1],i="0x"+e[2]+e[2],n="0x"+e[3]+e[3]):7==e.length&&(r="0x"+e[1]+e[2],i="0x"+e[3]+e[4],n="0x"+e[5]+e[6]),`rgba(${+r},${+i},${+n},${t})`},ef=e=>{let t=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(e,t,r,i)=>`${t}${t}${r}${r}${i}${i}`),r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);if(!r)throw Error(`Next UI: Unsupported ${e} color.`);return[Number.parseInt(r[1],16),Number.parseInt(r[2],16),Number.parseInt(r[3],16)]},eb=e=>{let t=eu(e)?em(e):e;if("#"===t.charAt(0))return ef(t);let r=t.replace(/ /g,""),i=t.substr(0,4),n=r.match(/\((.+)\)/);return i.startsWith("rgb")&&n?n[1].split(",").map(e=>Number.parseFloat(e)):(console.warn('NextUI: Only supports ["RGB", "RGBA", "HEX"] color.'),[0,0,0])},ex=(e,t=1)=>{if(!e)return"";let r=eu(e)?em(e):e;if(/#[a-fA-F0-9]{3,6}/g.test(r))return eh(r,t);if(!/^#|rgb|RGB/.test(r))return r;let[i,n,o]=eb(r);return`rgba(${i}, ${n}, ${o}, ${t>1?1:t<0?0:t})`},e$=(e,t=1)=>{let[r,i,n]=e.split(",").map(e=>Number.parseFloat(e));return`rgba(${r}, ${i}, ${n}, ${t>1?1:t<0?0:t})`},ey={blue50:"#EDF5FF",blue100:"#E1EFFF",blue200:"#CEE4FE",blue300:"#B7D5F8",blue400:"#96C1F2",blue500:"#5EA2EF",blue600:"#0072F5",blue700:"#005FCC",blue800:"#004799",blue900:"#00254D"},eS={gray50:"#F1F3F5",gray100:"#ECEEF0",gray200:"#E6E8EB",gray300:"#DFE3E6",gray400:"#D7DBDF",gray500:"#C1C8CD",gray600:"#889096",gray700:"#7E868C",gray800:"#687076",gray900:"#11181C"};var ew={colors:{background:"$white",backgroundAlpha:"rgba(255, 255, 255, 0.8)",foreground:"$black",backgroundContrast:"$white",...ey,purple50:"#F7F2FD",purple100:"#F1E8FB",purple200:"#EADCF8",purple300:"#E0CBF5",purple400:"#D1B1F0",purple500:"#BC8EE9",purple600:"#7828C8",purple700:"#6622AA",purple800:"#4D1980",purple900:"#290E44",green50:"#F1FDF7",green100:"#E8FCF1",green200:"#DAFBE8",green300:"#C8F9DD",green400:"#ADF5CC",green500:"#88F1B6",green600:"#17C964",green700:"#13A452",green800:"#108944",green900:"#06371B",yellow50:"#FEF9F0",yellow100:"#FEF5E7",yellow200:"#FDEFD8",yellow300:"#FCE7C5",yellow400:"#FBDBA7",yellow500:"#F9CB80",yellow600:"#F5A524",yellow700:"#B97509",yellow800:"#925D07",yellow900:"#4E3104",red50:"#FEF0F5",red100:"#FEE7EF",red200:"#FDD8E5",red300:"#FCC5D8",red400:"#FAA8C5",red500:"#F881AB",red600:"#F31260",red700:"#B80A47",red800:"#910838",red900:"#4E041E",cyan50:"#F0FCFF",cyan100:"#E6FAFE",cyan200:"#D7F8FE",cyan300:"#C3F4FD",cyan400:"#A5EEFD",cyan500:"#7EE7FC",cyan600:"#06B7DB",cyan700:"#09AACD",cyan800:"#0E8AAA",cyan900:"#053B48",pink50:"#FFF0FB",pink100:"#FFE5F8",pink200:"#FFD6F3",pink300:"#FFC2EE",pink400:"#FFA3E5",pink500:"#FF7AD9",pink600:"#FF4ECD",pink700:"#D6009A",pink800:"#B80084",pink900:"#4D0037",...eS,textLight:ex(eS.gray900,.2),text:"$gray900",linkLight:ex(ey.blue600,.2),link:"$blue600",codeLight:"$pink100",code:"$pink600",selection:"$blue200",border:"rgba(0, 0, 0, 0.15)"},shadows:{xs:"0 2px 8px 1px rgb(104 112 118 / 0.07), 0 1px 1px -1px rgb(104 112 118 / 0.04)",sm:"0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)",md:"0 12px 20px 6px rgb(104 112 118 / 0.08)",lg:"0 12px 34px 6px rgb(104 112 118 / 0.18)",xl:"0 25px 65px 0px rgb(104 112 118 / 0.35)"},dropShadows:{xs:"drop-shadow(0 2px 4px rgb(104 112 118 / 0.07)) drop-shadow(0 1px 1px rgb(104 112 118 / 0.04))",sm:"drop-shadow(0 2px 8px rgb(104 112 118 / 0.07)) drop-shadow(0 2px 4px rgb(104 112 118 / 0.04))",md:"drop-shadow(0 4px 12px rgb(104 112 118 / 0.08)) drop-shadow(0 20px 8px rgb(104 112 118 / 0.04))",lg:"drop-shadow(0 12px 24px rgb(104 112 118 / 0.15)) drop-shadow(0 12px 14px rgb(104 112 118 / 0.1))",xl:"drop-shadow(0 25px 34px rgb(104 112 118 / 0.35))"}};let ek=(e=>{let t=(e=>{let t=!1,r=ea(e,e=>{t=!0;let r="prefix"in(e="object"==typeof e&&e||{})?String(e.prefix):"",i="object"==typeof e.media&&e.media||{},n="object"==typeof e.root?e.root||null:globalThis.document||null,o="object"==typeof e.theme&&e.theme||{},l={prefix:r,media:i,theme:o,themeMap:"object"==typeof e.themeMap&&e.themeMap||{...x},utils:"object"==typeof e.utils&&e.utils||{}},a=_(n),s={css:q(l,a),globalCss:et(l,a),keyframes:ei(l,a),createTheme:el(l,a),reset(){a.reset(),s.theme.toString()},theme:{},sheet:a,config:l,prefix:r,getCssText:a.toString,toString:a.toString};return String(s.theme=s.createTheme(o)),s});return t||r.reset(),r})(e);return t.styled=(({config:e,sheet:t})=>es(e,()=>{let r=q(e,t);return(...e)=>{let t=r(...e),i=t[S].type,n=a.forwardRef((e,r)=>{let n=e&&e.as||i,{props:o,deferredInjector:l}=t(e);return delete o.as,o.ref=r,l?a.createElement(a.Fragment,null,a.createElement(n,o),a.createElement(l,null)):a.createElement(n,o)});return n.className=t.className,n.displayName=`Styled.${i.displayName||i.name||i}`,n.selector=t.selector,n.toString=()=>t.selector,n[S]=t[S],n}}))(t),t})({...eg,theme:{...eg.theme,shadows:{...ew.shadows},dropShadows:{...ew.dropShadows},colors:{...eg.theme.colors,...ew.colors}}});ek.createTheme,ek.styled,ek.css;let eB=ek.globalCss;ek.keyframes;let ev=ek.getCssText,eE=ek.theme;ek.config;let eC=eB({"*, *:before, *:after":{boxSizing:"border-box",textRendering:"geometricPrecision",WebkitTapHighlightColor:"transparent"},html:{fontSize:"$base"},body:{margin:0,padding:0,minHeight:"100%",position:"relative",overflowX:"hidden",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",textRendering:"optimizeLegibility",fontSize:"$base",lineHeight:"$md",fontFamily:"$sans"},"html, body":{backgroundColor:"$background",color:"$text"},"p, small":{color:"inherit",letterSpacing:"$tighter",fontWeight:"$normal",fontFamily:"$sans"},p:{fontSize:"$base",lineHeight:"$lg"},small:{margin:0,lineHeight:"$xs",fontSize:"$xs"},b:{fontWeight:"$semibold"},span:{fontSize:"inherit",color:"inherit",fontWeight:"inherit"},img:{maxWidth:"100%"},a:{cursor:"pointer",fontSize:"inherit",WebkitTouchCallout:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitBoxAlign:"center",alignItems:"center",color:"$link",textDecoration:"none"},"a:hover":{textDecoration:"none"},"ul,ol":{padding:0,listStyleType:"none",margin:"$sm $sm $sm $lg",color:"$foreground"},ol:{listStyleType:"decimal"},li:{marginBottom:"$5",fontSize:"$base",lineHeight:"$lg"},"h1,h2,h3,h4,h5,h6":{color:"inherit",margin:"0 0 $5 0"},h1:{letterSpacing:"$tighter",fontSize:"$5xl",lineHeight:"$md",fontWeight:"$bold"},h2:{letterSpacing:"$tighter",fontSize:"$4xl",fontWeight:"$semibold"},h3:{letterSpacing:"$tighter",fontSize:"$2xl",fontWeight:"$semibold"},h4:{letterSpacing:"$tighter",fontSize:"$xl",fontWeight:"$semibold"},h5:{letterSpacing:"$tight",fontSize:"$md",fontWeight:"$semibold"},h6:{letterSpacing:"$tight",fontSize:"$sm",fontWeight:"$semibold"},"button, input, select,textarea":{fontFamily:"inherit",fontSize:"inherit",lineHeight:"inherit",color:"inherit",margin:0},"button:focus, input:focus, select:focus, textarea:focus":{outline:"none"},code:{color:"$code",padding:"$1 $2",borderRadius:"$xs",bg:"$codeLight",fontFamily:"$mono",fontSize:"$sm",whiteSpace:"pre-wrap",transition:"opacity 0.25s ease 0s"},"code:hover":{opacity:.8},pre:{overflow:"auto",whiteSpace:"pre",textAlign:"left",fontSize:"$sm",borderRadius:"$lg",padding:"$md $lg",margin:"$lg 0",fontFamily:"$mono",lineHeight:"$md",webkitOverflowScrolling:"touch"},"pre code":{color:"$foreground",fontSize:"$sm",lineHeight:"$sm",whiteSpace:"pre"},"pre code:before,pre code:after":{display:"none"},"pre p":{margin:0},"pre::-webkit-scrollbar":{display:"none",width:0,height:0,background:"transparent"},hr:{background:"$border",borderColor:"transparent",borderWidth:"0px",borderStyle:"none",height:"1px"},details:{backgroundColor:"$accents1",border:"none"},"details:focus, details:hover, details:active":{outline:"none"},summary:{cursor:"pointer",userSelect:"none",listStyle:"none",outline:"none"},"summary::-webkit-details-marker, summary::before":{display:"none"},"summary::-moz-list-bullet":{fontSize:0},"summary:focus, summary:hover, summary:active":{outline:"none",listStyle:"none"},"::selection":{backgroundColor:"$selection"},blockquote:{padding:"$md $lg",color:"$accents7",backgroundColor:"$accents0",borderRadius:"$lg",margin:"$10 0"},"blockquote *:first-child":{marginTop:0},"blockquote *:last-child":{marginBottom:0},kbd:{width:"fit-content",textAlign:"center",display:"inline-block",color:"$accents8",bg:"$accents0",border:"1px solid $border",boxShadow:"0 0 1px 0 rgb(0 0 0 / 14%)",fontFamily:"$sans",borderRadius:"5px",padding:"$1 $3",mx:"$1",lineHeight:"$sm",fontSize:"$sm"},"kbd + kbd":{ml:"$2"},"dl, dd, hr, figure, p":{margin:0}}),eF=a.memo(({children:e})=>(eC(),(0,n.jsx)(a.Fragment,{children:e})));eF.flush=()=>(0,n.jsx)("style",{dangerouslySetInnerHTML:{__html:ev()},id:"stitches"});let eW=e=>e&&"object"==typeof e,ez=e=>eW(e)?e instanceof Array?[...e]:{...e}:e;var eR=()=>{let[e,t]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{t(!!("undefined"!=typeof window&&window.document&&window.document.createElement))},[]),{isBrowser:e,isServer:!e}};function eI(...e){for(var t,r,i=0,n="";i<e.length;)(t=e[i++])&&(r=function e(t){var r,i,n="";if("string"==typeof t||"number"==typeof t)n+=t;else if("object"==typeof t){if(Array.isArray(t))for(r=0;r<t.length;r++)t[r]&&(i=e(t[r]))&&(n&&(n+=" "),n+=i);else for(r in t)t[r]&&(n&&(n+=" "),n+=r)}return n}(t))&&(n&&(n+=" "),n+=r);return n}let ej=(e,t,r=1)=>{if("undefined"==typeof document||!e)return"";let i=getComputedStyle(document.documentElement),n=`--${eg.prefix}-${e}-${t}`,o=i.getPropertyValue(n);if(o&&o.includes("var")&&ej(e,o),o&&1!==r){if(o.includes("rgb"))return e$(o,r);if(o.includes("#"))return eh(o,r)}return o},eM=()=>{let e=[...Object.keys(eg.theme.colors),...Object.keys(ew.colors)],t=Object.keys(ew.shadows);return{colors:e.reduce((e,t)=>{let r=ej("colors",t);return r&&(e[t]={prefix:eg.prefix,scale:"colors",token:t,value:r}),e},{}),shadows:t.reduce((e,t)=>{let r=ej("shadows",t);return r&&(e[t]={prefix:eg.prefix,scale:"shadows",token:t,value:r}),e},{})}},eA=e=>{var t;let r=(null==e||null==(t=e.getAttribute("style"))?void 0:t.split(";").map(e=>e.trim()).filter(e=>e.includes("color-scheme")))||[],i=r.length>0?r[0].replace("color-scheme: ","").replace(";",""):"";return(null==e?void 0:e.getAttribute("data-theme"))||i},eL=e=>"string"==typeof e&&null!=e&&e.includes("-theme")?null==e?void 0:e.replace("-theme",""):e,eT=e=>{var t,r;if(!document)return;let i=document.documentElement,n=(null==i||null==(t=i.getAttribute("class"))?void 0:t.split(" ").filter(e=>!e.includes("theme")&&!e.includes("light")&&!e.includes("dark")))||[],o=(null==i||null==(r=i.getAttribute("style"))?void 0:r.split(";").filter(e=>!e.includes("color-scheme")&&e.length).map(e=>`${e};`))||[],l=eL(e);null==i||i.setAttribute("class",eI(n,`${l}-theme`)),null==i||i.setAttribute("style",eI(o,`color-scheme: ${l};`))},eD={isDark:!1,theme:eE,type:"light"},eH=a.createContext(eD);var eP=((i=({theme:e,disableBaseline:t,children:r})=>{let{isBrowser:i}=eR(),[o,l]=(0,a.useState)(eD.type),s=e=>{l(t=>t!==e?e:t)},d=e=>{let t=eA(e);t&&s(t)},p=(0,a.useMemo)(()=>{let e=i?eM():{},t=function e(t){for(var r,i,n=Array.prototype.slice.call(arguments,1);n.length;)for(i in r=n.shift())r.hasOwnProperty(i)&&("object"==typeof t[i]&&t[i]&&"[object Array]"!==Object.prototype.toString.call(t[i])&&"object"==typeof r[i]&&null!==r[i]?t[i]=e({},t[i],r[i]):t[i]=r[i]);return t}(ez(eD.theme),e),r=eL(o);return{theme:t,type:r,isDark:"dark"===r}},[o,i]);return(0,a.useEffect)(()=>{var e,t,r;d(null==(e=document)?void 0:e.documentElement);let i=new MutationObserver(e=>{var t,r,i,n,o;if(e&&e.length>0&&"BODY"===(null==(t=e[0])?void 0:t.target.nodeName)){let e=null==(r=document)||null==(i=r.body)||null==(n=i.dataset)?void 0:n.theme;e&&s(e)}else d(null==(o=document)?void 0:o.documentElement)});return i.observe(null==(t=document)?void 0:t.documentElement,{attributes:!0,attributeFilter:["data-theme","style"]}),i.observe(null==(r=document)?void 0:r.body,{attributes:!0,attributeFilter:["data-theme","style"]}),()=>i.disconnect()},[]),(0,a.useEffect)(()=>{i&&e&&null!=e&&e.className&&(eT(e.className),s(eL(e.className)))},[i,e]),(0,n.jsx)(c,{children:(0,n.jsx)(u,{children:(0,n.jsxs)(eH.Provider,{value:p,children:[!t&&(0,n.jsx)(eF,{}),r]})})})}).defaultProps={disableBaseline:!1},i);function eO(e){let{Component:t,pageProps:r}=e;return(0,n.jsxs)(eP,{children:[(0,n.jsxs)(l(),{children:[(0,n.jsx)("meta",{name:"viewport",content:"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"}),(0,n.jsx)("meta",{name:"description",content:"description of your project"}),(0,n.jsx)("meta",{name:"theme-color",content:"#000"}),(0,n.jsx)("link",{rel:"manifest",href:"/manifest.json"}),(0,n.jsx)("link",{rel:"shortcut icon",href:"/favicon.ico"})]}),(0,n.jsx)(t,{...r})]})}},5303:function(){},9008:function(e,t,r){e.exports=r(4605)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[9774,179],function(){return t(1118),t(8355)}),_N_E=e.O()}]);