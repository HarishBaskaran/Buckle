(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4688],{2035:function(t,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hb_app/1_body/utils/random_generator",function(){return r(3596)}])},3596:function(t,n,r){"use strict";function e(t){let n="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",e=r.length;for(let o=0;o<t;o++){let t=Math.floor(Math.random()*e),o=r.charAt(t);n+=o}return n}function o(t){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return n}function a(t){let n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r="",e=!1;for(let o=0;o<t;o++)if(o!==t-1||e){let t=Math.floor(Math.random()*n.length);r+=n.charAt(t),/\d/.test(r.charAt(o))&&(e=!0)}else{let t=Math.floor(10*Math.random());r+=t.toString()}return r}r.r(n),r.d(n,{generateRandomAlphaNumeric:function(){return a},generateRandomNumber:function(){return o},generateRandomString:function(){return e}}),n.default=()=>{}}},function(t){t.O(0,[9774,2888,179],function(){return t(t.s=2035)}),_N_E=t.O()}]);