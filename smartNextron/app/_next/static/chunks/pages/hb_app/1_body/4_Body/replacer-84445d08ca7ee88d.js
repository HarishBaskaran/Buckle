(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[8452],{2708:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/hb_app/1_body/4_Body/replacer",function(){return n(2281)}])},2281:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>u});var r=n(3619),a=n(3676),i=n(6611),c=function(){function e(){(0,r.Z)(this,e)}return(0,a.Z)(e,[{key:"isRegEx",value:function(e){return e&&e.test&&e.exec}},{key:"isArray",value:function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{key:"isObject",value:function(e){return"[object Object]"===Object.prototype.toString.call(e)}},{key:"isEqualArray",value:function(e,t){return e.length===t.length&&e.every((function(e,n,r){return t[n]===e}))}},{key:"each",value:function(e,t,n){var r,a;if(this.isArray(e))for(r=0,a=e.length;r<a;r++)t.apply(n,[r,e[r],e]);else for(r in e)e.hasOwnProperty(r)&&t.apply(n,[r,e[r],e])}},{key:"parseNotation",value:function(e){for(var t=[],n=!1,r=0,a=e.length,i="",c=function(){i&&(t.push(i),i="")};r<a;r++)e[r].match(/\[|\]/)?(c(),n="]"!==e[r]):'"'!==e[r]&&"'"!==e[r]&&("."!==e[r]||n?i+=e[r]:c()),r===a-1&&c();return t}},{key:"Replacer",value:function(e,t,n,r){var a=-1!==["string","object"].indexOf("undefined"===typeof e?"undefined":(0,i.Z)(e)),c="string"===typeof t||this.isRegEx(t),u=-1!==["string","object","function"].indexOf("undefined"===typeof n?"undefined":(0,i.Z)(n));if(a&&c&&u)return"string"===typeof e?(this.instance=JSON.parse(e),this.json=!0):this.instance=e,this.pattern="string"===typeof t?t.replace(/'/g,'"'):t,this.replacement=n,this.type=r,this.createIndex(this.instance),this.replace(this.pattern,this.replacement,this.type)}},{key:"createIndex",value:function(e,t){var n=this;this.index=this.index||[],t=t||"",this.each(e,(function(e,r){var a;a=(e+="").match(/^[a-zA-Z]+$/)?t?t+"."+e:e:e.match(/\d+/)?t+"["+e+"]":e.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)?t+"['"+e+"']":t+"."+e,n.index.push(a),"object"===typeof r&&n.createIndex(r,a)}))}},{key:"replace",value:function(e,t,n){var r=this;return this.each(this.index,(function(e,t){if(r.isRegEx(r.pattern)&&t.match(r.pattern))return r.replaceValue(t);if("string"===typeof r.pattern){var n=r.parseNotation(t),a=r.parseNotation(r.pattern);if(r.isEqualArray(n,a))return r.replaceValue(t)}})),r.instance}},{key:"replaceValue",value:function(e){var t=this,n=this.parseNotation(e);n.reduce((function(r,a,i){if(i!==n.length-1)return r[a];var c;switch(c="function"===typeof t.replacement?t.replacement(e,a,r[a]):t.replacement,t.type){case"integer":r[a]=parseInt(c);break;case"float":r[a]=parseFloat(c);break;case"null":r[a]=null;break;case"empty":r[a]=void 0;break;default:r[a]=c}}),this.instance)}},{key:"ReplacerExport",value:function(t,n,r,a,i){var c=(new e).Replacer(t,n,r,a);return"function"===typeof i?i(null,c):c}}]),e}();const u=function(e,t,n,r,a){var i=(new c).ReplacerExport(e,t,n,r,a);return JSON.stringify(i,null,2)}},3619:(e,t,n)=>{"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,{Z:()=>r})},3676:(e,t,n)=>{"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}n.d(t,{Z:()=>a})},6611:(e,t,n)=>{"use strict";function r(e){return e&&e.constructor===Symbol?"symbol":typeof e}n.d(t,{Z:()=>r})}},e=>{e.O(0,[9774,2888,179],(()=>{return t=2708,e(e.s=t);var t}));var t=e.O();_N_E=t}]);