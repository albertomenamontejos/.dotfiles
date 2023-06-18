/*globals chrome */
document.addEventListener('DOMContentLoaded', function () {
    const iFrame = document.getElementById('full-iframe');
    iFrame.setAttribute('src', 'https://ui.wordpress-theme-detector.com');
    iFrame.addEventListener('load', function () {

        const talker = new Talker(iFrame.contentWindow, '*');

        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function (tabs) {

            if (tabs.length === 1) {
                chrome.runtime.sendMessage({action: "get", tabId: tabs[0].id}, function (response) {
                    const data = response && response.data ? response.data : {};
                    talker.send('parse-url', {
                            siteUrl: data.siteUrl,
                            siteHtml: data.siteHtml,
                            siteTitle: data.siteTitle
                        }
                    );
                });
            }
        });

        talker.onMessage = function (message) {

            switch (message.namespace) {
                case 'open-url':
                    chrome.tabs.create({url: message.data['url'], active: false});
                    message.respond({status: true});
                    break;
                case 'set-height':
                    document.getElementById('full-iframe').height = message.data['height'] + "px";
                    break;
                default :
                    break;
            }
        };
    });
});