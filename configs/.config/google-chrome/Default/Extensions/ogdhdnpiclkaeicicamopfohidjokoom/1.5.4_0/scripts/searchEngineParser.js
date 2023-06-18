if (!com)
    var com = {};
if (!com.pointBlank)
    com.pointBlank = {};
com.pointBlank.parser = {
    urlList: [],
    googleNodeList:[],
    currentUrl: null,
    utils: com.pointBlank.utils,
    dataForCsv: [],
    serpConfig: com.pointBlank.config,
    cls: null,
    cs: null,

    checkWrapperDiv: function () {
        if (document.getElementById('pointBlankCheckDiv123')) return true;
        else return false;
    },
    initParser: function (name, callBack, url) {
        _log.info('search engine name : ', name);
        this.currentUrl = null;
        this.cls = this.serpConfig.classPrefix;
        if (this.checkWrapperDiv()) return false;
        this.urlList = [];
        this.googleNodeList = [];
        var rootNode = this.utils.searchEngineRootNode(name);
        if (!rootNode) {
            return false;
        }
        this.currentUrl = url;
        _log.info('this in init', this);
        return callBack(rootNode);
    },

    checkSerpsOptions:function(provider){
        var backOptions = this.cs.optionData;
        //_log.info('backOptions', backOptions);
        var serpOptions = this.serpConfig.googleSerpOptions;
        //_log.warn('serpOptions', serpOptions);
        var count = serpOptions.length;

        for(var i=0;i<count;i++){
            var type = serpOptions[i].type;
            if(type == provider){
                var key = serpOptions[i].key;
                if(backOptions[key] == 1) {
                    return true;
                }
            }
        }
        return false;
    },
    generateSpans: function () {
        //alert('function call');
        var countFlag = {};
        var boxCount = 1;
        this.cs = com.mieux.jonCooperContent;
        var backOptions = this.cs.optionData;
        //_log.info('backOptions', backOptions);
        var serpOptions = this.serpConfig.googleSerpOptions;
        //_log.warn('serpOptions', serpOptions);
        var count = serpOptions.length;
        var mainDiv = document.createElement('div');
        var self = this;
        mainDiv.setAttribute('class', 'link_miner_serps_main');
        //span.setAttribute('class', 'linkMinerInOutCountSpan');

        try {

            for (var i = 0; i < count; i++) {
                var type = serpOptions[i].type;

                if (!backOptions.ahrefAccessToken && type == 'ahrefs') {
                    continue;
                }
                if (!backOptions.majesticAccessToken && type == 'majestic') {
                    continue;
                }
                if ((!backOptions.mozAccessToken || !backOptions.mozSecretKey) && type == 'mozseo') {
                    continue;
                }
                var key = serpOptions[i].key;
                if (backOptions[key] == 1) {
                    countFlag[type] = (countFlag[type] || 0) + 1;
                    //createSpan(i, countFlag[type]);
                    if(type=='http') {
                        createSpanHttp(i, countFlag[type],type);
                    } else {
                        createSpan(i, countFlag[type],type);
                    }

                }

            }
            function createSpanHttp(i, flag,type){

                var cls = self.serpConfig.classPrefix+serpOptions[i].cls;
                if (flag % 2 != 0) {
                    var innerSpan = document.createElement('span');
                    innerSpan.setAttribute('class', 'link_miner_serps_box' + boxCount);
                    //innerSpan.setAttribute('id','link_miner_serps_box_id'+i);
                    boxCount++;
                   var serps_text1 = document.createElement('span');
                    serps_text1.setAttribute('class','link_miner_serps_text1');
                    serps_text1.setAttribute('id','link_miner_serps_text_id_'+type+flag);

                    var p1 = document.createElement('p');
                    p1.appendChild(document.createTextNode(serpOptions[i].text));
                    serps_text1.appendChild(p1);

                    innerSpan.appendChild(serps_text1);


                    var div1 = document.createElement('span');
                    div1.setAttribute('class','link_miner_serps_numbers '+cls);

                    innerSpan.appendChild(div1);

                    var serps_num = document.createElement('span');
                    serps_num.setAttribute('class','link_miner_serps_num1');

                    var serp_line = document.createElement('span');
                    serp_line.setAttribute('class','link_miner_serps_line');
                    serps_num.appendChild(serp_line);

                    //var serp_empty = document.createElement('span');
                    //serp_empty.setAttribute('class','link_miner_serps_empty');
                    //serps_num.appendChild(serp_empty);

                    innerSpan.appendChild(serps_num);
                    mainDiv.appendChild(innerSpan);


                } else {
                    var itemId = "link_miner_serps_text_id_" +type+ (flag - 1);

                    var p2 = document.createElement('p');
                    p2.appendChild(document.createTextNode(serpOptions[i].text));
                    mainDiv.querySelector('#' + itemId).appendChild(p2);

                    var div = document.createElement('span');
                    div.setAttribute('class','link_miner_serps_num2 '+cls);
                    mainDiv.querySelector('#' + itemId).parentNode.appendChild(div);

                }
            }
            function createSpan(i, flag,type) {
                if (flag % 2 != 0) {
                    var innerSpan = document.createElement('span');
                    innerSpan.setAttribute('class', 'link_miner_serps_box' + boxCount);
                    boxCount++;

                    var iconDiv = document.createElement('span');
                    iconDiv.setAttribute('class', 'link_miner_serps_icon');
                    var icon = document.createElement('img');
                    icon.setAttribute('src', chrome.extension.getURL('images/' + serpOptions[i].img));
                    iconDiv.appendChild(icon);

                    innerSpan.appendChild(iconDiv);

                    var textDiv = document.createElement('span');
                    textDiv.setAttribute('class', 'link_miner_serps_text2');
                    textDiv.setAttribute('id', 'link_miner_serps_text_id_' + type+flag);


                    var text1 = document.createElement('p');
                    text1.appendChild(document.createTextNode(serpOptions[i].text));
                    var s1 = document.createElement('span');
                    s1.setAttribute('class', self.serpConfig.classPrefix + serpOptions[i].cls);

                    text1.appendChild(s1);
                    textDiv.appendChild(text1);
                    innerSpan.appendChild(textDiv);
                    mainDiv.appendChild(innerSpan);
                } else {
                    var text2 = document.createElement('p');
                    text2.appendChild(document.createTextNode(serpOptions[i].text));
                    var s2 = document.createElement('span');
                    s2.setAttribute('class', self.serpConfig.classPrefix + serpOptions[i].cls);

                    text2.appendChild(s2);
                    var parentId = "link_miner_serps_text_id_" + type + (flag - 1);
                    mainDiv.querySelector('#' + parentId).appendChild(text2);
                }
            }
//            _log.info('inner html',mainDiv.innerHTML);
//            _log.info('mainDiv',mainDiv);
            mainDiv.appendChild(this.generateLogo());
            return mainDiv;
        } catch (e) {
            // _log.info('i',i);
            // _log.info('inner html', mainDiv.innerHTML);
            // _log.info('mainDiv', mainDiv);
            _log.info('error handle in span generations',e.toString());
        }
    },
    generateLogo: function () {
        var innerSpan = document.createElement('span');
        innerSpan.setAttribute('class', 'link_miner_serps_box10');

        var iconDiv = document.createElement('span');
        iconDiv.setAttribute('class', 'link_miner_serps_icon link_miner_serps_icon_logo');
        var icon = document.createElement('img');
        icon.setAttribute('src', chrome.extension.getURL('images/target.png'));
        iconDiv.appendChild(icon);

        innerSpan.appendChild(iconDiv);
        return innerSpan;

    },

    google: function (rootNode) {
        var self = com.pointBlank.parser;
        //var self = this;
        var divG = rootNode.querySelectorAll('div.g');
        var divGLength = divG.length;
        _log.info(divGLength);
        self.checkOrCreateDiv(rootNode);
        self.dataForCsv = [];
        //var generatedSpans = self.generateSpans();

        for (var i =0 ;i<divGLength ;i++) {
            var divRC = divG[i].querySelector('div.rc');
            if(divRC) {
                var h3R = divRC.querySelector('h3.r');
                if(h3R) {
                    var aTag = h3R.querySelector('a');
                    var linkUrl = aTag.getAttribute('href');
                    //_log.warn('url : ', aTag.getAttribute('href'));
                    var n = self.generateSpans();
                    divG[i].appendChild(n);
                    self.urlList.push(linkUrl);
                    self.googleNodeList.push(divG[i]);
                    self.callExternalApi(linkUrl, divG[i]);
                }
            }
        }

        var moz = com.pointBlank.mozseo;
        var mozCredentials = moz.getMozCredentials(self.cs.optionData);

        //_log.warn('moz seo = '+self.checkSerpsOptions('mozseo'));

        if(mozCredentials && self.checkSerpsOptions('mozseo') && self.cs.mozErrorFlag == 0) {
            var mozUrl = moz.getMozApiUrl()+'?'+mozCredentials+moz.getMozColumns();
            var callBack = com.pointBlank.mozseo.serverResponse;
            _log.warn('url list in json stringify',JSON.stringify(self.urlList));
            chrome.runtime.sendMessage({
                    "msg": 'mozseo',
                    "url": mozUrl,
                    "postData" :JSON.stringify(self.urlList)
                },
                function (response) {
                    if(callBack) {
                        callBack(response,self.dataForCsv);
                    }
                });
        }

    },

    callExternalApi: function (url, obj) {
        _log.info('url items = ' + url);
        var opt = this.cs.optionData;

        if (opt.inOutLinks == 1) {
            this.sentApiMessage("extenalLinkCount", url, this.manageExternalLinkCount.bind(this), obj);
        }
        if (opt.ahrefAccessToken && this.cs.ahrefErrorFlag == 0 && this.checkSerpsOptions('ahrefs')) {
            this.sentApiMessage("ahrefRank", url, this.manageAhrefRank.bind(this), obj);
        }
        //_log.error('error flag = '+this.cs.majesticErrorFlag);
        if (opt.majesticAccessToken && this.cs.majesticErrorFlag == 0  && this.checkSerpsOptions('majestic')) {
            this.sentApiMessage("majesticItemInfo", url, this.manageMajesticItemInfo.bind(this), obj);
        }

        if (opt.facebookGs == 1) {
            this.sentApiMessage('fbData', url, this.manageSocialData.bind(this), obj, 'facebook', 'fb');
        }
        // if (opt.twitterGs == 1) {
        //     this.sentApiMessage('twitterData', url, this.manageSocialData.bind(this), obj, 'twitter', 'tw');
        // }
        if (opt.pinterestGs == 1) {
            this.sentApiMessage('pinterestData', url, this.manageSocialData.bind(this), obj, 'pinterest', 'pin');
        }
        if (opt.googlePlusGs == 1) {
            this.sentApiMessage('gplusData', url, this.manageSocialData.bind(this), obj, 'googlePlus', 'gp');
        }
        //var mozUrl = com.pointBlank.mozseo.getApiUrl;
        //
        //this.sentApiMessage('mozseo', mozUrl, com.pointBlank.mozseo.serverResponse, obj);


    },
    manageSocialData: function (response, url, obj, type, cls) {
        var itemObj = {};
        var count = this.cs.formatSocialData(response, type);
        if(!count) {count=0;}
        itemObj.key = url;
        itemObj[cls] = count;
        obj.querySelector('.' + this.cls + cls).innerHTML = count;
        this.dataForCsv.push(itemObj);
    },
    manageMajesticItemInfo: function (response, url, obj) {
        _log.info('majestic response', response);
        if (response.statusCode == 200 && response.data.Code == 'OK'
            && response.data.DataTables.Results.Data.length) {
            var data = response.data.DataTables.Results.Data[0];
            this.setMajesticApiData(url, obj,
                this.utils.abbrNum(data.RefDomains,2),
                this.utils.abbrNum(data.ExtBackLinks,2),
                this.utils.abbrNum(data.TrustFlow,2),
                this.utils.abbrNum(data.CitationFlow,2)
            );

        } else if(response.data.ErrorMessage !='') {
            this.cs.majesticErrorFlag = 1;
            //alert('error message = '+response.data.ErrorMessage);
            //this.displayAlert(response.data.ErrorMessage);
            com.pointBlank.popup.showPopup('Majestic Api',response.data.ErrorMessage);
            //this.cs.majesticAlertCount++;
            this.setMajesticApiData(url, obj, 0, 0, 0, 0);

        } else {
            if (this.cs.optionData.majesticAccessToken) {
                this.setMajesticApiData(url, obj, 0, 0, 0, 0);
            }
        }

    },

    setMajesticApiData: function (url, obj, rd, tl, tf, cf) {
        //var cls = this.serpConfig.classPrefix;
        var itemObj = {};
        itemObj.key = url;
        var backOptions = this.cs.optionData;
        if (backOptions.mBacklinkGs == 1) {
            itemObj.mtl = tl;
            obj.querySelector('.' + this.cls + 'mtl').innerHTML = tl;
        }
        if (backOptions.mRefDomainGs == 1) {
            itemObj.mrd = rd;
            obj.querySelector('.' + this.cls + 'mrd').innerHTML = rd;
        }
        if (backOptions.mTrustflowGs == 1) {
            itemObj.mtf = tf;
            obj.querySelector('.' + this.cls + 'mtf').innerHTML = tf;
        }
        if (backOptions.mCitationflowGs == 1) {
            itemObj.mcf = cf;
            obj.querySelector('.' + this.cls + 'mcf').innerHTML = cf;
        }

        this.dataForCsv.push(itemObj);
    },
    sentApiMessage: function (msg, url, callBack, obj, type, cls) {
        chrome.runtime.sendMessage({
                "msg": msg,
                "url": url
            },
            function (response) {
                if(callBack) {
                    callBack(response, url, obj, type, cls);
                }
            });
    },
    manageAhrefRank: function (response, url, obj) {
        //var self = com.pointBlank.parser;
        _log.info('raw ahref rank response', response);
        //if(response.statusCode == 200 && response.data.error=='invalid token') {
        //    this.sentApiMessage('inValidAhrefToken','');
        //    return false;
        //}
        if(response.data.error !='') {
            this.cs.ahrefErrorFlag = 1;
            //alert('error message = '+response.data.error);
            //this.displayAlert(response.data.ErrorMessage);
            com.pointBlank.popup.showPopup('Ahrefs Api',response.data.error);
            //this.cs.majesticAlertCount++;
            this.setAhrefApiData(url, obj, 0, 0, 0);

        } else if (response.statusCode == 200 && response.data.pages.length) {
            var urlRank = response.data.pages[0].ahrefs_rank;
            var backLinks = response.data.pages[0].backlinks;
            var refDomain = response.data.pages[0].refdomains;

            this.setAhrefApiData(url, obj,
                this.utils.abbrNum(urlRank,2),
                this.utils.abbrNum(backLinks,2),
                this.utils.abbrNum(refDomain,2)
            );
        }  else {
            if (this.cs.optionData.ahrefAccessToken) {
                this.setAhrefApiData(url, obj, 0, 0, 0);
            }
        }
    },
    setAhrefApiData: function (url, obj, ur, tl, rd) {
        var itemObj = {};
        itemObj.key = url;
        var backOptions = this.cs.optionData;
        if (backOptions.aUrlRatingGs == 1) {
            itemObj.aur = ur;
            obj.querySelector('.' + this.cls + 'aur').innerHTML = ur;
        }
        if (backOptions.aBacklinkGs == 1) {
            itemObj.atl = tl;
            obj.querySelector('.' + this.cls + 'atl').innerHTML = tl;
        }
        if (backOptions.aRefDomainGs == 1) {
            itemObj.ard = rd;
            obj.querySelector('.' + this.cls + 'ard').innerHTML = rd;
        }

        this.dataForCsv.push(itemObj);
    },
    manageExternalLinkCount: function (response, url, obj) {
        //_log.info('this',this);
        var countsArray = this.htmlParser(response, url, obj);
        var counts = {};
        countsArray.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        var internal = counts.in ? counts.in : 0;
        var external = counts.ex ? counts.ex : 0;
        obj.querySelector('.' + this.cls + 'in').innerHTML = internal;
        obj.querySelector('.' + this.cls + 'out').innerHTML = external;

    },
    checkOrCreateDiv: function (rso) {
        var self = com.pointBlank.parser;
        if (document.getElementById('pointBlankCheckDiv123')) {
            return true;
        } else {
            var div = document.createElement('div');
            div.setAttribute('id', 'pointBlankCheckDiv123');
            div.setAttribute('class', 'linkMinerTopRightCloseBox');

            //var aTag = document.createElement('a');
            //aTag.addEventListener('click',function(){});
            var closeButton = document.createElement("a");
            closeButton.setAttribute('class', ' linkMinerInOutClose');
            closeButton.addEventListener('click', self.removeInOutCount, false);
            div.appendChild(closeButton);

            var downloadButton = document.createElement('span');
            downloadButton.setAttribute('class', 'jon_cooper_chrome_extension_glyphicon-download linkMinerInOutDownload');
            downloadButton.setAttribute('title', 'Download');
            downloadButton.setAttribute('aria-hidden', true);
            downloadButton.addEventListener('click', self.processDataForCSV, false);
            div.appendChild(downloadButton);

            rso.insertBefore(div, rso.firstChild);

            return false;
        }
    },
    manageCsvHeaders: function () {
        var backOptions = this.cs.optionData;
        var serpOptions = this.serpConfig.googleSerpOptions;
        var count = serpOptions.length;
        var data = '';

        for (var i = 0; i < count; i++) {

            if (serpOptions[i].type == 'http') {
                continue;
            }
            if (!backOptions.ahrefAccessToken && serpOptions[i].type == 'ahrefs') {
                continue;
            }
            if (!backOptions.majesticAccessToken && serpOptions[i].type == 'majestic') {
                continue;
            }
            if ((!backOptions.mozAccessToken && !backOptions.mozSecretKey) && serpOptions[i].type == 'mozseo') {
                continue;
            }
            var key = serpOptions[i].key;
            if (backOptions[key] == 1) {
                data += ',' + serpOptions[i].csvColumnTitle;
            }
        }
        return data;
    },
    manageThirdpartyData: function (csvObj) {
        var backOptions = this.cs.optionData;
        var serpOptions = this.serpConfig.googleSerpOptions;
        var count = serpOptions.length;
        var data = '';

        for (var i = 0; i < count; i++) {

            if (serpOptions[i].type == 'http') {
                continue;
            }
            if (!backOptions.ahrefAccessToken && serpOptions[i].type == 'ahrefs') {
                continue;
            }
            if (!backOptions.majesticAccessToken && serpOptions[i].type == 'majestic') {
                continue;
            }
            if ((!backOptions.mozAccessToken && !backOptions.mozSecretKey) && serpOptions[i].type == 'mozseo') {
                continue;
            }

            var key = serpOptions[i].key;
            var cls = serpOptions[i].cls;
            if (backOptions[key] == 1) {
                //data+= ','+csvObj[cls];
                var total = csvObj[cls] ? csvObj[cls] : '0';
                data += ',"' + total + '"';
            }
        }
        return data;
    },
    processDataForCSV: function () {
        var self = com.pointBlank.parser;
        var contentObj = com.mieux.jonCooperContent;
        var utils = com.pointBlank.utils;
        var inOutLinks = contentObj.optionData.inOutLinks;
        //var data = '"URL","Title","In Links","Out Links"';
        var data = '"URL","Title"';

        if (inOutLinks == 1) {
            // data += ',"Number of In Links","Number of Out Links","In Links","Out Links"';
            data += ',"Number of In Links","Number of Out Links"';

        }
        data += self.manageCsvHeaders() + '\r\n';
        var csvData = utils.removeDuplicateArrayOfObjectsAndMerge(self.dataForCsv);
        _log.info(csvData);
        //return false;
        var length = csvData.length;
        if (!length) {
            alert('no data found');
            return false;
        }

        for (var i = 0; i < length; i++) {

            var title = csvData[i].title ? csvData[i].title : '-';
            data += '"' + csvData[i].key + '"';
            data += ',"' + title + '"';

            if (inOutLinks == 1) {

                var noOfInLinks = csvData[i].inLinks.length ? csvData[i].inLinks.length : 0;
                var noOfOutLinks = csvData[i].outLinks.length ? csvData[i].outLinks.length : 0;
                // var inLinks = csvData[i].inLinks.length ? csvData[i].inLinks.join() : 0;
                // var outLinks = csvData[i].outLinks.length ? csvData[i].outLinks.join() : 0;

                data += ',"' + noOfInLinks + '"';
                data += ',"' + noOfOutLinks + '"';
                // data += ',"' + encodeURI(inLinks) + '"';
                // data += ',"' + encodeURI(outLinks) + '"';
            }
            data += self.manageThirdpartyData(csvData[i]) + '\r\n';
        }
        var uriObj = utils.parseUri(self.currentUrl);
        _log.info('urlObj query: ', uriObj.query);
        var queryObj = self.queryStringToObj(uriObj.query);
        var searchText = queryObj.oq ? queryObj.oq : queryObj.q;
        _log.warn('search text = ', searchText);
        var modifiedUrl = uriObj.protocol + '-' + uriObj.host + uriObj.path + '-' + searchText;
        //_log.info('modifiedUrl: '+modifiedUrl);
        var dateTime = moment().format('MM-DD-YYYY-h-m-s');

        var fileName = 'linkminer-' + modifiedUrl + '-' + dateTime + '.csv';
        contentObj.download(data, fileName, "text/csv;charset=utf-8");
    },
    removeInOutCount: function () {
        $('#pointBlankCheckDiv123').remove();
        //$('.linkMinerInOutCountSpan').remove();
        $('.link_miner_serps_main').remove();

    },
    queryStringToObj: function (str) {
        var result = {};
        qStr = str.slice(1).split('&');
        qStr.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
    },
    htmlParser: function (response, url) {
        var countArray = [];
        var itemObj = {};
        itemObj.key = url;
        itemObj.inLinks = [];
        itemObj.outLinks = [];
        //itemObj.type = [];

        //_log.info('Testing>>>>>>>>>>>>>');
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(response, "text/html");
        var title = htmlDoc.title ? htmlDoc.title : '--';
        _log.info('title', title);
        itemObj.title = title;
        var aTag = htmlDoc.getElementsByTagName('a');
        //_log.warn('Total a tag: ' + aTag.length + ' For Url : ' + url);
        for (var i = 0, j = aTag.length; i < j; i++) {
            var tagUrl = aTag[i].getAttribute('href');
            //_log.debug('=================tag url==================', tagUrl);
            if (tagUrl && tagUrl.indexOf('javascript') == 0) continue;
            var urlType = this.checkUrl(url, tagUrl);
            if (urlType == 'in') {
                // var inUrl = this.processLink(url, tagUrl);
                // if (inUrl) {
                //     itemObj.inLinks.push(inUrl);
                // }
                itemObj.inLinks.push(tagUrl);

            } else {
                itemObj.outLinks.push(tagUrl);
            }
            countArray.push(urlType);
        }
        this.dataForCsv.push(itemObj);
        return countArray;

    },
    processLink: function (url, tagUrl) {
        var utils = com.pointBlank.utils;
        var parsedUrl = utils.parseUri(url);
        var host = parsedUrl.host;
        //_log.info('==========Host +++++++++++++++++++',host);
        var protocol = parsedUrl.protocol;
        var changedString = '';
        var regx = /(..\/)+/;
        if (!tagUrl) return '';
        if (tagUrl.indexOf('http') >= 0) {
            return tagUrl;
        } else {
            changedString = tagUrl.replace(regx, '/');
            //_log.info('changed string',changedString);
            return protocol + '://' + host + changedString;
        }
    },

    checkUrl: function (hostUrl, url) {
        var utils = com.pointBlank.utils;
        var parsedUrl = utils.parseUri(url);
        var parsedHostUrl = utils.parseUri(hostUrl);


        if (url && url.indexOf('http') == 0) {

            var url1 = this.domainTools(hostUrl);
            var url2 = this.domainTools(url);
            if (url1 == url2) {
                return 'in';
            } else {
                return 'ex';
            }
        }
        return 'in';
    },
    domainTools: function (url) {
        var domainTools = new DomainTools();
        domainTools.setup(url);
        return domainTools.getShortDomain();
    }
}
