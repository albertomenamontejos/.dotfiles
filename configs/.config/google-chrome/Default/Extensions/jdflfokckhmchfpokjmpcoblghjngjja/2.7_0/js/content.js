/* globals chrome */
(function(){
    if (document.documentElement.outerHTML.match(/<(img|link|script) [^>]+wp-content/i) && document.documentElement.outerHTML.match(/<(img|link|script) [^>]+wp-includes/i)) {
        chrome.runtime.sendMessage({action: 'prepare', siteUrl: location.href, siteHtml: document.documentElement.outerHTML, siteTitle: document.title});
    }
}());
