(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[4423],{233:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/hb_components/textarea",function(){return r(9541)}])},5822:(e,t,r)=>{"use strict";function n(e){return e?"extralarge"===e.toLowerCase()?"text-xl":"large"===e.toLowerCase()?"text-lg":"medium"===e.toLowerCase()?"text-base":"text-sm":"text-sm"}function a(e){var t="text-white hover:text-white \n    bg-sky-600 hover:bg-sky-400 active:bg-sky-600";return e?"primary"===e.toLowerCase()?t:"primary_inverse"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    border border-sky-600\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"primary_link"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"secondary"===e.toLowerCase()||"warning"===e.toLowerCase()?"text-white hover:text-white \n    bg-sky-400 hover:bg-sky-600 active:bg-sky-600":t:t}r.r(t),r.d(t,{default:()=>o,fontSize:()=>n,typeColor:()=>a});const o=function(){}},9541:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var n=r(4246),a=r(5822);const o=function(e){var t=(0,a.fontSize)(e.size),r=e.error?"!border-red-500":"";return(0,n.jsx)("textarea",{className:"".concat("\nbg-[#f8f8f8] min-w-[25%] max-w-full min-h-[180px] p-[10px] \nborder-[2px] border-solid border-grey text-[14px]\n"," ").concat(t," ").concat(r," ").concat(e.className),name:e.name,placeholder:e.placeholder,onClick:e.onClick,defaultValue:e.defaultValue,value:e.value,onChange:e.onChange?e.onChange:function(t){if(e.readOnly)return"";e.setValue(t.target.value)},onPaste:function(t){if(e.readOnly)return"";t.preventDefault();var r=t.clipboardData.getData("text"),n=t.target,a=n.selectionStart,o=n.selectionEnd,s=e.value||"",i=s.slice(0,a)+r+s.slice(o);e.setValue(i),n.setSelectionRange(a+r.length,a+r.length)},readOnly:e.readOnly})}}},e=>{e.O(0,[9774,2888,179],(()=>{return t=233,e(e.s=t);var t}));var t=e.O();_N_E=t}]);