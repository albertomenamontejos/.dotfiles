if (!com)
    var com = {};
if (!com.pointBlank)
    com.pointBlank = {};
com.pointBlank.utils = {
    parseUri:function(str) {
        var o = this.parseUriOptions,
            m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            uri = {},
            i = 14;

        while (i--)
            uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
            if ($1)
                uri[o.q.name][$1] = $2;
        });

        return uri;
    },

    encodeUrl: function (str) {
        str = (str + '')
            .toString();

        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .
            replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+');
    },
    parseUriOptions : {
        strictMode: false,
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    },
    hasClassName: function(objElement, strClass) {
        if (objElement.className) {
            var arrList = objElement.className.split(' ');
            var strClassUpper = strClass.toUpperCase();
            for (var i = 0; i < arrList.length; i++) {
                if (arrList[i].toUpperCase() == strClassUpper) {
                    return true;
                }
            }
        }
        return false;
    },
    getImage: function(imageName) {
        return chrome.extension.getURL('images/' + imageName);
    },
    searchEngineRootNode: function(searchEngineName) {
        switch (searchEngineName) {
            case 'google':
                return document.getElementById('rso');
                break;
            case 'bing':
                // return document.getElementById('results_container');
                return document.getElementById('b_results');
                break;
            case 'yahoo':
                return document.getElementById('web');
                break;
            case 'ask':
                return document.getElementById('lindm');
                break;
            case 'duckduckgo':
                return document.getElementById('links');
                break;
            case 'yandex':
                return document.querySelector('div.serp-list');
                break;
            default:
                return null;
        }
    },
    convertArrayToJson: function(arr) {
        if (arr.length > 0) {
            var str = "{{0},{1},'links': [";
            for (var i in arr) {
                str += "{'url':'" + encodeURIComponent(arr[i]) + "'},";
            }
            str = str.slice(0, -1);
            str += "]}";
            return str;
        }
        return false;

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
    checkGoogleSearchEngine:function(tab){
        _log.info('url = ',tab.url);
        var parsedUrl = this.parseUri(tab.url);
        _log.info('parsed url = ',parsedUrl);
        var hostName = parsedUrl.host;
        var path = parsedUrl.path;
        _log.info('path', path);

        if (hostName.indexOf('google') >= 0 && path.indexOf('/search')>=0) {
           return true;
        }
        return false;
    },
    removeDuplicateArrayOfObjectsAndMerge:function(arrayOfObjects){
        for (var i = 0; i < arrayOfObjects.length; i++) {

            // Loop through all of the objects beyond i
            // Don't increment automatically; we will do this later
            for (var j = i+1; j < arrayOfObjects.length; ) {

                // Check if our x values are a match
                if (arrayOfObjects[i].key == arrayOfObjects[j].key) {

                    // Loop through all of the keys in our matching object
                    for (var key in arrayOfObjects[j]) {

                        // Ensure the key actually belongs to the object
                        // This is to avoid any prototype inheritance problems
                        if (arrayOfObjects[j].hasOwnProperty(key)) {

                            // Copy over the values to the first object
                            // Note this will overwrite any values if the key already exists!
                            arrayOfObjects[i][key] = arrayOfObjects[j][key];
                        }
                    }

                    // After copying the matching object, delete it from the array
                    // By deleting this object, the "next" object in the array moves back one
                    // Therefore it will be what j is prior to being incremented
                    // This is why we don't automatically increment
                    arrayOfObjects.splice(j, 1);
                } else {
                    // If there's no match, increment to the next object to check
                    j++;
                }
            }
        }
        return arrayOfObjects;
    }
}


