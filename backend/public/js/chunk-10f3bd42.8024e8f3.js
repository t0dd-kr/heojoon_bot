(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10f3bd42"],{"0d03":function(t,e,n){var a=n("6eeb"),i=Date.prototype,o="Invalid Date",r="toString",s=i[r],c=i.getTime;new Date(NaN)+""!=o&&a(i,r,(function(){var t=c.call(this);return t===t?s.call(this):o}))},"14c3":function(t,e,n){var a=n("c6b6"),i=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==a(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"1dde":function(t,e,n){var a=n("d039"),i=n("b622"),o=n("60ae"),r=i("species");t.exports=function(t){return o>=51||!a((function(){var e=[],n=e.constructor={};return n[r]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"457f":function(t,e,n){"use strict";var a=n("65ea"),i=n.n(a);i.a},4795:function(t,e,n){var a=n("23e7"),i=n("da84"),o=n("b39a"),r=[].slice,s=/MSIE .\./.test(o),c=function(t){return function(e,n){var a=arguments.length>2,i=a?r.call(arguments,2):void 0;return t(a?function(){("function"==typeof e?e:Function(e)).apply(this,i)}:e,n)}};a({global:!0,bind:!0,forced:s},{setTimeout:c(i.setTimeout),setInterval:c(i.setInterval)})},5319:function(t,e,n){"use strict";var a=n("d784"),i=n("825a"),o=n("7b0b"),r=n("50c4"),s=n("a691"),c=n("1d80"),l=n("8aa5"),u=n("14c3"),d=Math.max,h=Math.min,f=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,v=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};a("replace",2,(function(t,e,n){return[function(n,a){var i=c(this),o=void 0==n?void 0:n[t];return void 0!==o?o.call(n,i,a):e.call(String(i),n,a)},function(t,o){var c=n(e,t,this,o);if(c.done)return c.value;var f=i(t),p=String(this),v="function"===typeof o;v||(o=String(o));var m=f.global;if(m){var x=f.unicode;f.lastIndex=0}var b=[];while(1){var w=u(f,p);if(null===w)break;if(b.push(w),!m)break;var C=String(w[0]);""===C&&(f.lastIndex=l(p,r(f.lastIndex),x))}for(var _="",y=0,I=0;I<b.length;I++){w=b[I];for(var A=String(w[0]),$=d(h(s(w.index),p.length),0),k=[],S=1;S<w.length;S++)k.push(g(w[S]));var B=w.groups;if(v){var E=[A].concat(k,$,p);void 0!==B&&E.push(B);var T=String(o.apply(void 0,E))}else T=a(A,p,$,k,B,o);$>=y&&(_+=p.slice(y,$)+T,y=$+A.length)}return _+p.slice(y)}];function a(t,n,a,i,r,s){var c=a+t.length,l=i.length,u=v;return void 0!==r&&(r=o(r),u=p),e.call(s,u,(function(e,o){var s;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,a);case"'":return n.slice(c);case"<":s=r[o.slice(1,-1)];break;default:var u=+o;if(0===u)return e;if(u>l){var d=f(u/10);return 0===d?e:d<=l?void 0===i[d-1]?o.charAt(1):i[d-1]+o.charAt(1):e}s=i[u-1]}return void 0===s?"":s}))}}))},6547:function(t,e,n){var a=n("a691"),i=n("1d80"),o=function(t){return function(e,n){var o,r,s=String(i(e)),c=a(n),l=s.length;return c<0||c>=l?t?"":void 0:(o=s.charCodeAt(c),o<55296||o>56319||c+1===l||(r=s.charCodeAt(c+1))<56320||r>57343?t?s.charAt(c):o:t?s.slice(c,c+2):r-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},"65ea":function(t,e,n){},8418:function(t,e,n){"use strict";var a=n("c04e"),i=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var r=a(e);r in t?i.f(t,r,o(0,n)):t[r]=n}},"8aa5":function(t,e,n){"use strict";var a=n("6547").charAt;t.exports=function(t,e,n){return e+(n?a(t,e).length:1)}},9263:function(t,e,n){"use strict";var a=n("ad6d"),i=RegExp.prototype.exec,o=String.prototype.replace,r=i,s=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=void 0!==/()??/.exec("")[1],l=s||c;l&&(r=function(t){var e,n,r,l,u=this;return c&&(n=new RegExp("^"+u.source+"$(?!\\s)",a.call(u))),s&&(e=u.lastIndex),r=i.call(u,t),s&&r&&(u.lastIndex=u.global?r.index+r[0].length:e),c&&r&&r.length>1&&o.call(r[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(r[l]=void 0)})),r}),t.exports=r},a15b:function(t,e,n){"use strict";var a=n("23e7"),i=n("44ad"),o=n("fc6a"),r=n("b301"),s=[].join,c=i!=Object,l=r("join",",");a({target:"Array",proto:!0,forced:c||l},{join:function(t){return s.call(o(this),void 0===t?",":t)}})},a36d:function(t,e,n){t.exports=n.p+"img/heojoon.44be84e4.png"},ac1f:function(t,e,n){"use strict";var a=n("23e7"),i=n("9263");a({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,n){"use strict";var a=n("825a");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b301:function(t,e,n){"use strict";var a=n("d039");t.exports=function(t,e){var n=[][t];return!n||!a((function(){n.call(null,e||function(){throw 1},1)}))}},d504:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index"},[n("div",{staticClass:"body"},[n("div",{staticClass:"background-image"}),t._m(0),n("div",{staticClass:"chat",on:{click:function(e){return e.stopPropagation(),t.focusInput(e)}}},[n("div",{staticClass:"chat-flex"},[t._l(t.chats,(function(e){return n("div",{staticClass:"chat-row",style:"text-align: "+(e.isBot?"left":"right")},[e.isBot?n("div",{staticClass:"chat-bot-el"},[n("div",{staticClass:"chat-content"},[n("div",{staticClass:"chat-content-image"},[e.image?n("img",{attrs:{src:e.image,alt:""}}):t._e()]),t._v(" "+t._s(e.content)+" ")]),n("div",{staticClass:"chat-date"},[t._v(" "+t._s(t.dateString(e.date))+" ")])]):n("div",{staticClass:"chat-user-el"},[n("div",{staticClass:"chat-date"},[t._v(" "+t._s(t.dateString(e.date))+" ")]),n("div",{staticClass:"chat-content"},[t._v(" "+t._s(e.content)+" ")])])])})),t.optionList.length>0?n("div",{staticClass:"chat-row"},[n("div",{staticClass:"chat-user-el"},[n("div",{staticClass:"button-input"},t._l(t.optionList,(function(e){return n("div",{staticClass:"button-el",on:{click:function(n){return n.stopPropagation(),t.clickOption(e)}}},[t._v(" "+t._s(e.label)+" ")])})),0)])]):t._e()],2)]),n("div",{staticClass:"container-input"},[n("div",{staticClass:"text-input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.userChat,expression:"userChat"}],attrs:{type:"text",name:"",placeholder:t.placeholder},domProps:{value:t.userChat},on:{keydown:function(e){13===e.keyCode&&t.sendChat()},input:function(e){e.target.composing||(t.userChat=e.target.value)}}}),n("svg",{staticStyle:{"enable-background":"new 0 0 535.5 535.5"},attrs:{version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"535.5px",height:"535.5px",viewBox:"0 0 535.5 535.5","xml:space":"preserve"},on:{click:t.sendChat}},[n("g",[n("path",{attrs:{d:"M256,0C114.848,0,0,114.848,0,256v240c0,8.832,7.168,16,16,16h240c141.152,0,256-114.848,256-256S397.152,0,256,0z\n        \t\t\t M272,320H144c-8.832,0-16-7.168-16-16c0-8.832,7.168-16,16-16h128c8.832,0,16,7.168,16,16C288,312.832,280.832,320,272,320z\n        \t\t\t M368,224H144c-8.832,0-16-7.168-16-16c0-8.832,7.168-16,16-16h224c8.832,0,16,7.168,16,16C384,216.832,376.832,224,368,224z"}})])])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bot-profile"},[a("div",{staticClass:"bot-profile-image"},[a("img",{attrs:{src:n("a36d"),alt:""}})]),a("div",{staticClass:"bot-profile-nickname"},[t._v(" 허준Bot ")])])}],o=(n("a15b"),n("fb6a"),n("0d03"),n("ac1f"),n("5319"),n("4795"),{mounted:function(){document.getElementsByTagName("meta")[2].setAttribute("content","width=640px,max-scale=1.0,user-scalable=no")},data:function(){return{placeholder:"현재 증상을 말해주세요. (예: 딸꾹질)",userChat:"",sessionId:"",chatflowId:"",insId:"",paramId:"",optionList:[],chats:[]}},beforeCreate:function(){var t=this;this.$http.post("/api/connect").then((function(e){console.log(e.data.data),t.chatflowId=e.data.chatflow_id,t.sessionId=e.data.session_id,t.insId=e.data.ins_id;for(var n=e.data.welcome.slice(1),a=0;a<n.length;a++)t.chats.push({isBot:!0,content:n[a].message,date:new Date})}))["catch"]((function(t){console.log(t)}))},methods:{focusInput:function(){$("input").focus()},clickOption:function(t){var e=this;this.optionList=[],this.chats.push({isBot:!1,content:t.label,date:new Date}),this.$forceUpdate(),this.scrollToBottom(),this.$http.post("/api/send",{msg:t.value,session_id:this.sessionId,chatflow_id:this.chatflowId,param_id:this.paramId,ins_id:this.insId}).then((function(t){e.chatflowId=t.data.chatflow_id,e.sessionId=t.data.session_id,e.insId=t.data.ins_id,e.paramId=t.data.param_id,console.log(t.data.data);for(var n=t.data.response,a=0;a<n.length;a++)e.chats.push({isBot:!0,content:n[a].message.replace(" (핑퐁[pingpong.us]에서 생성된 자동답변입니다)",""),date:new Date}),n[a].optionList&&n[a].optionList.length>1&&(e.optionList=n[a].optionList);e.$forceUpdate(),e.scrollToBottom()}))["catch"]((function(t){console.log(t)}))},dateString:function(t){var e=new Date(t);return(e.getHours()<12?"오전 ":"오후 ")+this.pad(e.getHours(),2)+":"+this.pad(e.getMinutes(),2)},pad:function(t,e){return t+="",t.length>=e?t:new Array(e-t.length+1).join("0")+t},sendChat:function(){var t=this;this.userChat&&(this.chats.push({isBot:!1,content:this.userChat,date:new Date}),this.$forceUpdate(),this.scrollToBottom(),this.$http.post("/api/send",{msg:this.userChat,session_id:this.sessionId,chatflow_id:this.chatflowId,param_id:this.paramId,ins_id:this.insId}).then((function(e){t.chatflowId=e.data.chatflow_id,t.sessionId=e.data.session_id,t.insId=e.data.ins_id,t.paramId=e.data.param_id,console.log(e.data.data);for(var n=e.data.response,a=0;a<n.length;a++)t.chats.push({isBot:!0,content:n[a].message.replace(" (핑퐁[pingpong.us]에서 생성된 자동답변입니다)",""),date:new Date}),n[a].optionList&&n[a].optionList.length>1&&(t.optionList=n[a].optionList);t.$forceUpdate(),t.scrollToBottom()}))["catch"]((function(t){console.log(t)})),this.userChat="")},scrollToBottom:function(){setTimeout((function(){$(".chat").animate({scrollTop:$(".chat")[0].scrollHeight},500,"swing")}),10)}}}),r=o,s=(n("457f"),n("2877")),c=Object(s["a"])(r,a,i,!1,null,"d9c1155c",null);e["default"]=c.exports},d784:function(t,e,n){"use strict";var a=n("9112"),i=n("6eeb"),o=n("d039"),r=n("b622"),s=n("9263"),c=r("species"),l=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=!o((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,d){var h=r(t),f=!o((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),p=f&&!o((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[h]=/./[h]),n.exec=function(){return e=!0,null},n[h](""),!e}));if(!f||!p||"replace"===t&&!l||"split"===t&&!u){var v=/./[h],g=n(h,""[t],(function(t,e,n,a,i){return e.exec===s?f&&!i?{done:!0,value:v.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}})),m=g[0],x=g[1];i(String.prototype,t,m),i(RegExp.prototype,h,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)}),d&&a(RegExp.prototype[h],"sham",!0)}}},e8b5:function(t,e,n){var a=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==a(t)}},fb6a:function(t,e,n){"use strict";var a=n("23e7"),i=n("861d"),o=n("e8b5"),r=n("23cb"),s=n("50c4"),c=n("fc6a"),l=n("8418"),u=n("1dde"),d=n("b622"),h=d("species"),f=[].slice,p=Math.max;a({target:"Array",proto:!0,forced:!u("slice")},{slice:function(t,e){var n,a,u,d=c(this),v=s(d.length),g=r(t,v),m=r(void 0===e?v:e,v);if(o(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?i(n)&&(n=n[h],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return f.call(d,g,m);for(a=new(void 0===n?Array:n)(p(m-g,0)),u=0;g<m;g++,u++)g in d&&l(a,u,d[g]);return a.length=u,a}})}}]);