if (!com)
    var com = {};
if (!com.pointBlank)
    com.pointBlank = {};
com.pointBlank.mozseo = {
     utils:com.pointBlank.utils,
     serverResponse: function (res,dataForCsv) {
        //_log.info('nodelist', nodeList);
        if(res.statusCode == 200) {
            var data = res.data;
            if(data.constructor === Array) {
                com.pointBlank.mozseo.changeDom(data,dataForCsv);
            } else if(data.error_message){
                com.pointBlank.popup.showPopup('Moz Api',data.error_message);
                com.pointBlank.jonCooperContent.majesticErrorFlag = 1;
            }
        }
    },
    changeDom:function(data,dataForCsv){
        var self = com.pointBlank.mozseo;


        var rootNode = self.utils.searchEngineRootNode('google');
        if (!rootNode) {
            return false;
        }
        var divG = rootNode.querySelectorAll('div.g');
        var divGLength = divG.length;
        _log.info(divGLength);
        var count = 0;
        for (var i =0 ;i<divGLength ;i++) {
            var divRC = divG[i].querySelector('div.rc');
            if(divRC) {
                var h3R = divRC.querySelector('h3.r');
                if(h3R) {
                    var aTag = h3R.querySelector('a');
                    var linkUrl = aTag.getAttribute('href');
                    var itemObj = {};
                    itemObj.key = linkUrl;
                    //var dataIndex = self.searchUrlIndex(data,linkUrl[1]);
                    //_log.warn('dataIndex : ',dataIndex);
                    //if(dataIndex) {
                    var tlCon = divG[i].querySelector('.linkMinerSerp_mztl');
                    var rdCon = divG[i].querySelector('.linkMinerSerp_mzrd');
                    var paCon = divG[i].querySelector('.linkMinerSerp_mzpa');
                    var daCon = divG[i].querySelector('.linkMinerSerp_mzda');

                    var tl = data[count].uid ? self.utils.abbrNum(data[count].uid,2) : 0;
                    var rd = data[count].uipl ? self.utils.abbrNum(data[count].uipl,2) : 0;
                    var pa = data[count].upa ? Math.round(data[count].upa) : 0;
                    var da = data[count].pda ? Math.round(data[count].pda) : 0;

                    if(tlCon) {
                        tlCon.innerHTML = tl;
                        itemObj.mztl = tl;
                    }
                    if(rdCon) {
                        rdCon.innerHTML = rd;
                        itemObj.mzrd = rd;
                    }
                    if(paCon) {
                        paCon.innerHTML = pa;
                        itemObj.mzpa = pa;
                    }
                    if(daCon) {
                        daCon.innerHTML = da;
                        itemObj.mzda = da;
                    }
                        //divG[i].querySelector('.linkMinerSerp_mztl').innerHTML = self.utils.abbrNum(data[count].uid,2);
                        //divG[i].querySelector('.linkMinerSerp_mzrd').innerHTML = self.utils.abbrNum(data[count].ueid,2);

                        //divG[i].querySelector('.linkMinerSerp_mzpa').innerHTML = data[count].upa.toFixed(2);
                        //divG[i].querySelector('.linkMinerSerp_mzda').innerHTML = data[count].pda.toFixed(2);
                        //divG[i].querySelector('.linkMinerSerp_mzpa').innerHTML = dataIndex.upa.toFixed(2)+'<span class="link_miner_serps_progressbar"><span></span></span>';
                        //divG[i].querySelector('.linkMinerSerp_mzda').innerHTML = dataIndex.pda.toFixed(2)+'<span class="link_miner_serps_progressbar"><span></span></span>';
                    //}
                    dataForCsv.push(itemObj);
                    count++;
                }
            }
        }
        //_log.info('obj', obj);
        //obj.querySelector('.linkMinerSerp_mztl').innerHTML = data.uid;
        //obj.querySelector('.linkMinerSerp_mzrd').innerHTML = data.ueid;
    },
    searchUrlIndex:function(data,linkUrl){
        var len = data.length;
        for (var i=0;i<len;i++){
            _log.info('urls -> 1 : '+linkUrl+' 2 : '+data[i].uu);
            if(data[i].uu == linkUrl) {
                return data[i];
            }
        }
        return false;
    },

    encode64: function (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output += (keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4));
        }
        return output.toString();
    },
    getMozCredentials: function (optionData) {
        //var credentials = new Object;
        if(optionData.mozAccessToken && optionData.mozSecretKey) {

            var accessid = optionData.mozAccessToken;
            var secret = optionData.mozSecretKey;
            var theTimeStamp = parseInt((new Date().getTime()) / 1000) + 900;

            var message = accessid + "\n" + theTimeStamp;
            var hmacString = Crypto.HMAC(Crypto.SHA1, message, secret, {asString: true});
            var signature = btoa(hmacString);

            //credentials['theTimeStamp'] = theTimeStamp;
            //credentials['signature'] = signature;

            var credentials = "AccessID=" + accessid + "&Expires=" + theTimeStamp + "&Signature=" + this.utils.encodeUrl(signature);
            return credentials;
        } else {
            return false;
        }

    },
    getMozColumns:function(){
        var $cols = '68719476736';
        return "&cols=" + $cols;
    },
    getMozApiUrl:function (){
        return "http://lsapi.seomoz.com/linkscape/url-metrics/";
        //var self = com.pointBlank.mozseo;
        //if(optionData.mozAccessToken && optionData.mozSecretKey) {

            //var $accessID = optionData.mozAccessToken;
            //var $secretKey = optionData.mozSecretKey;
            //var $cols = '68719476736';
            //
            //var SEOmozCredentials = this.getSEOmozCredentials($accessID, $secretKey);
            //var $timeStamp = SEOmozCredentials['theTimeStamp'];
            //var $signature = SEOmozCredentials['signature'];
            //
            //_log.info('seoMoz credentials', SEOmozCredentials);
            //var targetUrl = this.utils.encodeUrl('http://test.com');
            //
            //$credentials = "AccessID=" + $accessID + "&Expires=" + $timeStamp + "&Signature=" + this.utils.encodeUrl($signature);
// $apiURL = "http://lsapi.seomoz.com/linkscape/links/" + urlencode('http://test.com') + "?" + $credentials + "&SourceCols=5TargetCols=0&Filter=external+follow&amp;Sort=page_authority&Scope=page_to_page&amp;Limit=1000";

            //$apiURL = "http://lsapi.seomoz.com/linkscape/url-metrics/" + targetUrl + "?" + $credentials + "&cols="+$cols;
        //    $apiURL = "http://lsapi.seomoz.com/linkscape/url-metrics/?" + $credentials + "&cols=" + $cols;
        //
        //    console.log('requestUrl = ' + $apiURL);
        //    return $apiURL;
        //} else {
        //    return false;
        //}
    }

}
