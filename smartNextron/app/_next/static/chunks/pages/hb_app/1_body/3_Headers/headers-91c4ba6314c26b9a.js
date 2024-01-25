(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[2792],{8839:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/hb_app/1_body/3_Headers/headers",function(){return r(1301)}])},6126:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o,headersContext:()=>s});var a=r(4246),n=r(7378),s=n.createContext("");const o=function(e){var t=e.children,r=(0,n.useState)(""),o={headers:r[0],setHeaders:r[1]};return(0,a.jsx)(s.Provider,{value:o,children:t})}},1301:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var a=r(4246),n=r(7378),s=r(6126),o=r(3960),c=r(9541),l=r(7961),i=r(591),u=r(6895);const d=function(){var e=(0,n.useContext)(s.headersContext),t=e.headers,r=e.setHeaders,d=(0,n.useState)(!1),h=d[0],x=d[1],g=(0,n.useState)(!1),f=g[0],p=g[1],m=(0,n.useState)(!1),v=m[0],b=m[1],y=(0,n.useState)(!1),N=y[0],w=y[1];(0,n.useEffect)((function(){(0,i.checkJSON)(t,x)}),[t]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)(o.default,{size:"small",type:"primary_inverse",label:"Format",onClick:function(){try{r(JSON.stringify(JSON.parse(t),null,2))}catch(e){p("The Headers JSON is incorrect for parsing"),b(!0)}}}),(0,a.jsx)(o.default,{size:"small",type:"primary_inverse",label:"Convert",onClick:function(){var e={};try{JSON.parse(t).header.forEach((function(t){e[t.key]=t.value})),r(JSON.stringify(e,null,2))}catch(a){p("The Headers JSON is incorrect for converting"),b(!0)}}}),(0,a.jsx)(l.default,{outputFlag:v,setOutputFlag:b,successFlag:N,setSuccessFlag:w,message:f,className:""})]}),(0,a.jsx)(u.default,{label:"Header JSON"}),(0,a.jsx)(c.default,{size:"small",className:"w-[90%] h-[67vh]",error:h,name:"getHeaderContent",placeholder:"Paste your Headers as JSON here",value:t,setValue:r})]})}},591:(e,t,r)=>{"use strict";function a(e,t){try{JSON.parse(e),t(!1)}catch(r){t(null!==e&&""!==e)}}function n(){}r.r(t),r.d(t,{checkJSON:()=>a,default:()=>n})},7961:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var a=r(4246),n=r(9072),s=r(9374),o=r(6617);function c(e){return e.outputFlag?(0,a.jsxs)("div",{className:"flex ml-[20px] mt-[3px] border-2 border-gray px-[5px] ".concat(e.successFlag?"text-green-700 bg-green-300 border-green-700":"text-red-700 bg-red-300 border-red-700"," ").concat(e.className),children:[(0,a.jsx)("p",{children:e.message}),(0,a.jsx)(o.default,{message:"Close",position:"right",children:(0,a.jsx)("div",{className:"mt-[3px] ml-[10px] cursor-pointer",onClick:function(){e.setOutputFlag(!1),e.setSuccessFlag(!1)},children:(0,a.jsx)(n.G,{icon:s.WA2,className:"w-[15px] h-[15px] mt-[4px] ".concat(e.successFlag?"text-green":"text-red")})})})]}):(0,a.jsx)(a.Fragment,{})}},3960:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(4246),n=r(5822);const s=function(e){var t=(0,n.fontSize)(e.size),r=(0,n.typeColor)(e.type);return(0,a.jsx)("button",{type:"button",className:"".concat("\npx-3 py-1 mr-1 rounded\nease-linear transition-all duration-150\n"," ").concat(t," ").concat(r," ").concat(e.className),onClick:e.onClick,children:e.label})}},5822:(e,t,r)=>{"use strict";function a(e){return e?"extralarge"===e.toLowerCase()?"text-xl":"large"===e.toLowerCase()?"text-lg":"medium"===e.toLowerCase()?"text-base":"text-sm":"text-sm"}function n(e){var t="text-white hover:text-white \n    bg-sky-600 hover:bg-sky-400 active:bg-sky-600";return e?"primary"===e.toLowerCase()?t:"primary_inverse"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    border border-sky-600\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"primary_link"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"secondary"===e.toLowerCase()||"warning"===e.toLowerCase()?"text-white hover:text-white \n    bg-sky-400 hover:bg-sky-600 active:bg-sky-600":t:t}r.r(t),r.d(t,{default:()=>s,fontSize:()=>a,typeColor:()=>n});const s=function(){}},6895:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(4246),n=r(5822);const s=function(e){var t=(0,n.fontSize)(e.size);return(0,a.jsx)("h4",{className:"".concat("\nmt-[15px] px-2 \ntext-blueGray-600 font-bold\nmin-w-[25%] min-h-[5%]\n"," ").concat(t," ").concat(e.className),onClick:e.onClick,children:e.label})}},9541:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(4246),n=r(5822);const s=function(e){var t=(0,n.fontSize)(e.size),r=e.error?"!border-red-500":"";return(0,a.jsx)("textarea",{className:"".concat("\nbg-[#f8f8f8] min-w-[25%] max-w-full min-h-[180px] p-[10px] \nborder-[2px] border-solid border-grey text-[14px]\n"," ").concat(t," ").concat(r," ").concat(e.className),name:e.name,placeholder:e.placeholder,onClick:e.onClick,defaultValue:e.defaultValue,value:e.value,onChange:e.onChange?e.onChange:function(t){if(e.readOnly)return"";e.setValue(t.target.value)},onPaste:function(t){if(e.readOnly)return"";t.preventDefault();var r=t.clipboardData.getData("text"),a=t.target,n=a.selectionStart,s=a.selectionEnd,o=e.value||"",c=o.slice(0,n)+r+o.slice(s);e.setValue(c),a.setSelectionRange(n+r.length,n+r.length)},readOnly:e.readOnly})}},6617:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(4246),n=r(5822);function s(e){return(0,a.jsxs)("div",{className:"group relative flex z-4",children:[e.children,(0,a.jsx)("span",{className:"".concat("absolute \nrounded bg-gray-800 scale-0 transition-all \np-2 text-xs text-white group-hover:scale-100"," ").concat("right"==e.position?"left-10 right-50":"lessRight"==e.position?"left-5 right-20":"left"==e.position?"right-10 left-50":"top-8").concat((0,n.fontSize)(e.size)," ").concat(e.className),children:e.message})]})}}},e=>{e.O(0,[9570,9072,9774,2888,179],(()=>{return t=8839,e(e.s=t);var t}));var t=e.O();_N_E=t}]);