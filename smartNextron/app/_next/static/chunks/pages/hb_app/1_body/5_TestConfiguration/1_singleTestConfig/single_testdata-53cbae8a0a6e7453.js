(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[1965],{3975:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/hb_app/1_body/5_TestConfiguration/1_singleTestConfig/single_testdata",function(){return a(998)}])},4075:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r,exportImportContext:()=>l});var n=a(4246),s=a(7378),l=s.createContext("");const r=function(e){var t=e.children,a=(0,s.useState)(!1),r=a[0],o=a[1],i=(0,s.useState)(!1),c=i[0],u=i[1],d=(0,s.useState)(!1),m=d[0],x=d[1],f=(0,s.useState)(!1),p=f[0],g=f[1],h=(0,s.useState)(!1),C={globalImportHTTPMethodFlag:r,setGlobalImportHTTPMethodFlag:o,globalImportQueryParamFlag:c,setGlobalImportQueryParamFlag:u,globalImportQueryFlag:m,setGlobalImportQueryFlag:x,globalImportSingleFlag:p,setGlobalImportSingleFlag:g,globalImportMultiFlag:h[0],setGlobalImportMultiFlag:h[1]};return(0,n.jsx)(l.Provider,{value:C,children:t})}},470:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r,testDataConfigContext:()=>l});var n=a(4246),s=a(7378),l=s.createContext("");const r=function(e){var t=e.children,a=(0,s.useState)([]),r=a[0],o=a[1],i=(0,s.useState)([]),c=i[0],u=i[1],d=(0,s.useState)([]),m=d[0],x=d[1],f=(0,s.useState)(["JSON Paths","TC 1"]),p={singleTestConfig:r,setSingleTestConfig:o,multiJsonPaths:c,setMultiJsonPaths:u,multiHeaders:f[0],setMultiHeaders:f[1],multiTestConfig:m,setMultiTestconfig:x};return(0,n.jsx)(l.Provider,{value:p,children:t})}},7082:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r,singleCustomTestDataContext:()=>l});var n=a(4246),s=a(7378),l=s.createContext("");const r=function(e){var t=e.children,a=(0,s.useState)(!1),r=a[0],o=a[1],i=(0,s.useState)({}),c=i[0],u=i[1],d=(0,s.useState)({}),m={modalIsOpen:r,setModalIsOpen:o,path:c,setPath:u,option:d[0],setOption:d[1]};return(0,n.jsx)(l.Provider,{value:m,children:t})}},972:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>i});var n=a(4246),s=a(7378),l=a(3960),r=a(7082),o=a(6617);const i=function(e){var t=(0,s.useContext)(r.singleCustomTestDataContext),a=t.modalIsOpen,i=t.setModalIsOpen,c=t.setPath,u=t.setOption;return(0,s.useEffect)((function(){a||(c({}),u({}))}),[a]),(0,n.jsx)(o.default,{message:e.option?JSON.stringify(e.option.value):[],className:"!opacity-90 !bg-gray-900 !right-[-50%] !top-[-50%]",children:(0,n.jsx)(l.default,{size:"small",type:"primary_link",className:"mt-[3px] !pb-0 ",label:"Custom",onClick:function(){return i(!0),c(e.path),void u(e.option)}})})}},998:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>h});var n=a(8772),s=a(3334),l=a(4246),r=a(7378),o=a(7508),i=a(6029),c=a(2912),u=a(642),d=a(470),m=a(972),x=a(5225),f=a(738),p=a(3219),g=a(4075);const h=function(){var e=(0,r.useContext)(u.jsonBodyContext),t=e.parsedPositiveData,a=e.parsedSingleFlag,h=e.setParsedSingleFlag,C=(0,r.useContext)(d.testDataConfigContext),v=C.singleTestConfig,b=C.setSingleTestConfig,j=(0,r.useContext)(g.exportImportContext),y=j.globalImportSingleFlag,S=j.setGlobalImportSingleFlag,N=(0,r.useState)(!1),T=N[0],I=N[1],P=(0,r.useState)([]),_=P[0],F=P[1],k=(0,r.useState)([]),w=k[0],O=k[1],M=function(e){return e.dataType.map((function(t){return(0,l.jsx)("li",{children:(0,l.jsxs)("div",{className:"flex mt-[7px]",children:[(0,l.jsx)(x.default,{onChange:function(a){return function(e,t,a){var l=v.map((function(l){return l.id===t.id?(0,s.Z)((0,n.Z)({},l),{dataType:l.dataType.map((function(t){return t.label===a.label?(0,s.Z)((0,n.Z)({},t),{selected:e.target.checked}):t}))}):l}));b(l)}(a,e,t)},checked:t.selected,className:"ml-[14px]"}),(0,l.jsx)("p",{className:"ml-[2px] !text-left text-sm",children:t.label})]})},"".concat(e.id,"-").concat(t.label))}))};return(0,r.useEffect)((function(){a&&!y&&(b(null===t||void 0===t?void 0:t.testData),h(!1)),a&&y&&(S(!1),h(!1))}),[a,y]),(0,l.jsxs)("div",{className:"min-w-[70%] max-w-[70%]",children:[(0,l.jsx)("div",{className:"flex items-center justify-between mb-[20px]",children:(0,l.jsx)("h1",{className:"text-l font-bold",children:"Kindly input your data"})}),(0,l.jsxs)("div",{className:"flex justify-between mt-[10px]",children:[(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsxs)("p",{className:"text-[12px]",children:[_.length," JsonPaths selected"]}),(0,l.jsxs)("div",{className:"flex items-center pl-[7px]",children:[(0,l.jsx)(x.default,{onChange:function(e){return function(e){var t=v;t.map((function(t){return t.selected=e.target.checked})),b(t),I(e.target.checked),F(v.filter((function(e){return e.selected})))}(e)},checked:T,className:"",disabled:!v}),(0,l.jsx)("label",{className:"pl-[5px] text-sm",children:"Select All"})]})]}),v?(0,l.jsx)(o.ZP,{id:"selectbox",instanceId:"selectbox",isMulti:!0,options:i.dataTypeOptions,onChange:function(e){var t=(0,c.compareArrays)(w,e),a=v.map((function(e){if(e.selected){var a=e.dataType.map((function(e){return(0,s.Z)((0,n.Z)({},e),{selected:t.deleted.length>=1?t.deleted.every((function(t){return e.label!==t.label}))&&e.selected:1===t.added.length&&e.label===t.added[0].label||e.selected})}));return(0,s.Z)((0,n.Z)({},e),{dataType:a})}return e}));b(a),O(e)},value:w,className:"basic-multi-select",classNamePrefix:"select",placeholder:"Select data"}):(0,l.jsx)(l.Fragment,{})]}),v?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("ul",{className:"list-none mt-[20px]",children:v.map((function(e){return(0,l.jsxs)("li",{className:"flex justify-between !text-left rounded-md px-2 border-b border-gray",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center",children:[(0,l.jsx)(x.default,{onChange:function(t){return function(e,t){var a=v;a.map((function(a){return a.id===t.name&&(a.selected=e.target.checked),a}));var n=v.length,s=a.filter((function(e){return e.selected})).length;I(n===s),F(v.filter((function(e){return e.selected}))),b(a)}(t,e)},checked:e.selected}),(0,l.jsx)("p",{className:"px-2 !text-left text-sm",children:e.name})]}),(0,l.jsxs)("ul",{className:"list-none flex flex-row",children:[M(e),(0,l.jsx)("li",{className:"mb-[5px]",children:(0,l.jsx)(m.default,{path:e})},"custom-".concat(e.id))]})]},e.name)}))}),(0,l.jsx)(f.default,{}),(0,l.jsx)(p.default,{})]}):(0,l.jsx)(l.Fragment,{})]})}},738:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>c});var n=a(7378),s=a(642),l=a(470),r=a(3828),o=a(7456),i=a(9520);const c=function(){var e=(0,n.useContext)(s.jsonBodyContext).parsedPositiveData,t=(0,n.useContext)(r.testSummaryContext),a=t.changeSummary,c=t.setChangeSummary,u=(0,n.useContext)(o.defaultCustomTestDataContext).configEntries,d=(0,n.useContext)(l.testDataConfigContext).singleTestConfig;return(0,n.useEffect)((function(){if((null===d||void 0===d?void 0:d.length)>0){var t=(0,i.mapChangeSummary)(d,e.environment,u),n=(0,i.compareAndRetainResponseInSummary)(a,t);c(n)}else c([])}),[d]),null}}},e=>{e.O(0,[3292,7508,3219,8318,9774,2888,179],(()=>{return t=3975,e(e.s=t);var t}));var t=e.O();_N_E=t}]);