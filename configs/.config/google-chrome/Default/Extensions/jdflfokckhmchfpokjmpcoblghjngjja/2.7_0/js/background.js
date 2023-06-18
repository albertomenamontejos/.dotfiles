/* globals chrome */
(function () {

    const tabInfo = {};

    const showPageActionPopup = function (tabId) {

        chrome.action.setIcon({
            tabId: tabId,
            path: "../images/icon19.png"
        }, function () {
            if (!chrome.runtime.lastError) {
                chrome.action.setTitle({
                    tabId: tabId,
                    title: chrome.i18n.getMessage("launch_popup_button")
                });

                chrome.action.setPopup({
                    tabId: tabId,
                    popup: 'html/popup.html'
                });
            } else {
                console.log(chrome.runtime.lastError.message);
            }
        });
    };

    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        switch (msg.action) {
            case 'prepare':
                tabInfo[sender.tab.id] = msg;
                showPageActionPopup(sender.tab.id, msg);
                break;
            case 'get':
                sendResponse({data: tabInfo[msg.tabId]});
                break;
            default:
                break;
        }

    });

    chrome.tabs.onRemoved.addListener(function (tabId) {
        // free memory
        delete tabInfo[tabId];
    });

})();