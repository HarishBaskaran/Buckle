(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5069],{3812:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/copyToClipboard",function(){return n(8227)}])},3863:function(e,t,n){"use strict";function o(e){return e?"extralarge"===e.toLowerCase()?"text-xl":"large"===e.toLowerCase()?"text-lg":"medium"===e.toLowerCase()?"text-base":"text-sm":"text-sm"}function r(e){let t="text-white hover:text-white \n    bg-sky-600 hover:bg-sky-400 active:bg-sky-600";return e?"primary"===e.toLowerCase()?t:"primary_inverse"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    border border-sky-600\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"primary_link"===e.toLowerCase()?"\n    text-sky-600 \n    bg-white-400\n    hover:text-sky \n    hover:bg-white-600\n    active:bg-white-600":"secondary"===e.toLowerCase()?"text-white hover:text-white \n    bg-sky-400 hover:bg-sky-600 active:bg-sky-600":"warning"===e.toLowerCase()?"text-white hover:text-white \n    bg-sky-400 hover:bg-sky-600 active:bg-sky-600":t:t}n.r(t),n.d(t,{fontSize:function(){return o},typeColor:function(){return r}}),t.default=()=>{}},8227:function(e,t,n){"use strict";n.r(t);var o=n(5893),r=n(3530),i=n(3863);t.default=e=>{let t=(0,i.fontSize)(e.size),n=(0,i.typeColor)(e.type),s=()=>{let t=e.stringify&&!0===e.stringify?JSON.stringify(e.data,null,2):e.data;(0,r.exportStateAsJSON)(t,e.fileName)};return(0,o.jsx)("div",{children:(0,o.jsxs)("label",{className:"".concat("\nborder rounded outline-none \npx-3 py-1 my-[2px] mr-1 mb-1\nfocus:outline-none  \nease-linear transition-all duration-150\n"," ").concat(t," ").concat(n," ").concat(e.className),children:[(0,o.jsx)("button",{onClick:()=>s(),style:{display:"none"}}),"Export"]})})}},3530:function(e,t,n){"use strict";n.r(t),n.d(t,{exportStateAsJSON:function(){return o}});let o=(e,t)=>{let n=document.createElement("a"),o=new Blob([e],{type:"application/json"});n.href=URL.createObjectURL(o),n.download=t,document.body.appendChild(n),n.click()};t.default=()=>{}}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=3812)}),_N_E=e.O()}]);