(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[5811],{9496:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/hb_app",function(){return n(1681)}])},4054:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>c});var r=n(4246),a=n(9072),o=n(9374),s=n(6617),u=n(10),l=n(9647);const c=function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"flex justify-between pt-[5px] mb-[15px] border border-slate-300",children:[(0,r.jsx)("h4",{className:"ml-[30px] my-[5px] font-bold",children:"SMART"}),(0,r.jsxs)("div",{className:"flex mr-[30px] ",children:[(0,r.jsx)(l.default,{}),(0,r.jsx)(u.default,{}),(0,r.jsx)(s.default,{message:"Support",position:"left",children:(0,r.jsx)("div",{className:"mx-[20px] mt-[10px]",children:(0,r.jsx)(a.G,{icon:o.uli,className:"text-slate-400"})})})]})]})})}},10:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>h});var r=n(9132),a=n(5556),o=n(4246),s=n(7378),u=n(6761),l=n(6762),c=n(9718),i="http://localhost:8082/environment",d=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,c.Z.post(i,e,{metadata:{name:"createEnvironment"}})];case 1:return n.sent(),console.log("CREATED environment"),[3,3];case 2:return t=n.sent(),console.error("CREATE - Error creating environment:",t),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return t=e.setData,[4,c.Z.get(i,{metadata:{name:"importData"}}).then((function(e){console.log(e.data),t(e.data)})).catch((function(e){console.error("Error retrieving data:",e)}))];case 1:return n.sent(),[2]}}))}));return function(t){return e.apply(this,arguments)}}();const h=function(){var e=(0,s.useState)(!1),t=e[0],n=e[1],r=(0,s.useState)([]),a=r[0],c=r[1];return(0,o.jsx)(u.default,{buttonLabel:"Environment",labelClassName:"mb-[5px]",flag:t,open:function(){return c([]),m({setData:c}),void n(!0)},close:function(){return d(a),void n(!1)},height:"h-[55vh]",contentWidth:"w-[750px] h-[30vh]",header:"Environment",children:(0,o.jsx)(l.default,{data:a,setData:c})})}},5069:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>g});var r=n(9132),a=n(1946),o=n(8772),s=n(3334),u=n(3573),l=n(5556),c=n(4246),i=n(7378),d=n(3960),m=n(4424),h=n(5321),f=n(6693),p=n(1043),x=n(1530),v=n(4802),b=n(9718);const g=function(e){var t=e.data,n=e.setData,g=(0,i.useState)(v.authorizationOptions),j=g[0],y=g[1],N=(0,i.useState)({column1:"",column2:"",column3:""}),E=N[0],Z=N[1],_=(0,i.useState)(null),w=_[0],C=_[1],k=function(e,t){var n=e.target.value;Z((0,s.Z)((0,o.Z)({},E),(0,a.Z)({},t,n)))},A=function(e){e.map((function(e){e.selected&&Z((0,s.Z)((0,o.Z)({},E),(0,a.Z)({},"column3",e.label)))}))},D=function(){var e=(0,r.Z)((function(e){var t;return(0,l.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,b.Z.post("http://localhost:8082/authorizationRunner",e,{metadata:{name:"createEnvironment"}})];case 1:return n.sent(),console.log("CREATED authorizationRunner"),[3,3];case 2:return t=n.sent(),console.error("CREATE - Error creating authorizationRunner:",t),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}();return(0,c.jsx)("div",{className:"relative overflow-auto shadow-md sm:rounded-lg w-full h-[40vh]",children:(0,c.jsxs)("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[(0,c.jsx)("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:(0,c.jsx)("tr",{children:["Username","Password","Environment","Actions"].map((function(e,t){return(0,c.jsx)("th",{scope:"col",className:"border border-gray-300 px-6 py-3 text-sky-600",children:e},t)}))})}),(0,c.jsxs)("tbody",{children:[t&&t.map((function(e){return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:"border border-gray-300 py-2 px-5",children:w===e.id?(0,c.jsx)("input",{type:"text",className:"p-1 border border-gray-300 rounded-md",value:E.column1,onChange:function(e){return k(e,"column1")}}):e.column1}),(0,c.jsx)("td",{className:"border border-gray-300 py-2 px-5",children:w===e.id?(0,c.jsx)("input",{type:"text",className:"p-1 border border-gray-300 rounded-md",value:E.column2,onChange:function(e){return k(e,"column2")}}):e.column2}),(0,c.jsx)("td",{className:"border border-gray-300 py-2 px-5",children:w===e.id?(0,c.jsx)(x.default,{options:j,text:"text-[12px]",width:"w-[230px]",onChange:A}):e.column3}),(0,c.jsx)("td",{className:"border border-gray-300 py-2 mx-5",children:w===e.id?(0,c.jsxs)("div",{className:"ml-[10px] flex gap-3",children:[(0,c.jsx)(f.default,{onClick:function(){return t=e.id,n((function(e){return e.map((function(e){return e.id===t?(0,s.Z)((0,o.Z)({},e),{column1:E.column1,column2:E.column2,column3:E.column3}):e}))})),C(null),void Z({column1:"",column2:"",column3:""});var t}}),(0,c.jsx)(p.default,{onClick:function(){return C(null),void Z({column1:"",column2:"",column3:""})}})]}):(0,c.jsxs)("div",{className:"ml-[10px] flex gap-3",children:[(0,c.jsx)(d.default,{type:"primary_inverse",label:"Authorize",onClick:function(){return function(e){var n=t.find((function(t){return t.id===e}));D(n)}(e.id)}}),(0,c.jsx)(h.default,{onClick:function(){return function(e){var n=t.find((function(t){return t.id===e}));j=v.authorizationOptions.map((function(e){return e.label===n.column3?(0,s.Z)((0,o.Z)({},e),{selected:!0}):(0,s.Z)((0,o.Z)({},e),{selected:!1})})),y(j),Z((0,o.Z)({},n)),C(e)}(e.id)}}),(0,c.jsx)(m.default,{onClick:function(){return r=e.id,void n(t.filter((function(e){return e.id!==r})));var r}})]})})]},e.id)})),null===w&&(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:"border border-gray-300 p-2",children:(0,c.jsx)("input",{type:"text",placeholder:"username",className:"p-1 border border-gray-300 rounded-md",value:E.column1,onChange:function(e){return k(e,"column1")}})}),(0,c.jsx)("td",{className:"border border-gray-300 p-2",children:(0,c.jsx)("input",{type:"text",placeholder:"password",className:"p-1 border border-gray-300 rounded-md",value:E.column2,onChange:function(e){return k(e,"column2")}})}),(0,c.jsx)("td",{className:"border border-gray-300 p-2",children:(0,c.jsx)(x.default,{options:v.authorizationOptions,text:"text-[12px]",width:"w-[230px]",onChange:A})}),(0,c.jsx)("td",{className:"border border-gray-300 p-2",children:(0,c.jsx)(d.default,{type:"primary_inverse",label:"Add",onClick:function(){n((0,u.Z)(t).concat([(0,s.Z)((0,o.Z)({},E),{id:t.length+1})])),Z({column1:"",column2:"",column3:""})}})})]})]})]})})}},9647:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>h});var r=n(9132),a=n(5556),o=n(4246),s=n(7378),u=n(6761),l=n(5069),c=n(9718),i="http://localhost:8082/authorization",d=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,c.Z.post(i,e,{metadata:{name:"createEnvironment"}})];case 1:return n.sent(),console.log("CREATED environment"),[3,3];case 2:return t=n.sent(),console.error("CREATE - Error creating environment:",t),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return t=e.setData,[4,c.Z.get(i,{metadata:{name:"importData"}}).then((function(e){console.log(e.data),t(e.data)})).catch((function(e){console.error("Error retrieving data:",e)}))];case 1:return n.sent(),[2]}}))}));return function(t){return e.apply(this,arguments)}}();const h=function(){var e=(0,s.useState)(!1),t=e[0],n=e[1],r=(0,s.useState)([]),a=r[0],c=r[1];return(0,o.jsx)(u.default,{buttonLabel:"Authorization",labelClassName:"mb-[5px]",flag:t,open:function(){return c([]),m({setData:c}),void n(!0)},close:function(){return d(a),void n(!1)},height:"h-[55vh]",contentWidth:"w-[850px] h-[30vh]",header:"Authorization",children:(0,o.jsx)(l.default,{data:a,setData:c})})}},4802:(e,t,n)=>{"use strict";n.r(t),n.d(t,{authorizationOptions:()=>r,default:()=>a});var r=[{value:"staging",label:"STAGING",selected:!1},{value:"qa",label:"QA",selected:!1},{value:"perf",label:"PERF",selected:!1},{value:"demo",label:"DEMO",selected:!1},{value:"sit",label:"SIT",selected:!1}];const a=function(){}},1681:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s});var r=n(4246),a=n(5037),o=n(4054);const s=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.default,{}),(0,r.jsx)(a.default,{})]})}},4300:e=>{"use strict";e.exports=require("buffer")}},e=>{e.O(0,[9570,7696,2323,5796,2082,6368,5259,9072,2111,9374,3292,7508,4897,7318,3219,8318,334,673,1641,9222,1632,1536,7135,5240,3484,5037,9774,2888,179],(()=>{return t=9496,e(e.s=t);var t}));var t=e.O();_N_E=t}]);