    //_log.info('\'Allo \'Allo! Content script');
    String.prototype.startsWith = function (text) {
        return this.substr(0, text.length) == text;
    };

    String.prototype.contains = function (text) {
        return this.indexOf(text) !== -1;
    };
    //console.log();
    var dataProvider ='';


    if (!com)
        var com = {};
    if (!com.mieux)
        com.mieux = {};
    com.mieux.jonCooperContent = {
        //totalLength: 0,
        callbackCount: 0,
        rpBoxAmt: '',
        rpBoxPass: '',
        rpBoxPerc: '',
        rpBoxFail: '',
        rpBoxQueue: '',
        queued: 0,
        checked: 0,
        invalid: 0,
        passed: 0,
        totalValid: 0,
        optionData: null,
        urlArray: [],
        statusArray: [],
        currentUrl: '',
        statusNotFoundUrls: [],
        backLinksStatus:[],
        refDomainStatus:[],
        backRefUrls:[],
        currentHostName:'',
        urlForMoz:[],
        mozUrlLen:'',

        fbStatusUrls:[],
        fbStatus:[],

        // twitterStatusUrls:[],
        // twitterStatus:[],

        googlePlusSatusUrls:[],
        googlePlusStatus:[],
        mozArray:[],

        pinterestStatusUrls:[],
        pinterestStatus:[],

        majesticErrorFlag:0,
        mozErrorFlag:0,
        ahrefErrorFlag:0,

        majesticAlertCount:0,
        popup:com.pointBlank.popup,

        //ahrefsAuthUrl: 'https://ahrefs.com/oauth2/authorize.php?response_type=code&amp;client_id=Seo+and+social+statistics-development&amp;scope=api&amp;state=aa9cf095613382395d2103092ad03a55&amp;redirect_uri=http%3A%2F%2Fmieuxstudio.com%2Fdevelopment%2Fahref-outh-client',
        ahrefsAuthUrl: 'https://ahrefs.com/oauth2/authorize.php?response_type=code&client_id=LinkMiner&scope=api&state=c0bdf640488019f7cfe9884061bfb4e6&redirect_uri=http%3A%2F%2F104.131.163.140%2Flinkminer%2Fahref-outh-client',
        majesticAuthUrl:'http://www.majestic.com/apps/GQB7KBIX',
        authText:'<span style="vertical-align: -webkit-baseline-middle;">Authorize link data for LinkMiner : </span>',
        getTotalLinks: function (request) {
            var pageLinks = document.getElementsByTagName('a');
            var linksLength = pageLinks.length;
            var count = 0;
            this.optionData = request.optionData;
            _log.info('options data',this.optionData);
            var currentHost = com.pointBlank.utils.parseUri(request.tabUrl).host;
            var extIcon = request.optionData.extIcon;
            var blacklist = request.listItems;
            for (var i = 0; i < linksLength; i++) {
                var link = pageLinks[i];
                var url = link.href;
                var rel = link.rel;
                var blacklisted = false;


                if (url.length > 0 && url.startsWith('http') && rel !== "nofollow"
                    && $(link).closest('div').attr('id')!='jon_cooper_chrome_extension_viewmore'
                    && $(link).closest('div').attr('id')!='jon_cooper_chrome_extension_auth_status'
                    && $(link).closest('div').attr('id')!='jon_cooper_chrome_extension_top_links') {

                    for (var b = 0; b < blacklist.length; b++) {
                        if (blacklist[b] !== "" && url.contains(blacklist[b])) {
                            blacklisted = true;
                        }
                    }
                    if (!blacklisted) {
                        //console.log('extIcon = '+request.optionData.extIcon);
                        if(extIcon == 'external') {
                            //console.log('url host = '+com.pointBlank.utils.parseUri(url).host);
                            if(com.pointBlank.utils.parseUri(url).host != currentHost) {
                                count++;
                            }

                        } else {
                            count++;
                        }
                    }
                }
            }
            //console.log('count = '+count);
            return count;
        },
        startProcess: function (blacklist, optionData, tabUrl) {
            //var self = com.mieux.jonCooperContent;
            _log.info('startProcess',optionData);
            this.currentUrl = tabUrl;
            this.currentHostName = com.pointBlank.utils.parseUri(tabUrl).host;
            this.urlArray = [];
            this.statusArray = [];
            this.optionData = optionData;
            this.backRefUrls = [];
            this.refDomainStatus = [];
            this.backLinksStatus = [];

            this.fbStatusUrls = [];
            this.fbStatus = [];
            // this.twitterStatusUrls = [];
            // this.twitterStatus = [];
            this.googlePlusSatusUrls = [];
            this.googlePlusStatus = [];
            this.pinterestStatusUrls = [];
            this.pinterestStatus = [];

            this.urlForMoz = [];
            this.mozUrlLen = 0;


            if (document.getElementById('CMY_ReportBox')) return false;
            this.addModalBox();
            this.reportBox();
            this.totalValid = 0;
            this.passed = 0;
            this.invalid = 0;
            this.checked = 0;
            this.queued = 0;
            this.mozArray = [];
            var linksToCheck = optionData.linksToCheck;
            //_log.info('links to check',linksToCheck);
            var pageLinks = document.getElementsByTagName('a');
            var linksLength = pageLinks.length;
            this.totalValid = linksLength;

            _log.info(linksLength);
            for (var i = 0; i < linksLength; i++) {
                var link = pageLinks[i];
                var url = link.href;
                var rel = link.rel;
                var blacklisted = false;
                var urlHost = com.pointBlank.utils.parseUri(url).host;

                if (url.length > 0 && url.startsWith('http') && rel !== "nofollow"
                    && $(link).closest('div').attr('id')!='jon_cooper_chrome_extension_viewmore'
                    && $(link).closest('div').attr('id')!='jon_cooper_chrome_extension_auth_status'
                    && $(link).closest('div').attr('id')!='jon_cooper_chrome_extension_top_links') {
                    for (var b = 0; b < blacklist.length; b++) {
                        if (blacklist[b] !== "" && url.contains(blacklist[b])) {
                            blacklisted = true;
                        }
                    }
                    //version 1.1, If  settings set to ONLY External.
                    //if(!blacklisted && linksToCheck === 'external' && urlHost == hostName){
                    //    blacklisted = true;
                    //}

                    if (blacklisted === true) {
                        //_log.info("Skipped (blacklisted): " + url);
                        this.totalValid -= 1;
                    } else {
                        if(linksToCheck === 'external' && urlHost == this.currentHostName){
                            //_log.info("Skipped (Internal): " + url);
                            this.totalValid -= 1;
                        } else {
                            this.queued += 1;
                            //self.totalLength++;
                            this.checkURL(url, link);
                        }
                    }

                } else {
                    _log.info("Skipped url: " + url);
                    this.totalValid -= 1;
                }
                this.rpBoxAmt.innerHTML = "Links " + this.totalValid;
            }
            //self.rpBoxAmt.innerHTML = "Links " + self.totalValid;
        },
        checkReportBox: function () {
            if (document.getElementById('CMY_ReportBox')) return false;
        },

        addModalBox: function () {
            var html =
                '<div class="jon_cooper_chrome_extension_modal jon_cooper_chrome_extension_fade" id="jon_cooper_chrome_extension_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="jon_cooper_chrome_extension_modal-dialog">' +
                '<div class="jon_cooper_chrome_extension_modal-content">' +
                '<div class="jon_cooper_chrome_extension_modal-header jon_cooper_chrome_extension_bg-primary">' +
                '<button type="button" class="jon_cooper_chrome_extension_close" data-dismiss="rest_modal"><span aria-hidden="true">&times;</span><span class="jon_cooper_chrome_extension_sr-only">Close</span></button>' +
                '<h4 class="jon_cooper_chrome_extension_modal-title" id="myModalLabel">Link Metrics</h4>' +
                '</div>' +
                '<div class="jon_cooper_chrome_extension_modal-body">' +
                '<div id="jon_cooper_chrome_extension_loader" class="jon_cooper_chrome_extension_text-center" style="margin-top:15px; padding:15px 0 20px 0;"><img class="linkMinerLoader" src="' +
                chrome.extension.getURL("images/loader1.gif") + '" /></div>' +


                '<div id="jon_cooper_chrome_extension_social_stats">' +
                '<div class="jon_cooper_chrome_extension-url"><p><strong>Links Url : </strong><span id="jon_cooper_chrome_extension_link"></span></p></div>' +

                '<div class="jon_cooper_chrome_extension-social-media">' +
                '<div>' +
                '<img class="linkMinerSocial" src=' + chrome.extension.getURL("images/icon-facebook2.png") + '>' +
                '<span id="jon_cooper_chrome_extension_fb">0</span>' +
                '</div>' +

                // '<div>' +
                // '<img class="linkMinerSocial" src=' + chrome.extension.getURL("images/icon-twitter2.png") + '>' +
                // '<span id="jon_cooper_chrome_extension_twitter">0</span>' +
                // '</div>' +

                '<div>' +
                '<img class="linkMinerSocial" src=' + chrome.extension.getURL("images/icon-pinterest2.png") + '>' +
                '<span id="jon_cooper_chrome_extension_pinterest">0</span>' +
                '</div>' +

                '<div>' +
                '<img class="linkMinerSocial" src=' + chrome.extension.getURL("images/icon-google2.png") + '>' +
                '<span id="jon_cooper_chrome_extension_google">0</span>' +
                '</div>' +

                '</div>' +

                '<div class="jon_cooper_chrome_extension-results">' +

                '<div class="jon_cooper_chrome_extension-total">' +
                '<p><strong>Total Links</strong> <span id="jon_cooper_chrome_extension_ahref_backLink"></span></p>' +
                '</div>' +

                '<div class="jon_cooper_chrome_extension-ref">' +
                '<p><strong>Referring Domains</strong> <span id="jon_cooper_chrome_extension_ahref_domain"></p>' +
                '</div>' +


                '</div>' +

                '<div id="jon_cooper_chrome_extension_viewmore">' +
                '</div>' +

                '<div id="jon_cooper_chrome_extension_top_links_container">' +
                '<div id="jon_cooper_chrome_extension_loader_tp" class="jon_cooper_chrome_extension_text-center" style="margin-top:15px; padding:15px 0 20px 0; display:none;"><img class="linkMinerLoader" src="' +
                chrome.extension.getURL("images/loader1.gif") + '" /></div>' +
                '<div id="jon_cooper_chrome_extension_top_links"></div>' +
                '</div>' +

                '</div>' +
                    '<div class="jon_cooper_chrome_extension-authorize" id="jon_cooper_chrome_extension_auth_status">' +
                    '</div>' +
                '</div>' +

                '<div class="jon_cooper_chrome_extension_modal-footer">' +
                '<button type="button" class="jon_cooper_chrome_extension_btn jon_cooper_chrome_extension_btn-default" data-dismiss="rest_modal">Close</button>' +

                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            $('body').prepend(html);
        },
        reportBox: function () {

            var self = com.mieux.jonCooperContent;
            var reportBox = document.createElement("div");
            var rbHeader = document.createElement("div");
            var rbPerc = document.createElement("h1");

            var rbAmt = document.createElement("strong");
            var rbQueue = document.createElement("strong");

            var rbPass = document.createElement("strong");
            var rbFail = document.createElement("strong");

            var details = document.createElement('div');
            var detailsLinksQueue = document.createElement("div");

            var rbAmtContainer = document.createElement("div");
            var rbQueueContainer = document.createElement("div");

            var passFailDiv = document.createElement('div');
            var rbPassWrapper = document.createElement('div');
            var rbFailWrapper = document.createElement('div');

            reportBox.setAttribute("id", "CMY_ReportBox");
            reportBox.setAttribute('class', 'jon_cooper_chrome_extension-link-results');
            rbHeader.setAttribute("id", "CMY_RB_Header");
            rbHeader.setAttribute('class', 'jon_cooper_chrome_extension-title');
            rbHeader.innerHTML = "Link Results";

            rbPerc.setAttribute("id", "CMY_RB_Perc");
            details.appendChild(rbPerc);
            details.setAttribute('class', 'jon_cooper_chrome_extension-details');
            detailsLinksQueue.setAttribute('class', 'jon_cooper_chrome_extension-footer');

            passFailDiv.setAttribute('class', 'jon_cooper_chrome_extension-footer');

            rbAmtContainer.appendChild(rbAmt);
            rbQueueContainer.appendChild(rbQueue);

            detailsLinksQueue.appendChild(rbAmtContainer);
            detailsLinksQueue.appendChild(rbQueueContainer);
            details.appendChild(detailsLinksQueue);

            rbAmt.setAttribute("id", "CMY_RB_LC_Left");
            // rbAmt.setAttribute("class", "CMY_RB_LinkCounts");

            rbQueue.setAttribute("id", "CMY_RB_LC_Right");
            // rbQueue.setAttribute("class", "CMY_RB_LinkCounts");

            rbPass.setAttribute("id", "CMY_RB_Pass");
            // rbPass.setAttribute("class", "CMY_RB_ResultCount");
            rbFail.setAttribute("id", "CMY_RB_Fail");
            // rbFail.setAttribute("class", "CMY_RB_ResultCount");

            rbPassWrapper.appendChild(rbPass);
            rbFailWrapper.appendChild(rbFail);
            passFailDiv.appendChild(rbPassWrapper);
            passFailDiv.appendChild(rbFailWrapper);

            document.getElementsByTagName("body")[0].appendChild(reportBox);
            var rpBox = document.getElementById("CMY_ReportBox");

            rpBox.appendChild(rbHeader);
            rpBox.appendChild(details);
            rpBox.appendChild(passFailDiv);


            self.rpBoxPerc = document.getElementById("CMY_RB_Perc");
            self.rpBoxAmt = document.getElementById("CMY_RB_LC_Left");
            self.rpBoxQueue = document.getElementById("CMY_RB_LC_Right");
            self.rpBoxPass = document.getElementById("CMY_RB_Pass");
            self.rpBoxFail = document.getElementById("CMY_RB_Fail");

            self.rpBoxPerc.innerHTML = "0%";
            self.rpBoxAmt.innerHTML = "Links 0";
            self.rpBoxQueue.innerHTML = "Queue 0";
            self.rpBoxPass.innerHTML = "0";
            self.rpBoxFail.innerHTML = "0";

            var span1 = document.createElement('span');
            span1.setAttribute("class", "jon_cooper_chrome_extension_glyphicon-download");
            span1.setAttribute("style", "font-family:'Glyphicons Halflings' !important; font-style: normal !important; font-weight: normal !important; line-height: 1 !important;top: 1px !important; display: inline-block !important;  padding-left: 5px !important; vertical-align: middle !important; cursor: pointer !important;  font-size: 16px !important; text-indent:0 !important;");
            span1.setAttribute('aria-hidden', 'true');
            span1.setAttribute("title", 'Download');

            span1.addEventListener('click', self.prepareCSV, false);
            rbHeader.appendChild(span1);

            var span2 = document.createElement('span');
            span2.setAttribute("class", "jon_cooper_chrome_extension_glyphicon-cog");
            span2.setAttribute("style", "font-family:'Glyphicons Halflings' !important; font-style: normal !important; font-weight: normal !important; line-height: 1 !important;top: 1px !important; display: inline-block !important;  padding-left: 5px !important; vertical-align: middle !important; cursor: pointer !important;  font-size: 16px !important; text-indent:0 !important;");
            span2.setAttribute('aria-hidden', 'true');
            span2.setAttribute("title", 'Settings');

            span2.addEventListener('click', self.openNewTab, false);
            rbHeader.appendChild(span2);
            // rbHeader.appendChild(downloadButton);
            var closeButton = document.createElement("a");
            closeButton.addEventListener('click', self.removeRreportBox, false);
            rbHeader.appendChild(closeButton);
            _log.info('report box added');
        },
        openNewTab: function () {
            // alert('option clicked');
            var url = chrome.extension.getURL('options.html');
            _log.info(url);
            var win = window.open(url, '_blank');
            win.focus();
        },
        checkInternalOrExternal:function(url){
            //var self = com.mieux.jonCooperContent;
            //var hostName = com.pointBlank.utils.parseUri(self.currentUrl).host;
            ////_log.info('host name', hostName);
            if (this.currentHostName == com.pointBlank.utils.parseUri(url).host) {
                return 1;
            } else {
                return 0;
            }
        },
        prepareCSV: function () {
            var self = com.mieux.jonCooperContent;
            var hostName = com.pointBlank.utils.parseUri(self.currentUrl).host;
            var dataForCSV = '"URL","Status Code","Link Type"';

            _log.warn('bl',self.backLinksStatus);
            _log.warn('rd',self.refDomainStatus);
            if(self.optionData.bl){
                dataForCSV +=',"Backlinks"';
            }
            if(self.optionData.rd){
                dataForCSV +=',"Referring Domains"';
            }
            if(self.optionData.facebook) {
                dataForCSV +=',"Facebook"';
            }
            // if(self.optionData.twitter) {
            //     dataForCSV +=',"Twitter"';
            // }
            if(self.optionData.googlePlus) {
                dataForCSV +=',"Google Plus"';
            }
            if(self.optionData.pinterest) {
                dataForCSV +=',"Pinterest"';
            }
            dataForCSV +='\n';

            _log('all urls :', self.statusNotFoundUrls);
            _log('found status urls :', self.urlArray);

            //if (self.statusArray.length == self.totalValid) {
            _log('backRefUrls',self.backRefUrls);
            for (var i = 0, j = self.statusArray.length; i < j; i++) {
                dataForCSV += '"' + self.urlArray[i] + '"' + ',' + '"' + self.statusArray[i] + '",';
                //dataForCSV += self.checkInternalOrExternal(hostName,self.urlArray[i]);
                if (hostName == com.pointBlank.utils.parseUri(self.urlArray[i]).host) {
                    dataForCSV += '"Internal"';
                } else {
                    dataForCSV += '"External"';
                }
                var position = self.backRefUrls.indexOf(self.urlArray[i]);
                if(~position) {
                    if(self.optionData.bl) {
                        dataForCSV +=',"'+self.backLinksStatus[position]+'"';
                    }
                    if(self.optionData.rd) {
                        dataForCSV +=',"'+self.refDomainStatus[position]+'"';
                    }
                } else {
                    if(self.optionData.bl) {
                        dataForCSV +=',"Not received"';
                    }
                    if(self.optionData.rd) {
                        dataForCSV +=',"Not received"';
                    }
                }
                if(self.optionData.facebook) {
                    var fbPosition = self.fbStatusUrls.indexOf(self.urlArray[i]);
                    if(~fbPosition) {
                        dataForCSV +=',"'+self.fbStatus[fbPosition]+'"';
                    } else {
                        dataForCSV +=',"Not received"';
                    }
                }
                // if(self.optionData.twitter) {
                //     var twitterPosition = self.twitterStatusUrls.indexOf(self.urlArray[i]);
                //     if(~twitterPosition) {
                //         dataForCSV +=',"'+self.twitterStatus[twitterPosition]+'"';
                //     } else {
                //         dataForCSV +=',"Not received"';
                //     }
                // }
                if(self.optionData.googlePlus) {
                    var googlePlusPosition = self.googlePlusSatusUrls.indexOf(self.urlArray[i]);
                    if(~googlePlusPosition) {
                        dataForCSV +=',"'+self.googlePlusStatus[googlePlusPosition]+'"';
                    } else {
                        dataForCSV +=',"Not received"';
                    }
                }
                if(self.optionData.pinterest) {
                    var pinterestPosition = self.pinterestStatusUrls.indexOf(self.urlArray[i]);
                    if(~pinterestPosition) {
                        dataForCSV +=',"'+self.pinterestStatus[pinterestPosition]+'"';
                    } else {
                        dataForCSV +=',"Not received"';
                    }
                }


                dataForCSV +='\n';
            }
            if (self.statusNotFoundUrls.length > 0) {
                for (var i = 0, j = self.statusNotFoundUrls.length; i < j; i++) {
                    dataForCSV += '"' + self.statusNotFoundUrls[i] + '"' + ',' + '"Not Checked",';
                    //dataForCSV += self.checkInternalOrExternal(hostName,self.statusNotFoundUrls[i]);
                    if (hostName == com.pointBlank.utils.parseUri(self.statusNotFoundUrls[i]).host) {
                        dataForCSV += '"Internal"';
                    } else {
                        dataForCSV += '"External"';
                    }
                    if(self.optionData.bl) {
                        dataForCSV +=',"-"';
                    }
                    if(self.optionData.rd) {
                        dataForCSV +=',"-"';
                    }
                    if(self.optionData.facebook) {
                        dataForCSV +=',"-"';
                    }
                    // if(self.optionData.twitter) {
                    //     dataForCSV +=',"-"';
                    // }
                    if(self.optionData.googlePlus) {
                        dataForCSV +=',"-"';
                    }
                    if(self.optionData.pinterest) {
                        dataForCSV +=',"-"';
                    }
                    dataForCSV +='\n';
                }
            }
            self.manipulateCsv(dataForCSV);
            //} else {
            //    alert('All the links status is not received yet, Please try when link results is 100%');
            //}
        },
        removeRreportBox: function () {
            //var self = com.mieux.jonCooperContent;
            $('a.CMY_Valid').removeClass('CMY_Valid');
            $('a.CMY_Invalid_dark').removeClass('CMY_Invalid_dark');
            $('a.CMY_Invalid_light').removeClass('CMY_Invalid_light');
            $('span.jon_cooper_chrome_extension_HTTP_response').remove();
            $("#CMY_ReportBox").remove();

            //There is an issue with this portion, When user click close button on link statistics.
            //If modal window was already opened then viewmore and top links html portion removed, but
            //this ain't a proper behave.
            // var viewMore = $('#jon_cooper_chrome_extension_viewmore');
            // var top5Links = $('#jon_cooper_chrome_extension_top_links');
            // if(viewMore) {
            //     viewMore.html('');
            // }
            // if(top5Links) {
            //     top5Links.html('');
            // }
        },
        manageStatusNotFoundUrls: function (url) {
            var position = this.statusNotFoundUrls.indexOf(url);
            if (~position) this.statusNotFoundUrls.splice(position, 1);
        },
        manageCsvRelatedArray: function (url, response) {
            var self = com.mieux.jonCooperContent;
            self.urlArray.push(url);
            self.manageStatusNotFoundUrls(url);
            self.statusArray.push(response);
        },
        checkURL: function (url, link) {
            var self = com.mieux.jonCooperContent;
            if(self.optionData.csvOption == 'external'){
                if(!self.checkInternalOrExternal(url)) {
                    self.statusNotFoundUrls.push(url);
                }
            } else {
                self.statusNotFoundUrls.push(url);
            }

            chrome.runtime.sendMessage({
                    "msg": "check",
                    "url": url
                },
                function (response) {
                    // _log.info('response from background page: ' + response);
                    self.callbackCount++;
                    if (response) {
                        if(self.optionData.csvOption == 'external'){
                            if(!self.checkInternalOrExternal(url)) {
                                self.manageCsvRelatedArray(url, response);
                            }

                        } else {
                            self.manageCsvRelatedArray(url, response);
                        }

                        if (200 <= response && response < 400) {
                            link.classList.add("CMY_Valid");
                            self.passed += 1;
                            self.rpBoxPass.innerHTML = self.passed;
                            if (self.optionData.wl) {

                                var span = self.generateStatusCodeContainer(response, url);
                                link.appendChild(span);
                                self.urlForMoz.push(url);
                                self.checkAndAddMetrics(url, span);

                            }
                        } else {
                            if (response == 404) {
                                link.classList.add("CMY_Invalid_dark");
                            } else {
                                link.classList.add("CMY_Invalid_light");
                            }
                            self.invalid += 1;
                            self.rpBoxFail.innerHTML = self.invalid;

                            var span = self.generateStatusCodeContainer(response, url);
                            link.appendChild(span);
                            self.urlForMoz.push(url);
                            self.checkAndAddMetrics(url, span);
                        }
                        self.queued -= 1;
                        self.checked += 1;

                        if(self.checked == self.totalValid && self.optionData.dataProvider == 'moz') {
                            self.handleUrlForMoz();
                        }

                        self.rpBoxPerc.innerHTML = Math.round((self.checked) / self.totalValid *
                        100) + "%";
                        self.rpBoxQueue.innerHTML = "Queue  " + self.queued;
                    }
                });
        },
        handleUrlForMoz:function(){

            var self = com.mieux.jonCooperContent;
            var array = Array.from(new Set(self.urlForMoz));
            var len = array.length;
            var utils = com.pointBlank.utils;
            var filteredArr =[];

            if (self.optionData.bl || self.optionData.rd) {
                if(self.optionData.ext) {
                    for(var i=0;i<len;i++) {
                        var linkHost = utils.parseUri(array[i]).host;
                        if(self.currentHostName != linkHost) {
                           filteredArr.push(array[i]);
                        }
                    }

                } else {
                    filteredArr=array;
                }
            }
            _log.debug('array length', self.urlForMoz.length);

            self.mozUrlLen = filteredArr.length;
            _log.debug('refined array length',filteredArr.length);
            _log.debug('array', filteredArr);
            var i,j,temp,chunk = 50;
            for (i=0,j=filteredArr.length; i<j; i+=chunk) {
                temp = filteredArr.slice(i,i+chunk);
                _log.warn('i======',temp);
                self.mozApiRequest(temp);
            }
        },
        mozApiRequest:function(arr){
            var self = com.mieux.jonCooperContent;
            var moz = com.pointBlank.mozseo;
            var mozCredentials = moz.getMozCredentials(self.optionData);

            if(mozCredentials) {
                var mozUrl = moz.getMozApiUrl()+'?'+mozCredentials+moz.getMozColumns();
                //var callBack = com.pointBlank.mozseo.serverResponse;
                _log.warn('url list in json stringify',JSON.stringify(arr));
                chrome.runtime.sendMessage({
                        "msg": 'mozseo',
                        "url": mozUrl,
                        "postData" :JSON.stringify(arr)
                    },
                    function (response) {
                        _log.error(response);
                        self.mozServerResponse(response,arr);
                        //if(callBack) {
                        //    callBack(response,self.dataForCsv);
                        //}
                    });
            }
        },
        mozServerResponse:function(res,urls){
            var self = com.mieux.jonCooperContent;
            if(res.statusCode == 200) {
                var data = res.data;
                _log.error('data=========',data);
                if(data.constructor === Array) {
                    //var parsed = JSON.parse(res);
                    for(var x in data){
                        data[x].url = urls[x];
                        self.mozArray.push(data[x]);
                    }
                    if(self.mozArray.length == self.mozUrlLen) {
                        self.mozDomChange();
                    }

                } else if(res.data.error_message){
                    self.popup.showPopup('Moz Api',data.error_message);
                    //com.pointBlank.jonCooperContent.majesticErrorFlag = 1;
                }

            }
        },
        mozDomChange:function(){
            _log.debug('res',this.mozArray);
            var utils = com.pointBlank.utils;
            var pageLinks = document.getElementsByTagName('a');
            var linksLength = pageLinks.length;
            var arr = this.mozArray;

            for (var i = 0; i < linksLength; i++) {
                var link = pageLinks[i];
                var url = link.href;

                for(var j = 0, k = arr.length; j < k; j++){
                    if(arr[j].url==url){
                        var tl = arr[j].uid ? utils.abbrNum(arr[j].uid,2) : 0;
                        var rd = arr[j].uipl ? utils.abbrNum(arr[j].uipl,2) : 0;

                        this.backRefUrls.push(url);
                        var str = '';
                        if (this.optionData.bl) {
                            this.backLinksStatus.push(tl);
                            str+='| BL:'+tl;
                        }
                        if (this.optionData.rd) {
                            this.refDomainStatus.push(rd);
                            str+=' | RD:'+rd;
                        }

                        var text = document.createTextNode(str);
                        link.querySelector('.jon_cooper_chrome_extension_HTTP_response').appendChild(text);
                    }

                }
            }
        },
        generateLinksAhrefData: function (url,response) {
            var self = com.mieux.jonCooperContent;
            var str = ' ';
            self.backRefUrls.push(url);
            if(response.data.error){
                self.popup.showPopup('Ahrefs Api',response.data.error);

            } else {
                if (self.optionData.bl) {
                    var backLinkCount = response.data.metrics.backlinks;
                    self.backLinksStatus.push(backLinkCount);
                    str += ' | BL:' + self.abbrNum(backLinkCount, 2);
                }
                if (self.optionData.rd) {
                    var refDomainCount = response.data.metrics.refdomains;
                    self.refDomainStatus.push(refDomainCount);
                    str += ' | RD:' + self.abbrNum(refDomainCount, 2);
                }
            }
            return str;

        },

        ahrefMetrics: function (url, self, obj) {
            _log.info('ahref::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            chrome.runtime.sendMessage({
                "msg": 'apiData',
                "url": url
            }, function (response) {
                _log.info(response);
                var ch = self.generateLinksAhrefData(url, response);
                if (ch) {
                    var newNode = document.createTextNode(ch);
                }
                obj.appendChild(newNode);
            });
        },
        majesticMetrics: function (url, self, obj) {
            _log.info('majestic++++++++++++++++++++++++++++++++++++++++++++++++++');
            self.backRefUrls.push(url);
            if (self.optionData.bl) {
                chrome.runtime.sendMessage({
                    "msg": 'apiDataMajesticBackLinks',
                    "url": url
                }, function (response) {
                    _log.info(response);

                    if(response.data.ErrorMessage ==''){
                        var backLinkCount = response.data.DataTables.BackLinks.Headers.TotalBackLinks;

                        var ch = ' | BL:' + self.abbrNum(backLinkCount, 2);
                        if (ch) {
                            self.backLinksStatus.push(backLinkCount);
                            var newNode = document.createTextNode(ch);
                        }
                        obj.appendChild(newNode);
                    } else {
                        self.showMajesticError(response.data.ErrorMessage);
                    }

                });
            }
            if (self.optionData.rd) {
                chrome.runtime.sendMessage({
                    "msg": 'apiDataMajesticRefDomains',
                    "url": url
                }, function (response) {
                    _log.info(response);
                    if(response.data.ErrorMessage =='') {
                        var refDomainCount = response.data.DataTables.Request.Data[0].TotalRefDomains;
                        var ch = ' | RD:' + self.abbrNum(refDomainCount, 2);
                        if (ch) {
                            self.refDomainStatus.push(refDomainCount);
                            var newNode = document.createTextNode(ch);
                        }
                        obj.appendChild(newNode);

                    } else {
                        self.showMajesticError(response.data.ErrorMessage);
                    }
                });
            }

        },
        showMajesticError:function(msg){
            var self = com.mieux.jonCooperContent;
            self.popup.showPopup('Majestic Api',msg)
        },
        checkAndExecuteMatrics: function (self, url, obj) {
            if (self.optionData.dataProvider == 'ahref') {
                self.ahrefMetrics(url, self, obj)
            } else if (self.optionData.dataProvider == 'majestic') {
                self.majesticMetrics(url, self, obj);
            }
        },
        checkAndAddMetrics: function (url, obj) {
            var self = com.mieux.jonCooperContent;

            if (self.optionData.bl || self.optionData.rd) {
                if(self.optionData.ext) {
                    var linkHost = com.pointBlank.utils.parseUri(url).host;
                    if(self.currentHostName != linkHost) {
                        self.checkAndExecuteMatrics(self, url, obj);
                    }
                } else {
                    self.checkAndExecuteMatrics(self, url, obj);
                }
            }
            if(self.optionData.facebook){
                self.sentApiMessage("fbData", self.manageFbDataOnPage, obj);
            }
            // if(self.optionData.twitter){
            //     self.sentApiMessage("twitterData", self.manageTwitterDataOnPage, obj);
            // }
            if(self.optionData.pinterest) {
                self.sentApiMessage("pinterestData", self.managePinterestDataOnPage, obj);
            }
            if(self.optionData.googlePlus) {
                self.sentApiMessage("gplusData", self.manageGplusDataOnPage, obj);
            }
        },
        formatSocialData:function(response,network){
            switch(network){
                case 'twitter':
                case 'pinterest':
                    try {
                        return this.abbrNum(response.data.count, 2);
                    } catch (e) {
                        return 0;
                    }
                case 'facebook':
                    try {
                        return this.abbrNum(response.data.data[0].total_count, 2);
                    } catch (e) {
                        return 0;
                    }
                case 'googlePlus':
                    try {
                        var count = response.data[0].result.metadata.globalCounts.count;
                        if (count >= 0) {
                            return this.abbrNum(count, 2);
                        } else {
                            return 0;
                        }
                    } catch (e) {
                       return 0;
                    }
                default: return 0;
            }
        },
        manageFbDataOnPage:function(response,obj){
            var self = com.mieux.jonCooperContent;
            _log.info('fb response : ', response);
            var count = self.formatSocialData(response,'facebook');
            self.fbStatusUrls.push(obj.parentElement.href);
            self.fbStatus.push(count);
            obj.appendChild(document.createTextNode(' | FB:'+count));
        },
        // manageTwitterDataOnPage:function(response,obj){
        //     var self = com.mieux.jonCooperContent;
        //     _log.info('twitter response : ', response);
        //     var count = self.formatSocialData(response,'twitter');
        //     self.twitterStatusUrls.push(obj.parentElement.href);
        //     self.twitterStatus.push(count);
        //     obj.appendChild(document.createTextNode(' | TW:'+count));
        // },
        manageGplusDataOnPage:function(response,obj){
            var self = com.mieux.jonCooperContent;
            _log.info('gplus response : ', response);
            var count = self.formatSocialData(response,'googlePlus');
            self.googlePlusSatusUrls.push(obj.parentElement.href);
            self.googlePlusStatus.push(count);
            obj.appendChild(document.createTextNode(' | GP:'+count));
        },
        managePinterestDataOnPage:function(response,obj){
            var self = com.mieux.jonCooperContent;
            _log.info('pin response : ', response);
            var count = self.formatSocialData(response,'pinterest');
            self.pinterestStatusUrls.push(obj.parentElement.href);
            self.pinterestStatus.push(count);
            obj.appendChild(document.createTextNode(' | PI:'+count));
        },
        generateStatusCodeContainer: function (response, url) {
            var self = com.mieux.jonCooperContent;
            var span = document.createElement('span');
            span.setAttribute('class',
                'jon_cooper_chrome_extension_HTTP_response');
            // span.setAttribute('title', 'Test popup');
            span.setAttribute('data-toggle', 'rest_modal');
            span.setAttribute('data-target',
                'jon_cooper_chrome_extension_myModal');
            // span.setAttribute('data-content', 'This is test content');
            // var ahrefStr = self.checkAndAddMetrics(url,this);
            span.appendChild(document.createTextNode(' | ' + response));
            span.addEventListener('click', function (e) {

                self.callApi(this);
                self.generateViewMore(this);
                e.preventDefault();
                e.stopPropagation();
            }, false);
            //alert('span = '+span);
            return span;
        },
        generateViewMore: function (obj) {
            var targetUrl = obj.parentElement.href;
            var self = com.mieux.jonCooperContent;
            var urlList = '';
            if(self.optionData.dataProvider == 'ahref'){
                urlList = self.getAhrefsViewMoreUrls(targetUrl);
            } else if(self.optionData.dataProvider == 'majestic'){
                urlList = self.getMajesticViewMoreUrls(targetUrl);
            } else if(self.optionData.dataProvider == 'moz') {
                urlList = self.getMozViewMoreUrls(targetUrl);
            }
            _log.debug(':::::::::url list:::::::::::::::::::::::::::::::::::',urlList);

            var html = '<p>View More';
            for (var i = 0, j = urlList.length; i < j; i++) {
                html += '<a href="' + urlList[i].href + '" target="_blank">' + urlList[i].anchor + '</a>';
            }
            html +='</p>'
            $('#jon_cooper_chrome_extension_viewmore').html(html);

        },
        getAhrefsViewMoreUrls : function (url) {
            var encodedURL = encodeURIComponent(url);
            var today = moment().format('YYYY-MM-DD');
            var oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

            return [{
                href: "https://ahrefs.com/site-explorer/overview/exact/?target=" + encodedURL,
                anchor: "Overview Page"
            }, {
                href: "https://ahrefs.com/site-explorer/overview/top-pages/domain/1/ahrefs_rank_desc?target=" + encodedURL,
                anchor: "Top Pages"
            }, {
                href: " https://ahrefs.com/site-explorer/others/broken-links/exact/all/1/ahrefs_rank_desc?target=" + encodedURL,
                anchor: "Broken Links"
            }, {
                href: "https://ahrefs.com/site-explorer/backlinks/v2/new-per-domain/exact/" + oneWeekAgo + "/" + today + "/1/all/recent-recrawl/1/ahrefs_rank_desc?target=" + encodedURL,
                anchor: "New Links"
            }, {
                href: " https://ahrefs.com/site-explorer/backlinks/anchors/exact/phrases/all/1/refdomains_dofollow_desc?target=" + encodedURL,
                anchor: "Anchor Text"
            }, {
                href: "https://ahrefs.com/site-explorer/overview/domain/?target=" + encodedURL,
                anchor: "Domain Links"
            },{
                href:"http://web.archive.org/web/*/"+decodeURIComponent(encodedURL),
                anchor:"Wayback Machine"
            }];
        },

        getMozViewMoreUrls : function (url) {
            var siteUrl = 'https://moz.com/researchtools/ose/links?site=http%3A%2F%2Fwww.test.com&source=external&target=page&group=0&page=1&sort=page_authority';
            var encodedURL = encodeURIComponent(url);
            //var today = moment().format('YYYY-MM-DD');
            //var oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

            return [{
                href: 'https://moz.com/researchtools/ose/links?site='+encodedURL+'&source=external&target=page&group=0&page=1&sort=page_authority',
                anchor: "Overview Page"
            }, {
                href: 'https://moz.com/researchtools/ose/pages?site='+encodedURL+'&sort=page_authority&page=1&filter=all',
                anchor: "Top Pages"
            },
            //    {
            //    href: " https://ahrefs.com/site-explorer/others/broken-links/exact/all/1/ahrefs_rank_desc?target=" + encodedURL,
            //    anchor: "Broken Links"
            //},
                {
                href: 'https://moz.com/researchtools/ose/just-discovered?site='+encodedURL+'&filter=&source=&target=page&page=1&sort=crawled',
                anchor: "New Links"
            }, {
                href: 'https://moz.com/researchtools/ose/anchors?site='+encodedURL+'&source=phrase&target=page&page=1',
                anchor: "Anchor Text"
            }, {
                href: 'https://moz.com/researchtools/ose/domains?site='+encodedURL+'&target=page&sort=domain_authority&page=1',
                anchor: "Domain Links"
            },{
                href:"http://web.archive.org/web/*/"+decodeURIComponent(encodedURL),
                anchor:"Wayback Machine"
            }];
        },

        getMajesticViewMoreUrls: function (url) {
            var encodedURL = encodeURIComponent(url);
            var rootUrl = "https://majestic.com/reports/site-explorer";
            var commonQuery = "folder=&IndexDataSource=F";
            return [{
                //href: rootUrl+"?"+commonQuery+"&scope=domain&q=" + encodedURL,
                href: rootUrl+"?"+commonQuery+"&wildcard=1&q=" + encodedURL,
                anchor: "Overview Page"
            }, {
                href: rootUrl+"/top-pages?"+commonQuery+"&scope=domain&q=" + encodedURL,
                anchor: "Top Pages"
            },
            //{
            //    href: rootUrl+"/lost-backlinks?"+commonQuery+"&scope=domain&q=" + encodedURL,
            //    anchor: "Broken Links"
            //},
            {
                href: rootUrl+"/new-backlinks?"+commonQuery+"&wildcard=1&q=" + encodedURL,
                anchor: "New Links"
            }, {
                href: rootUrl+"/anchor-text?"+commonQuery+"&wildcard=1&q=" + encodedURL,
                anchor: "Anchor Text"
            }, {
                //href: rootUrl+"/referring-domains?"+commonQuery+"&scope=domain&q=" + encodedURL,
                href: rootUrl+"?"+commonQuery+"&scope=domain&q=" + encodedURL,
                anchor: "Domain Links"
            },{
                href:"http://web.archive.org/web/*/"+decodeURIComponent(encodedURL),
                anchor:"Wayback Machine"
            }];
        },
        limitString: function (originalString, length) {
            var formatedString = '';
            var stringLength = originalString.length;
            if (stringLength > length) {
                formatedString = originalString.substring(0, length) + '...';
                return formatedString;
            } else {
                return originalString;
            }
        },
        resetData: function () {
            $('#jon_cooper_chrome_extension_loader').show();

            $('#jon_cooper_chrome_extension_auth_status').html('');
            $('#jon_cooper_chrome_extension_auth_status').hide();

            $('#jon_cooper_chrome_extension_top_links').html('');
            $('#jon_cooper_chrome_extension_link').html('');
            $('#jon_cooper_chrome_extension_google').html('');
            $('#jon_cooper_chrome_extension_fb').html('');
            // $('#jon_cooper_chrome_extension_twitter').html('');
            $('#jon_cooper_chrome_extension_pinterest').html('');
            $('#jon_cooper_chrome_extension_google').html('');

            $('#jon_cooper_chrome_extension_ahref_domain').html('');
            $('#jon_cooper_chrome_extension_ahref_backLink').html('');

        },
        callApi: function (obj) {
            $('#jon_cooper_chrome_extension_myModal').modal();
            var self = com.mieux.jonCooperContent;
            self.resetData();
            //self.checkAndShowTop5Links(obj);
            //alert(self.optionData.dataProvider);


            //TODO: How the next logic will work.check if access token are exists.
            //TODO If both of them missing then show auth.
            //TODO Message and need not to check dataProvider

            if(!self.optionData.ahrefAccessToken && !self.optionData.majesticAccessToken
                && !self.optionData.mozAccessToken){
                var msg = self.authText+self.ahrefAuthMsg()+self.majesticAuthMsg();
                self.showErrorMsg(msg);
                $('#jon_cooper_chrome_extension_loader').hide();
            } else {
                if(self.optionData.dataProvider == 'majestic'){
                    self.sentApiMessage("apiDataMajesticBackLinks", self.manageMajesticApiDataBackLinks, obj);
                    self.sentApiMessage("apiDataMajesticRefDomains", self.manageMajesticApiDataRefDomains, obj);

                } else if(self.optionData.dataProvider == 'ahref') {
                    self.sentApiMessage("apiData", self.manageApiData, obj);
                } else if(self.optionData.dataProvider == 'moz') {
                    var moz = com.pointBlank.mozseo;
                    var mozCredentials = moz.getMozCredentials(self.optionData);
                    //alert('mozCredentials'+mozCredentials);
                    if(mozCredentials) {
                        var target = com.pointBlank.utils.encodeUrl(obj.parentElement.href);
                        var mozUrl = moz.getMozApiUrl()+ target + '?' + mozCredentials + moz.getMozColumns();
                        //alert('mozUrl'+mozUrl);
                        self.sentApiMessage("moz_get", self.manageMozData, obj,mozUrl,1);
                    }
                }
                else {
                    //var msg = self.ahrefAuthMsg()+'<br />'+self.majesticAuthMsg();
                    var msg = "Please select a data provider from option page<br />";
                    self.showErrorMsg(msg);
                    $('#jon_cooper_chrome_extension_loader').hide();
                }
            }

            // self.sentApiMessage("twitterData", self.manageTwitterData, obj);
            self.sentApiMessage("fbData", self.manageFbData, obj);
            self.sentApiMessage("pinterestData", self.managePinterestData, obj);
            self.sentApiMessage("gplusData", self.manageGplusData, obj);
        },
        manageMozData:function(response,obj){
            //alert('moz response'+response);
            var self = com.mieux.jonCooperContent;
            $('#jon_cooper_chrome_extension_loader').hide();

            if (response.statusCode == 200) {
                if(response.data.error_message) {
                    self.showErrorMsg(response.data.error_message);
                    self.showSocialStats();

                } else if (!response.data.status) {
                    //_log.info('ref domains : ' + response.data.metrics.refdomains);
                    //_log.info('back links : ' + response.data.metrics.backlinks);
                    //var blockId = $('#jon_cooper_chrome_extension_social_stats');
                    var tl = response.data.uid ? self.abbrNum(response.data.uid,2) : 0;
                    var rd = response.data.uipl ? self.abbrNum(response.data.uipl,2) : 0;
                    $('#jon_cooper_chrome_extension_ahref_domain').html(rd);
                    $('#jon_cooper_chrome_extension_ahref_backLink').html(tl);

                    $('#jon_cooper_chrome_extension_link').html(self.limitString(obj.parentElement
                        .href, 100));

                    //May be jon_cooper_chrome_extension_link_status is not used , so need to check this later.
                    $('#jon_cooper_chrome_extension_link_status').html(obj.innerHTML.substring(
                        3));
                    //blockId.show();
                    self.showSocialStats();
                    // self.showErrorMsg(msg);
                }
                //else if (response.data.error) {
                //    self.errorMsg(msg,response.data);
                //}
            }
            //else if (response.statusCode == 401) {
            //    self.showErrorMsg(self.authText+self.ahrefAuthMsg());
            //}
        },
        manageMajesticApiDataBackLinks:function(response,obj){
           console.log('majestic response:');
           console.log(response);
            var self = com.mieux.jonCooperContent;
            $('#jon_cooper_chrome_extension_loader').hide();


            //TODO : Here need to check if ahref auth token exists.
            //TODO : If not exists then need to show ahref auth block
            // if(!self.optionData.ahrefAccessToken) {
            //     var msg = self.ahrefAuthMsg()+'<br />';
            // } else {
            //     msg = '';
            // }

            if (response.statusCode == 200) {
                if (response.data.Code=="OK" && response.data.ErrorMessage=="") {
                    //var refDomains = response.data.DataTables.Request.Data.TotalRefDomains;
                    var backLinks = response.data.DataTables.BackLinks.Headers.TotalBackLinks;
                    //_log.info('ref domains : ' + refDomains);
                    _log.info('back links : ' + backLinks);
                    //var blockId = $('#jon_cooper_chrome_extension_social_stats');
                    //$('#jon_cooper_chrome_extension_ahref_domain').html(self.abbrNum(refDomains, 2));
                    $('#jon_cooper_chrome_extension_ahref_backLink').html(self.abbrNum(backLinks, 2));

                    $('#jon_cooper_chrome_extension_link').html(self.limitString(obj.parentElement
                        .href, 100));

                    //May be jon_cooper_chrome_extension_link_status is not used , so need to check this later.
                    //$('#jon_cooper_chrome_extension_link_status').html(obj.innerHTML.substring(
                    //    3));
                    //blockId.show();
                    self.showSocialStats();
                    // self.showErrorMsg(msg);
                } else if (response.data.ErrorMessage) {
                    self.showErrorMsg("Majestic api error<br />"+response.data.Code+"<br />"+response.data.ErrorMessage);
                }
            } else if (response.statusCode == 401) {
                self.showErrorMsg(self.authText+self.majesticAuthMsg());
            }
        },
        manageMajesticApiDataRefDomains:function(response,obj){
            var self = com.mieux.jonCooperContent;
            _log.info('m ref domain: ',response);

            //TODO : Here need to check if ahref auth token exists.
            //TODO : If not exists then need to show ahref auth block

            // if(!self.optionData.ahrefAccessToken) {
            //     var msg = self.ahrefAuthMsg()+'<br />';
            // } else {
            //     msg = '';
            // }
            if (response.statusCode == 200) {
                if (response.data.Code=="OK" && response.data.ErrorMessage=="") {
                    var refDomains = response.data.DataTables.Request.Data[0].TotalRefDomains;
                    //var backLinks = response.data.DataTables.BackLinks.Headers.TotalBackLinks;
                    _log.info('ref domains : ' + refDomains);
                    //_log.info('back links : ' + backLinks);
                    //var blockId = $('#jon_cooper_chrome_extension_social_stats');
                    $('#jon_cooper_chrome_extension_ahref_domain').html(self.abbrNum(refDomains, 2));
                    //$('#jon_cooper_chrome_extension_ahref_backLink').html(self.abbrNum(backLinks, 2));

                    $('#jon_cooper_chrome_extension_link').html(self.limitString(obj.parentElement.href, 100));

                    //May be jon_cooper_chrome_extension_link_status is not used , so need to check this later.
                    //$('#jon_cooper_chrome_extension_link_status').html(obj.innerHTML.substring(3));
                    //blockId.show();
                    self.showSocialStats();
                    // self.showErrorMsg(msg);
                } else if (response.data.ErrorMessage) {
                    self.showErrorMsg("Majestic api error<br />"+response.data.Code+"<br />"+response.data.ErrorMessage);
                }
            }

            else if (response.statusCode == 401) {
                self.showErrorMsg(self.authText+self.majesticAuthMsg());
            }

        },
        majesticAuthMsg:function(){

            var aLink =
                '<a data-provider="majestic" class="jon_cooper_chrome_extension_pull-right" id="jon_cooper_chrome_extension_new_tab" href="' +
                this.majesticAuthUrl + '" target="_blank">MAJESTIC</a><br /><br />' +

                '<div class="jon_cooper_chrome_extension_form-group majestic_access_token_container">'+
                '<div class="jon_cooper_chrome_extension_col-sm-4">'+
                '<input type="text" class="jon_cooper_chrome_extension_form-control" id="majesticAccessToken" placeholder="Majestic Access Token">'+
                '</div>'+
                '<button type="button" id="saveMajesticKey" class="jon_cooper_chrome_extension_btn jon_cooper_chrome_extension_btn-default">Save Token</button>'+
                '</div>';
            return aLink;
        },
        ahrefAuthMsg:function(){

            var aLink =
                '<a data-dismiss="rest_modal" data-provider="ahref" class="jon_cooper_chrome_extension_pull-right" id="jon_cooper_chrome_extension_new_tab" href="' +
                this.ahrefsAuthUrl + '" target="_blank">AHREFS</a>';

            return aLink;
        },
        checkAndShowTop5Links: function (obj) {
            var self = com.mieux.jonCooperContent;
            chrome.runtime.sendMessage({
                    "msg": "getOption",
                    "optionName": "topFiveLinks"
                },
                function (response) {
                    _log.info('get option', response);
                    if (response.data) {
                        $('#jon_cooper_chrome_extension_loader_tp').show();
                        if(self.optionData.dataProvider == 'ahref'){
                            self.sentApiMessage("backLinks", self.manageBackLinks, obj);
                        } else {
                            $('#jon_cooper_chrome_extension_loader_tp').hide();
                            //self.sentApiMessage("majesticTop5", self.manageMajesticTop5, obj);
                        }
                    }
                });
        },
        manageMajesticTop5:function(response){

            var self = com.mieux.jonCooperContent;
            $('#jon_cooper_chrome_extension_loader_tp').hide();

            if (response.statusCode == 200 && response.data.Code=="OK"
                && response.data.ErrorMessage=="") {

                html = '<p class="topFiveLinks">URL\'s Top 5 Links (via Majestic)</p>';
                var majesticArray = response.data.DataTables.Matches.Data;
                _log.info('majestic array',majesticArray);

                if (majesticArray && majesticArray.length>0) {
                    var j = 0;
                    j = majesticArray.length>5 ? 5 : majesticArray.length
                    html += '<table class="jon_cooper_chrome_extension_table jon_cooper_chrome_extension_table-striped jon_cooper_chrome_extension_table-bordered"><thead><tr><td>Rank</td><td>Title</td><td>Url</td></tr></thead><tbody>';
                    for (var i = 0; i < j; i++) {
                        html += '<tr><td>' + majesticArray[i].CitationFlow + '</td><td>' + self.limitString(majesticArray[i].Title, 65) + '</td><td><a target="_blank" href="' + majesticArray[i].URL + '">' + self.limitString(majesticArray[i].URL, 25) + '</a></td></tr>';
                    }
                    html += '</tbody></table>';

                } else {
                    html += '<p class="topFiveLinks"  style="color: #41aedd !important; font-size: 14px !important;">Related data not found on the server.</p>';
                }

            } else {
                html += '<p class="topFiveLinks"  style="color: #41aedd !important; font-size: 14px !important;">'+response.data.ErrorMessage +'</p>';
            }
            $('#jon_cooper_chrome_extension_top_links').html(html);
        },
        sentApiMessage: function (msg, callback, obj, link ,flag) {
            var url='';
            if(flag){
                url = link
            } else {
                url = obj.parentElement.href;
            }
            chrome.runtime.sendMessage({
                "msg": msg,
                "url": url
            }, function (response) {
                _log.info(msg, response);
                callback(response, obj);
            });
        },
        manageGplusData: function (response) {
            var self = com.mieux.jonCooperContent;
            _log.info('google plus response : ', response);
            var blockId = $('#jon_cooper_chrome_extension_google');
            blockId.html(self.formatSocialData(response,'googlePlus'));
        },
        // manageTwitterData: function (response) {
        //     var self = com.mieux.jonCooperContent;
        //     _log.info('twitter response : ', response);
        //     var blockId = $('#jon_cooper_chrome_extension_twitter');
        //     blockId.html(self.formatSocialData(response,'twitter'));
        // },
        manageFbData: function (response) {
            var self = com.mieux.jonCooperContent;
            _log.info('fb response : ', response);
            var blockId = $('#jon_cooper_chrome_extension_fb');
            blockId.html(self.formatSocialData(response,'facebook'));
        },
        managePinterestData: function (response) {
            var self = com.mieux.jonCooperContent;
            _log.info('pin response : ', response);
            var blockId = $('#jon_cooper_chrome_extension_pinterest');
            blockId.html(self.formatSocialData(response,'pinterest'));
        },
        manageBackLinks: function (response) {
            var self = com.mieux.jonCooperContent;
            $('#jon_cooper_chrome_extension_loader_tp').hide();

            if (response.statusCode == 200) {
                var data = response.data.refpages;
                //_log.info('::::::::::::::::backlinks:::::::::::::::', data);
                html = '<p class="topFiveLinks">URL\'s Top 5 Links (via Ahrefs)</p>';
                if (data && data.length>0) {
                    html += '<table class="jon_cooper_chrome_extension_table jon_cooper_chrome_extension_table-striped jon_cooper_chrome_extension_table-bordered"><thead><tr><td>Rank</td><td>Title</td><td>Url</td></tr></thead><tbody>';
                    for (var i = 0, j = data.length; i < j; i++) {
                        html += '<tr><td>' + data[i].ahrefs_rank + '</td><td>' + self.limitString(data[i].title, 65) + '</td><td><a target="_blank" href="' + data[i].url_from + '">' + self.limitString(data[i].url_from, 25) + '</a></td></tr>';
                    }
                    html += '</tbody></table>';

                } else {
                    html += '<p class="topFiveLinks"  style="color: #41aedd !important; font-size: 14px !important;">Related data not found on the server.</p>';
                }
                $('#jon_cooper_chrome_extension_top_links').html(html);
            }
        },
        manageApiData: function (response, obj) {
            var self = com.mieux.jonCooperContent;
            $('#jon_cooper_chrome_extension_loader').hide();

            /*TODO : Here need to check if majestic auth token exists.
             TODO If not exists then need to show majestic auth block
             */
            // if(!self.optionData.majesticAccessToken) {
            //     var msg = self.majesticAuthMsg()+'<br />';
            // } else {
            //     msg = '';
            // }
            if (response.statusCode == 200) {
                if (response.data.metrics) {
                    _log.info('ref domains : ' + response.data.metrics.refdomains);
                    _log.info('back links : ' + response.data.metrics.backlinks);
                    //var blockId = $('#jon_cooper_chrome_extension_social_stats');
                    $('#jon_cooper_chrome_extension_ahref_domain').html(self.abbrNum(response.data.metrics
                        .refdomains, 2));
                    $('#jon_cooper_chrome_extension_ahref_backLink').html(self.abbrNum(response.data
                        .metrics.backlinks, 2));

                    $('#jon_cooper_chrome_extension_link').html(self.limitString(obj.parentElement
                        .href, 100));

                    //May be jon_cooper_chrome_extension_link_status is not used , so need to check this later.
                    $('#jon_cooper_chrome_extension_link_status').html(obj.innerHTML.substring(
                        3));
                    //blockId.show();
                    self.showSocialStats();
                    // self.showErrorMsg(msg);
                } else if (response.data.error) {
                    self.errorMsg('',response.data);
                }
            }
            else if (response.statusCode == 401) {
                self.showErrorMsg(self.authText+self.ahrefAuthMsg());
            }
        },
        //checkAccesToken:function(tokenName){
        //    chrome.runtime.sendMessage({
        //        "msg": 'token'
        //    }, function (response) {
        //        _log.info(response);
        //
        //    });
        //},
        showSocialStats: function () {
            $('.jon_cooper_chrome_extension-url').show();
            $('.jon_cooper_chrome_extension-social-media').show();
            $('.jon_cooper_chrome_extension-results').show();
            $('#jon_cooper_chrome_extension_viewmore').show();
            $('#jon_cooper_chrome_extension_top_links_container').show();

        },
        errorMsg: function (authMsg,data) {
            var self = com.mieux.jonCooperContent;
            var message =
                '<p>Error from ahrefs api side, Please take action accrording to error description<br/>';
            message += '<b>Error Message : </b>' + data.error + '<br />';
            message += '<b>Error Description : </b>' + self.handleError(data.error) + '</p>';
            self.showErrorMsg(authMsg+message);
        },
        showErrorMsg: function (msg) {
            var blockObj = $('.jon_cooper_chrome_extension-authorize');
            //var socialMedia = $('.jon_cooper_chrome_extension-social-media');
            blockObj.html('');
            blockObj.html(msg);
            blockObj.show();
            $('.jon_cooper_chrome_extension-social-media').show();
        },
        abbrNum: function (number, decPlaces) {
            // 2 decimal places => 100, 3 => 1000, etc
            decPlaces = Math.pow(10, decPlaces);

            // Enumerate number abbreviations
            var abbrev = ["k", "m", "b", "t"];

            // Go through the array backwards, so we do the largest first
            for (var i = abbrev.length - 1; i >= 0; i--) {

                // Convert array index to "1000", "1000000", etc
                var size = Math.pow(10, (i + 1) * 3);

                // If the number is bigger or equal do the abbreviation
                if (size <= number) {
                    // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                    // This gives us nice rounding to a particular decimal place.
                    number = Math.round(number * decPlaces / size) / decPlaces;

                    // Handle special case where we round up to the next abbreviation
                    if ((number == 1000) && (i < abbrev.length - 1)) {
                        number = 1;
                        i++;
                    }

                    // Add the letter for the abbreviation
                    number += abbrev[i];

                    // We are done... stop
                    break;
                }
            }

            return number;
        },
        handleError: function (errorMsg) {
            var self = com.mieux.jonCooperContent;
            var msg = '';
            switch (errorMsg) {
                case 'no credit':
                    msg = '<p>You have not any rows left to spend</p>';
                    break;
                case 'invalid token':
                    msg = '<p>Access token is invalid</p>';
                    msg += '<br />'+self.authText+self.ahrefAuthMsg();
                    // msg +=
                    //     '<br /><p>Authorize our chrome extension to access ahrefs api data ';
                    // msg +=
                    //     '<a data-dismiss="rest_modal" id="jon_cooper_chrome_extension_new_tab" href="' +
                    //     self.ahrefsAuthUrl + '" target="_blank">Authorize</a></p>';
                    chrome.runtime.sendMessage({
                        "msg": "deleteLocalStorageAndCookie"
                    });
                    break;
                case 'internal error':
                    msg = '<p>Contact Ahrefs support</p>';
                    break;
                case 'internal billing error':
                    msg = '<p>Contact Ahrefs support</p>';
                    break;
                case 'Subscription is required to use OpenApp API':
                    msg = '<p>Subscription is required to use OpenApp API</p>';
                default:
                    break;
            }
            return msg;
        },
        /*
         *
         * @returns unique id
         */
        generateUniqueId: function () {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (new Date().getTime() + '-' + S4() + S4() + S4());
        },
        manipulateCsv: function (csvData) {
            var uriObj = com.pointBlank.utils.parseUri(this.currentUrl);
            //_log.info('urlObj: ',uriObj);
            var modifiedUrl = uriObj.protocol+'-'+uriObj.host+uriObj.path;
            //_log.info('modifiedUrl: '+modifiedUrl);
            var dateTime = moment().format('MM-DD-YYYY-h-m-s');

            var fileName = 'linkminer-' + modifiedUrl + '-' + dateTime +'.csv';
            // var csvData = this.globalValueStore;
            if (csvData !== '' && csvData !== null) {
                this.download(csvData, fileName, "text/csv;charset=utf-8");
            } else {
                alert('No data found');
                return false;
            }
        },
        download: function (strData, strFileName, strMimeType) {
            var D = document,
                A = arguments,
                a = D.createElement("a"),
                d = A[0],
                n = A[1],
                t = A[2] || "text/plain";

            //build download link:
            a.href = "data:" + strMimeType + "," + encodeURI(strData);


            if (window.MSBlobBuilder) { // IE10
                var bb = new MSBlobBuilder();
                bb.append(strData);
                return navigator.msSaveBlob(bb, strFileName);
            }
            /* end if(window.MSBlobBuilder) */


            if ('download' in a) { //FF20, CH19
                a.setAttribute("download", n);
                a.innerHTML = "downloading...";
                D.body.appendChild(a);
                setTimeout(function () {
                    var e = D.createEvent("MouseEvents");
                    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    a.dispatchEvent(e);
                    D.body.removeChild(a);
                }, 66);
                return true;
            }
            ;
            /* end if('download' in a) */


            //do iframe dataURL download: (older W3)
            var f = D.createElement("iframe");
            D.body.appendChild(f);
            f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : encodeURI)(strData);
            setTimeout(function () {
                D.body.removeChild(f);
            }, 333);
            return true;
        }, /* end download() */
        callParser: function(parserName,url) {
            var urlList = null;
            var parser = com.pointBlank.parser;
            //var domChanger = com.pointBlank.domChanger;
            var callBack = null;
            switch (parserName) {
                case 'google':
                    urlList = parser.initParser('google', parser.google,url);
                    _log.info('google url list = ', urlList);
                    //callBack = domChanger.google;
                    break;
                default:
                    break;
            }

            //if (urlList && urlList.length > 0 && callBack) {
            //    var jsonString = com.pointBlank.utils.convertArrayToJson(urlList);
            //    _log.info('json string', jsonString);
            //    callBack();
            //    //chrome.runtime.sendMessage({
            //    //    method: "getFbCounts",
            //    //    urlList: jsonString
            //    //}, callBack);
            //}

        },
        resetErrorFlag:function(){
            var self = com.mieux.jonCooperContent;
            self.majesticErrorFlag = 0;
            self.mozErrorFlag = 0;
            self.ahrefErrorFlag = 0;
        }
    }
    $(document).on('click', '#jon_cooper_chrome_extension_new_tab', function (e) {
        var self = com.mieux.jonCooperContent;
        var provider = $(this).data('provider');
        _log.info('dataProvider',provider);

        chrome.runtime.sendMessage({
                "msg": 'setDataProvider',
                "provider": provider
            }, function (response) {
                // $('.jon_cooper_chrome_extension_close').trigger('click');
                // alert('background response = '+response.msg);
            });
        if(provider=='majestic') {
            $('.majestic_access_token_container').show();
        }

        self.removeRreportBox();
        window.open(this.href);
        return false;
    });

    $(document).on('click', '#saveMajesticKey ', function (e) {
        //var self = com.mieux.jonCooperContent;
        var accessToken = $('#majesticAccessToken').val();
        if(accessToken){
            $('#jon_cooper_chrome_extension_auth_status').hide();
            //$('#jon_cooper_chrome_extension_myModal').modal('hide');

            chrome.runtime.sendMessage({
                "msg": 'saveMajesticAccessToken',
                "token": accessToken
            }, function (response) {
                $('.jon_cooper_chrome_extension_close').trigger('click');
                alert(response.msg);
                document.location.reload();
            });
        } else {
            alert('access token is empty or invalid');
        }

        //self.removeRreportBox();
        //window.open(this.href);
        return false;
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            var self = com.mieux.jonCooperContent;
            switch (request.msg) {
                case 'blackList':
                    _log.info('data:' , request);
                    //alert(request.self.optionData.dataProvider);
                    dataProvider = request.dataProvider;
                    self.resetErrorFlag();
                    self.startProcess(request.listItems, request.optionData, request.tabUrl);
                    break;
                case 'linkCount':
                    // alert('link count');
                    // _log.info('linkCount request');
                    var count = self.getTotalLinks(request);
                    sendResponse({
                        count: count
                    });
                case 'searchEngine':
                    _log.info(request.searchEngineName);
                    self.resetErrorFlag();
                    self.callParser(request.searchEngineName,request.url);
                    break;
                default:
                    _log.info('Nothing to log');
            }
        });
