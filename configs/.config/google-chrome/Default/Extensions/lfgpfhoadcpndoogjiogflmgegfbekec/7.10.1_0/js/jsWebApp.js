!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}({"./node_modules/@babel/runtime/helpers/classCallCheck.js":function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},"./node_modules/@babel/runtime/helpers/createClass.js":function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}},"./node_modules/@babel/runtime/helpers/defineProperty.js":function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},"./node_modules/lodash.assignin/index.js":function(e,t){var r=9007199254740991,n="[object Arguments]",o="[object Function]",i="[object GeneratorFunction]",a=/^(?:0|[1-9]\d*)$/;function s(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var u=Object.prototype,l=u.hasOwnProperty,c=u.toString,d=u.propertyIsEnumerable,f=Math.max;function p(e,t){var r=m(e)||function(e){return function(e){return function(e){return!!e&&"object"==typeof e}(e)&&g(e)}(e)&&l.call(e,"callee")&&(!d.call(e,"callee")||c.call(e)==n)}(e)?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],o=r.length,i=!!o;for(var a in e)!t&&!l.call(e,a)||i&&("length"==a||y(a,o))||r.push(a);return r}function h(e,t,r){var n=e[t];l.call(e,t)&&v(n,r)&&(void 0!==r||t in e)||(e[t]=r)}function b(e){if(!w(e))return function(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}(e);var t,r,n,o=(r=(t=e)&&t.constructor,n="function"==typeof r&&r.prototype||u,t===n),i=[];for(var a in e)("constructor"!=a||!o&&l.call(e,a))&&i.push(a);return i}function y(e,t){return!!(t=null==t?r:t)&&("number"==typeof e||a.test(e))&&e>-1&&e%1==0&&e<t}function v(e,t){return e===t||e!=e&&t!=t}var m=Array.isArray;function g(e){return null!=e&&function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=r}(e.length)&&!function(e){var t=w(e)?c.call(e):"";return t==o||t==i}(e)}function w(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var _,x,j,E=(_=function(e,t){!function(e,t,r,n){r||(r={});for(var o=-1,i=t.length;++o<i;){var a=t[o],s=n?n(r[a],e[a],a,r,e):void 0;h(r,a,void 0===s?e[a]:s)}}(t,function(e){return g(e)?p(e,!0):b(e)}(t),e)},x=function(e,t){var r=-1,n=t.length,o=n>1?t[n-1]:void 0,i=n>2?t[2]:void 0;for(o=_.length>3&&"function"==typeof o?(n--,o):void 0,i&&function(e,t,r){if(!w(r))return!1;var n=typeof t;return!!("number"==n?g(r)&&y(t,r.length):"string"==n&&t in r)&&v(r[t],e)}(t[0],t[1],i)&&(o=n<3?void 0:o,n=1),e=Object(e);++r<n;){var a=t[r];a&&_(e,a,r,o)}return e},j=f(void 0===j?x.length-1:j,0),function(){for(var e=arguments,t=-1,r=f(e.length-j,0),n=Array(r);++t<r;)n[t]=e[j+t];t=-1;for(var o=Array(j+1);++t<j;)o[t]=e[t];return o[j]=n,s(x,this,o)});e.exports=E},"./node_modules/webext-redux/lib/alias/alias.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=function(e){return function(){return function(t){return function(r){var n=e[r.type];return t(n?n(r):r)}}}}},"./node_modules/webext-redux/lib/constants/index.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_PORT_NAME=t.PATCH_STATE_TYPE=t.STATE_TYPE=t.DISPATCH_TYPE=void 0;t.DISPATCH_TYPE="chromex.dispatch";t.STATE_TYPE="chromex.state";t.PATCH_STATE_TYPE="chromex.patch_state";t.DEFAULT_PORT_NAME="chromex.port_name"},"./node_modules/webext-redux/lib/index.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Store",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"applyMiddleware",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"wrapStore",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"alias",{enumerable:!0,get:function(){return a.default}});var n=s(r("./node_modules/webext-redux/lib/store/Store.js")),o=s(r("./node_modules/webext-redux/lib/store/applyMiddleware.js")),i=s(r("./node_modules/webext-redux/lib/wrap-store/wrapStore.js")),a=s(r("./node_modules/webext-redux/lib/alias/alias.js"));function s(e){return e&&e.__esModule?e:{default:e}}},"./node_modules/webext-redux/lib/serialization.js":function(e,t,r){"use strict";function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){o(e,t,r[t])}))}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0}),t.withSerializer=t.withDeserializer=t.noop=void 0;var i=function(e){return e};t.noop=i;var a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;return n({},e,e.payload?{payload:t(e.payload)}:{})},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i,r=arguments.length>2?arguments[2]:void 0;return r?function(n){for(var o=arguments.length,i=new Array(o>1?o-1:0),s=1;s<o;s++)i[s-1]=arguments[s];return r.apply(void 0,[n].concat(i))?e.apply(void 0,[a(n,t)].concat(i)):e.apply(void 0,[n].concat(i))}:function(r){for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return e.apply(void 0,[a(r,t)].concat(o))}};t.withDeserializer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return function(t){return function(r,n){return t(s(r,e,n))}}};t.withSerializer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(){for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];if(o.length<=r)throw new Error("Message in request could not be serialized. "+"Expected message in position ".concat(r," but only received ").concat(o.length," args."));return o[r]=a(o[r],e),t.apply(void 0,o)}}}},"./node_modules/webext-redux/lib/store/Store.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(r("./node_modules/lodash.assignin/index.js")),o=r("./node_modules/webext-redux/lib/constants/index.js"),i=r("./node_modules/webext-redux/lib/serialization.js"),a=u(r("./node_modules/webext-redux/lib/strategies/shallowDiff/patch.js")),s=r("./node_modules/webext-redux/lib/util.js");function u(e){return e&&e.__esModule?e:{default:e}}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var c={portName:o.DEFAULT_PORT_NAME,state:{},extensionId:null,serializer:i.noop,deserializer:i.noop,patchStrategy:a.default},d=function(){function e(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,n=r.portName,a=void 0===n?c.portName:n,u=r.state,l=void 0===u?c.state:u,d=r.extensionId,f=void 0===d?c.extensionId:d,p=r.serializer,h=void 0===p?c.serializer:p,b=r.deserializer,y=void 0===b?c.deserializer:b,v=r.patchStrategy,m=void 0===v?c.patchStrategy:v;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),!a)throw new Error("portName is required in options");if("function"!=typeof h)throw new Error("serializer must be a function");if("function"!=typeof y)throw new Error("deserializer must be a function");if("function"!=typeof m)throw new Error("patchStrategy must be one of the included patching strategies or a custom patching function");this.portName=a,this.readyResolved=!1,this.readyPromise=new Promise((function(e){return t.readyResolve=e})),this.browserAPI=(0,s.getBrowserAPI)(),this.extensionId=f,this.port=this.browserAPI.runtime.connect(this.extensionId,{name:a}),this.safetyHandler=this.safetyHandler.bind(this),this.safetyMessage=this.browserAPI.runtime.onMessage.addListener(this.safetyHandler),this.serializedPortListener=(0,i.withDeserializer)(y)((function(){var e;return(e=t.port.onMessage).addListener.apply(e,arguments)})),this.serializedMessageSender=(0,i.withSerializer)(h)((function(){var e;return(e=t.browserAPI.runtime).sendMessage.apply(e,arguments)}),1),this.listeners=[],this.state=l,this.patchStrategy=m,this.serializedPortListener((function(e){switch(e.type){case o.STATE_TYPE:t.replaceState(e.payload),t.readyResolved||(t.readyResolved=!0,t.readyResolve());break;case o.PATCH_STATE_TYPE:t.patchState(e.payload)}})),this.dispatch=this.dispatch.bind(this)}var t,r,a;return t=e,(r=[{key:"ready",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!==e?this.readyPromise.then(e):this.readyPromise}},{key:"subscribe",value:function(e){var t=this;return this.listeners.push(e),function(){t.listeners=t.listeners.filter((function(t){return t!==e}))}}},{key:"patchState",value:function(e){this.state=this.patchStrategy(this.state,e),this.listeners.forEach((function(e){return e()}))}},{key:"replaceState",value:function(e){this.state=e,this.listeners.forEach((function(e){return e()}))}},{key:"getState",value:function(){return this.state}},{key:"replaceReducer",value:function(){}},{key:"dispatch",value:function(e){var t=this;return new Promise((function(r,i){t.serializedMessageSender(t.extensionId,{type:o.DISPATCH_TYPE,portName:t.portName,payload:e},null,(function(e){var t=e.error,o=e.value;if(t){var a=new Error("".concat("\nLooks like there is an error in the background page. You might want to inspect your background page for more details.\n").concat(t));i((0,n.default)(a,t))}else r(o&&o.payload)}))}))}},{key:"safetyHandler",value:function(e){"storeReady"===e.action&&(this.browserAPI.runtime.onMessage.removeListener(this.safetyHandler),this.readyResolved||(this.readyResolved=!0,this.readyResolve()))}}])&&l(t.prototype,r),a&&l(t,a),e}();t.default=d},"./node_modules/webext-redux/lib/store/applyMiddleware.js":function(e,t,r){"use strict";function n(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];var i=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},a={getState:e.getState.bind(e),dispatch:function(){return i.apply(void 0,arguments)}};return r=(r||[]).map((function(e){return e(a)})),i=n.apply(void 0,function(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(r))(e.dispatch),e.dispatch=i,e}},"./node_modules/webext-redux/lib/strategies/constants.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DIFF_STATUS_ARRAY_UPDATED=t.DIFF_STATUS_KEYS_UPDATED=t.DIFF_STATUS_REMOVED=t.DIFF_STATUS_UPDATED=void 0;t.DIFF_STATUS_UPDATED="updated";t.DIFF_STATUS_REMOVED="removed";t.DIFF_STATUS_KEYS_UPDATED="updated_keys";t.DIFF_STATUS_ARRAY_UPDATED="updated_array"},"./node_modules/webext-redux/lib/strategies/shallowDiff/diff.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=[];return Object.keys(t).forEach((function(o){e[o]!==t[o]&&r.push({key:o,value:t[o],change:n.DIFF_STATUS_UPDATED})})),Object.keys(e).forEach((function(e){t.hasOwnProperty(e)||r.push({key:e,change:n.DIFF_STATUS_REMOVED})})),r};var n=r("./node_modules/webext-redux/lib/strategies/constants.js")},"./node_modules/webext-redux/lib/strategies/shallowDiff/patch.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=Object.assign({},e);return t.forEach((function(e){var t=e.change,o=e.key,i=e.value;switch(t){case n.DIFF_STATUS_UPDATED:r[o]=i;break;case n.DIFF_STATUS_REMOVED:Reflect.deleteProperty(r,o)}})),r};var n=r("./node_modules/webext-redux/lib/strategies/constants.js")},"./node_modules/webext-redux/lib/util.js":function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.getBrowserAPI=function(){var t;try{t=e.chrome||e.browser||browser}catch(e){t=browser}if(!t)throw new Error("Browser API is not present");return t}}).call(this,r("./node_modules/webpack/buildin/global.js"))},"./node_modules/webext-redux/lib/wrap-store/wrapStore.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=r("./node_modules/webext-redux/lib/constants/index.js"),i=r("./node_modules/webext-redux/lib/serialization.js"),a=r("./node_modules/webext-redux/lib/util.js"),s=(n=r("./node_modules/webext-redux/lib/strategies/shallowDiff/diff.js"))&&n.__esModule?n:{default:n};var u={portName:o.DEFAULT_PORT_NAME,dispatchResponder:function(e,t){Promise.resolve(e).then((function(e){t({error:null,value:e})})).catch((function(e){console.error("error dispatching result:",e),t({error:e.message,value:null})}))},serializer:i.noop,deserializer:i.noop,diffStrategy:s.default};t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,r=t.portName,n=void 0===r?u.portName:r,s=t.dispatchResponder,l=void 0===s?u.dispatchResponder:s,c=t.serializer,d=void 0===c?u.serializer:c,f=t.deserializer,p=void 0===f?u.deserializer:f,h=t.diffStrategy,b=void 0===h?u.diffStrategy:h;if(!n)throw new Error("portName is required in options");if("function"!=typeof d)throw new Error("serializer must be a function");if("function"!=typeof p)throw new Error("deserializer must be a function");if("function"!=typeof b)throw new Error("diffStrategy must be one of the included diffing strategies or a custom diff function");var y=(0,a.getBrowserAPI)(),v=function(t,r,i){if(t.type===o.DISPATCH_TYPE&&t.portName===n){var a=Object.assign({},t.payload,{_sender:r}),s=null;try{s=e.dispatch(a)}catch(e){s=Promise.reject(e.message),console.error(e)}return l(s,i),!0}},m=function(t){if(t.name===n){var r=(0,i.withSerializer)(d)((function(){return t.postMessage.apply(t,arguments)})),a=e.getState(),s=e.subscribe((function(){var t=e.getState(),n=b(a,t);n.length&&(a=t,r({type:o.PATCH_STATE_TYPE,payload:n}))}));t.onDisconnect.addListener(s),r({type:o.STATE_TYPE,payload:a})}},g=(0,i.withDeserializer)(p),w=function(e){return e.type===o.DISPATCH_TYPE&&e.portName===n};g((function(){var e;return(e=y.runtime.onMessage).addListener.apply(e,arguments)}))(v,w),y.runtime.onMessageExternal?g((function(){var e;return(e=y.runtime.onMessageExternal).addListener.apply(e,arguments)}))(v,w):console.warn("runtime.onMessageExternal is not supported"),y.runtime.onConnect.addListener(m),y.runtime.onConnectExternal?y.runtime.onConnectExternal.addListener(m):console.warn("runtime.onConnectExternal is not supported"),y.tabs.query({},(function(e){var t=!0,r=!1,n=void 0;try{for(var o,i=e[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;y.tabs.sendMessage(a.id,{action:"storeReady"},(function(){chrome.runtime.lastError}))}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}}))}},"./node_modules/webpack/buildin/global.js":function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},"./src/js/jsx/jsWebApp.js":function(e,t,r){"use strict";r.r(t);var n=r("./node_modules/webext-redux/lib/index.js"),o=r("./node_modules/@babel/runtime/helpers/classCallCheck.js"),i=r.n(o),a=r("./node_modules/@babel/runtime/helpers/createClass.js"),s=r.n(a),u=r("./node_modules/@babel/runtime/helpers/defineProperty.js"),l=r.n(u),c="jungleScoutWebAppMessage",d=function(){function e(t){var r=this,n=t.runtime,o=t.extId,a=t.appCode;i()(this,e),l()(this,"broadcastExtensionInfo",(function(){r.sendMessage({action:"updateInstalledExtInfo",payload:{appCode:r.appCode,extId:r.extId}})})),l()(this,"handleMessage",(function(e){var t=e.data,n=e.origin,o=e.source;n==n&&o===window&&t&&t.type===c&&r.runtime.sendMessage(null,{action:t.action,data:t.payload})})),this.runtime=n,this.extId=o,this.appCode=a,window.addEventListener("message",this.handleMessage)}return s()(e,[{key:"startBroadcastingExtInfo",value:function(){this.broadcastExtensionInfo(),this.intervalId=setInterval(this.broadcastExtensionInfo,6e4)}},{key:"stopBroadcastingExtInfo",value:function(){clearTimeout(this.intervalId)}},{key:"removeAllListeners",value:function(){window.removeEventListener("message",this.handleMessage)}},{key:"sendMessage",value:function(e){var t=e.action,r=e.payload;window.postMessage({type:"jungleScoutExtMessage",action:t,payload:r},window.location.origin)}}]),e}(),f=new n.Store;f.ready().then((function(){new d({runtime:chrome.runtime,extId:chrome.runtime.id,appCode:f.getState().globalData.appName}).startBroadcastingExtInfo()}))},6:function(e,t,r){e.exports=r("./src/js/jsx/jsWebApp.js")}});