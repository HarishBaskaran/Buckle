(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8043],{3220:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/range",function(){return n(3586)}])},3863:function(e,t,n){"use strict";function r(e){return e?"extralarge"===e.toLowerCase()?"text-xl":"large"===e.toLowerCase()?"text-lg":"medium"===e.toLowerCase()?"text-base":"text-sm":"text-sm"}function s(e){let t="text-white hover:text-white \n    bg-sky-600 hover:bg-sky-400 active:bg-sky-600";return e?"primary"===e.toLowerCase()?t:"primary_inverse"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    border border-sky-600\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"primary_link"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"secondary"===e.toLowerCase()?"text-white hover:text-white \n    bg-sky-400 hover:bg-sky-600 active:bg-sky-600":"warning"===e.toLowerCase()?"text-white hover:text-white \n    bg-sky-400 hover:bg-sky-600 active:bg-sky-600":t:t}n.r(t),n.d(t,{fontSize:function(){return r},typeColor:function(){return s}}),t.default=()=>{}},3586:function(e,t,n){"use strict";n.r(t);var r=n(5893),s=n(7294),o=n(2314);t.default=e=>{let[t,n]=(0,s.useState)(e.value?e.value:10);return(0,r.jsx)(o.default,{message:t,position:"right",children:(0,r.jsx)("input",{type:"range",value:t,onChange:e=>{n(e.target.value)},onBlur:n=>{e.setValue&&e.setValue(t)},className:"my-[15px] ".concat(e.className?e.className:"w-full"," h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-600")})})}},2314:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var r=n(5893),s=n(3863);function o(e){return(0,r.jsxs)("div",{className:"group relative flex z-4",children:[e.children,(0,r.jsx)("span",{className:"".concat("absolute \nrounded bg-gray-800 scale-0 transition-all \np-2 text-xs text-white group-hover:scale-100"," ").concat("right"==e.position?"left-10 right-50":"lessRight"==e.position?"left-5 right-20":"left"==e.position?"right-10 left-50":"top-8").concat((0,s.fontSize)(e.size)," ").concat(e.className),children:e.message})]})}}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=3220)}),_N_E=e.O()}]);