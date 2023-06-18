// 'use strict';
// turn it on

chrome.runtime.onInstalled.addListener(function(details) {
    _log.info('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    _log.info('when tab is reloaded status : ', changeInfo.status);
    _log.info('when tab is reloaded url : ', changeInfo.url);
    if (changeInfo.url) {
        _log.info('Change info url : ', changeInfo.url);
    } else if (changeInfo.status == 'complete' && !changeInfo.url) {
        var bc = com.mieux.jonCooperBackground;
        if (tab.url && tab.active && tab.url.indexOf('http') == 0){
            bc.toolbarButtonClick(tab, 1);
            if(bc.getItem('autoCheck') == 1) {
                clickHandler (tab);
            }

            //setTimeout(function(){ com.mieux.jonCooperBackground.checkSearchEngineAndSendMessageToContentScript(tab); }, 1000);
            } else {
                bc.setBadge(0);
            }
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        // appManager.setURL(tab.url);
        if (tab.url.indexOf('http') == 0) {
            com.mieux.jonCooperBackground.toolbarButtonClick(tab, 1);
            //com.mieux.jonCooperBackground.checkSearchEngineAndSendMessageToContentScript(tab);
        } else {
            com.mieux.jonCooperBackground.setBadge(0);
        }

    });
});

if (!com)
    var com = {};
if (!com.mieux)
    com.mieux = {};
com.mieux.jonCooperBackground = {
    serpConfig:com.pointBlank.config,
    logging: true,
    alertMsg: true,
    checkType: null,
    blacklistDefaults: ["googleleads.g.doubleclick.net", "doubleclick.net",
        "googleadservices.com", "www.googleadservices.com",
        "googlesyndication.com",
        "adservices.google.com", "appliedsemantics.com"
    ],
    checkTypeDefault: "HEAD",
    timeout: 30000,
    //domainName: 'mieuxstudio.com',http://104.131.163.140/
    domainName: '104.131.163.140',
    cookieManager: com.mieux.jonCooperCookieManager,
    // ahrefsApiUrl: 'http://apiv2.ahrefs.com',
    // ahrefsApiMode: 'mode=exact',
    // ahrefsApiOutput: 'output=json',
    // ahrefsApiLimit: 'limit=1000',
    // ahrefsApiFrom: 'from=metrics_extended',
    //?token= f73c39c443acbb81c9802d15e439bd297a8e300d&target=weda.org&limit=1000&from=metrics_extended&mode=exact&output=json'
    ahrefsAuthUrl: 'https://ahrefs.com/oauth2/authorize.php?response_type=code&client_id=LinkMiner&scope=api&state=c0bdf640488019f7cfe9884061bfb4e6&redirect_uri=http%3A%2F%2F104.131.163.140%2Flinkminer%2Fahref-outh-client',
    apiParams: ['access_token', 'refresh_token', 'expires_in', 'token_type',
        'scope'
    ],
    majesticAuthUrl:'http://www.majestic.com/apps/GQB7KBIX',
    twitterApi: 'http://urls.api.twitter.com/1/urls/count.json?url=',
    pinterestApi: 'http://api.pinterest.com/v1/urls/count.json?url=',
    fbApi: 'https://graph.facebook.com/fql?q=SELECT%20like_count,%20total_count,%20share_count,%20click_count,%20comment_count%20FROM%20link_stat%20WHERE%20url%20=',
    // fbApi2: 'https://graph.facebook.com/fql?q=' + urlencode(
    // "SELECT like_count, total_count, share_count, click_count, comment_count FROM link_stat WHERE url = \"{$this->url}\""
    // ),
    metricsExtendedApi: 'http://apiv2.ahrefs.com/?from=metrics_extended&limit=1000&output=json',
    //gplusApi: 'http://mieuxstudio.com/sharecount/googleplus.php?url=',
    gplusApi: 'http://104.131.163.140/linkminer/sharecount/googleplus.php?url=',

    //backLinksApi: 'http://apiv2.ahrefs.com/?from=backlinks&limit=5&order_by=ahrefs_rank:desc&mode=domain&output=json',
    ahrefPagesApi: 'http://apiv2.ahrefs.com/?from=pages_extended&output=json',
    backLinksApi: 'http://apiv2.ahrefs.com/?from=backlinks&limit=5&order_by=ahrefs_rank:desc&output=json',
    majesticApi : 'http://api.majestic.com/api/json?privatekey=8AXJAXLTBXP7FZXT4SMAMXL8&Count=10&datasource=fresh',
    majesticItemInfoApi:'http://api.majestic.com/api/json?privatekey=8AXJAXLTBXP7FZXT4SMAMXL8&datasource=fresh&items=1',
    sendMessageToContentScript:function(tab){
            _log.info('google page found','hell yeah');
            chrome.tabs.sendMessage(tab.id, {
                msg: "searchEngine",
                searchEngineName: 'google',
                url:tab.url
            });
            return false;
    },
    setBadge: function(count) {
        chrome.browserAction.setBadgeText({
            text: count.toString()
        });
    },
    toolbarButtonClick: function(tab, linkFlag) {
        // this.alertMessage('toolbar button clicked');
        _log.info('tab id = ', tab.id);
        _log.info('toolbar button clicked');
        var self = com.mieux.jonCooperBackground;

        if (self.getItem("blacklist") == null) {
            self.setItem("blacklist", self.blacklistDefaults);
        }

        if (self.getItem("checkType") == null) {
            self.setItem("checkType", self.checkTypeDefault);
        }

        if (self.getItem("inOutLinks") == null) {
            _log.info('============================inOutLinks+++++++++++++++=');
            self.setItem("inOutLinks", 1);
        }

        var blackList = self.getItem("blacklist");
        self.checkType = self.getItem("checkType");

        // var showStatusCode = self.getItem('showStatusCode');
        var dataProvider = self.getItem('dataProvider');
        var optionData = {
            bl: self.getItem("backlink"),
            rd: self.getItem('refDomain'),
            wl: self.getItem('showStatusCode'),
            t5l: self.getItem('topFiveLinks'),
            ext: self.getItem('externalLinks'),
            extIcon:self.getItem('extensionIcon'),
            linksToCheck:self.getItem('linksToCheck'),
            csvOption:self.getItem('csvOption'),
            facebook:self.getItem('facebook'),
            twitter:self.getItem('twitter'),
            pinterest:self.getItem('pinterest'),
            googlePlus:self.getItem('googlePlus'),
            dataProvider:self.getItem('dataProvider'),
            ahrefAccessToken:self.getItem('access_token'),
            majesticAccessToken:self.getItem('majestic_access_token'),
            mozAccessToken:self.getItem('moz_access_token'),
            mozSecretKey:self.getItem('moz_secret_key')
        };
        var serpOptions = self.serpConfig.googleSerpOptions;
        var serpCfLen = serpOptions.length;
        for(var i=0; i<serpCfLen;i++) {
            var key = serpOptions[i].key;
            optionData[key] = self.getItem(key);
        }

        _log.info('option data',optionData);
        if (!linkFlag) {
            chrome.tabs.sendMessage(tab.id, {
                msg: 'blackList',
                listItems: blackList,
                optionData: optionData,
                dataProvider: dataProvider,
                tabUrl:tab.url
            });
        } else {
            chrome.tabs.sendMessage(tab.id, {
                msg: 'linkCount',
                listItems: blackList,
                optionData: optionData,
                linkFlag: linkFlag,
                tabUrl: tab.url
            }, function(response) {
                if(response.count) {
                    self.setBadge(response.count);
                }
                // chrome.browserAction.setBadgeText({text: "'"+response.count+"'"});
            });
        }

    },
    setItem: function(key, val) {
        var value = JSON.stringify(val);
        try {
            // _log.info("Inside setItem:" + key + ":" + value);
            localStorage.removeItem(key);
            localStorage.setItem(key, value);
        } catch (e) {
            // _log.info("Error inside setItem");
            _log.info(e.toString());
        }
        // _log.info("Return from setItem" + key + ":" + value);
    },
    deleteApiDataFromLocalStorage: function(self) {
        //var self = com.mieux.jonCooperBackground;
        for (var i = 0, j = self.apiParams.length; i < j; i++) {
            localStorage.removeItem(self.apiParams[i]);
        }
    },

    deleteLocalStorageAndCookie:function(){
        var self = com.mieux.jonCooperBackground;
        self.deleteApiDataFromLocalStorage(self);
        com.mieux.jonCooperCookieManager.deleteCookie(self);
    },

    getItem: function(key) {
        var value;
        // _log.info('Get Item:', key);
        try {
            value = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            // _log.info("Error inside getItem() for key:", key);
            // _log.info('catch error', e.toString());
            value = "null";
        }
        // _log.info("Returning value: ", value);
        // _log.info('length: ' + value.length);
        return value;
    },

    httpRequest: function(url, callback) {
        var self = com.mieux.jonCooperBackground;
        var XMLHttpTimeout = null;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(data) {
            if (xhr.readyState == 4) {
                clearTimeout(XMLHttpTimeout);
                // self.logMessage(callback);
                _log.info('Link status code', xhr.status);
                return callback(xhr.status);
            }
        };
        try {
            xhr.open(self.checkType, url, true);
            xhr.send();
        } catch (e) {
            _log.info('catch error', e.toString());
        }

        XMLHttpTimeout = setTimeout(function() {
            return callback(408);
            xhr.abort();
        }, self.timeout += 1000);
    },


    externalCheckHttpRequest: function(url, callback) {
        var self = com.mieux.jonCooperBackground;
        var XMLHttpTimeout = null;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(data) {
            if (xhr.readyState == 4) {
                clearTimeout(XMLHttpTimeout);
                // self.logMessage(callback);
                _log.info('Link status code', xhr.status);
                return callback(xhr.responseText);
            }
        };
        try {
            xhr.open('GET', url, true);
            xhr.send();
        } catch (e) {
            _log.info('catch error', e.toString());
        }

        XMLHttpTimeout = setTimeout(function() {
            return callback(408);
            xhr.abort();
        }, self.timeout += 1000);
    },
    apiRequest: function(url, callback) {
        _log.info('api request url : ' + url);
        var xhr = new XMLHttpRequest();
        var xhrResponse = null;
        xhr.onreadystatechange = function(data) {
            if (xhr.readyState == 4) {
                xhrResponse = xhr.responseText;
                if (url.indexOf('http://api.pinterest.com/v1/urls/count.json') == 0) {
                    xhrResponse = xhrResponse.substring(13, xhrResponse.length - 1);
                }
                _log.info('api response for ' + url + '=======', xhrResponse);
                return callback({
                    statusCode: 200,
                    data: JSON.parse(xhrResponse)
                });
            }
        };
        try {
            xhr.open('GET', url, true);
            xhr.send();
        } catch (e) {
            _log.info('catch error', e.toString());
        }
    },
    httpPostRequest:function(url,postData,callback){
        _log.info('api request url : ' + url);
        var xhr = new XMLHttpRequest();
        var xhrResponse = null;
        xhr.onreadystatechange = function(data) {
            if (xhr.readyState == 4) {
                xhrResponse = xhr.responseText;

                _log.info('api response for ' + url + '=======', xhrResponse);
                return callback({
                    statusCode: 200,
                    data: JSON.parse(xhrResponse)
                });
            }
        };
        try {
            xhr.open('POST', url, true);
            xhr.send(postData);
        } catch (e) {
            _log.info('catch error', e.toString());
        }
    },
    getHostName: function(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 &&
            typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    },
    checkAndCallApi: function(targetUrl, apiUrl, callback,modeFlag) {
        var self = com.mieux.jonCooperBackground;
        var token = self.getItem('access_token');
        var mode = self.getItem('typeOfData');
        if(!mode) {
            mode = 'exact';
        }
        _log.info('token', token);
        if(modeFlag) {
            mode = modeFlag;
        }
        if (token) {
            var url = apiUrl+'&mode='+ mode + '&token=' + token + '&target=' + encodeURIComponent(targetUrl);
            _log.info('api url : ', url);
            self.apiRequest(url, callback);
        } else {
            callback({
                statusCode: '401',
                url: self.ahrefsAuthUrl
            });
        }
    },
    getMajesticMode:function(targetUrl){
        var self = com.mieux.jonCooperBackground;
        var domainTools = new DomainTools();
        domainTools.setup(targetUrl);
        var url = targetUrl;
        var subdomain = domainTools.getSubDomain();
        _log.info('subdomain',subdomain);
        var domain = domainTools.getShortDomain();
        _log.info('domain',domain);

        var mode = self.getItem('typeOfData');
        if(!mode) {
            return url;
        }
        switch (mode){
            case 'exact':
                return url;
            case 'prefix':
                return subdomain;
            case 'domain':
                return domain;
        }

    },
    checkAndCallMajesticApi:function(targetUrl, apiUrl,cmd,item_param, callback,itemType){
        var self = com.mieux.jonCooperBackground;
        var token = self.getItem('majestic_access_token');
        var item = '';
        if(token) {
            if(itemType) {
                item = targetUrl;
            } else {
                item = self.getMajesticMode(targetUrl);
            }

            var url = apiUrl +'&'+item_param+'='+ encodeURIComponent(item) + '&accesstoken=' + token +'&'+cmd;
            _log.info('api url : ', url);
            self.apiRequest(url, callback);

        }  else {
        callback({
            statusCode: '401',
            url: self.majesticAuthUrl
        });
}
    },
    cookieHandler:function() {
        var self = com.mieux.jonCooperBackground;
        var token = self.getItem('access_token');
        if (!token) {
            chrome.cookies.getAll({
                'domain': self.domainName
            }, com.mieux.jonCooperCookieManager.cookieInit);
        }
    },
    checkGoogleSerpOptions:function(){
        var serpOptions = this.serpConfig.googleSerpOptions;
        var serpLen = serpOptions.length;
        for(var i=0;i<serpLen;i++){
            var key = serpOptions[i].key;
            if(this.getItem(key)==1) {
                return true;
            }
        }
        return false;
    }
};

chrome.browserAction.onClicked.addListener(function(tab) {
    clickHandler (tab,1);
});
function clickHandler (tab,flag){
    var self = com.mieux.jonCooperBackground;
    self.cookieHandler();
    var utils = com.pointBlank.utils;
    var checkGoogle = utils.checkGoogleSearchEngine(tab);
    _log.error('check google',checkGoogle);
    if(checkGoogle) {
        if (self.checkGoogleSerpOptions()) {
            self.sendMessageToContentScript(tab);
            return false;
        }
    }
    if(flag){
        self.toolbarButtonClick(tab, 0);
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    var self = com.mieux.jonCooperBackground;
    switch (request.msg) {
        case 'check':
            self.httpRequest(request.url, callback);
            break;
        case 'apiData':
            _log.info('apiData called');
            self.checkAndCallApi(request.url, self.metricsExtendedApi, callback);
            break;
        case 'ahrefRank':
            self.checkAndCallApi(request.url,self.ahrefPagesApi, callback,'exact');
            break;
        case 'apiDataMajesticBackLinks':
            _log.info('apiDataMajesticBackLinks called');
            var cmd="cmd=GetBackLinkData";
            var item = "item";
            self.checkAndCallMajesticApi(request.url, self.majesticApi,cmd,item, callback);
            break;
        case 'apiDataMajesticRefDomains':
            _log.info('apiDataMajesticRefDomains called');
            var cmd="cmd=GetRefDomains";
            var item = "item0";
            self.checkAndCallMajesticApi(request.url, self.majesticApi,cmd,item, callback);
            break;
        case 'majesticItemInfo':
            var cmd = "cmd=GetIndexItemInfo";
            var item = "item0";
            self.checkAndCallMajesticApi(request.url, self.majesticItemInfoApi,cmd,item, callback,1);
            break;
        case 'majesticTop5':
            _log.info('majesticTop5 called');
            var cmd="cmd=GetTopPages";
            var item = "Query";
            self.checkAndCallMajesticApi(request.url, self.majesticApi,cmd,item, callback);
            break;
        case 'backLinks':
            _log.info('topLinks called');
            self.checkAndCallApi(request.url, self.backLinksApi, callback);
            break;
        case 'twitterData':
            _log.info('twiitter api called');
            self.apiRequest(self.twitterApi + request.url, callback);
            break;
        case 'fbData':
            _log.info('facebook api called');
            self.apiRequest(self.fbApi + '"' + request.url + '"', callback);
            break;
        case 'pinterestData':
            _log.info('pinterestData api called');
            self.apiRequest(self.pinterestApi + request.url, callback);
            break;
        case 'gplusData':
            _log.info('gplusData api called');
            self.apiRequest(self.gplusApi + request.url, callback);
            break;
        case 'getOption':
            _log.info('read options from local storage');
            // self.readOptions(request.optionName,callback);
            var optionValue = self.getItem(request.optionName);
            callback({
                data: optionValue
            });
            break;
        case 'deleteLocalStorageAndCookie':
            self.deleteLocalStorageAndCookie();

            break;
        case 'saveMajesticAccessToken':
            self.setItem('majestic_access_token',request.token);
            callback({
                msg: 'Access token saved successfully'
            });
            break;
        case 'setDataProvider':
            self.setItem('dataProvider',request.provider);
            callback({
                msg: self.getItem('dataProvider')
            });
            break;
        case 'extenalLinkCount':
            _log.info('external link count api called');
            self.externalCheckHttpRequest(request.url, callback);
            //self.checkAndCallApi(request.url, self.metricsExtendedApi, callback);
            //callback({
            //    msg: Math.floor(Math.random() * 6) + 1
            //});
            //self.apiRequest(self.gplusApi + request.url, callback);
            break;
        case 'inValidAhrefToken':
            self.deleteLocalStorageAndCookie();
            break;
        case 'mozseo':
            self.httpPostRequest(request.url,request.postData, callback);
            break;
        case 'moz_get':
            self.apiRequest(request.url, callback);
            break;
        default:
            _log.info('Nothing!!!!!!!!');
    }
    return true;

});
