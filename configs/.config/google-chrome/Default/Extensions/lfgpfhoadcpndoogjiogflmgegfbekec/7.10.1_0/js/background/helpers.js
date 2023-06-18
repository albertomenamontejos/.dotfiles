function isSentryEnabled() {
  // using preprocess https://github.com/jsoverson/preprocess#directive-syntax
  var sentryEnabled = 'true'
  return sentryEnabled === 'true'
}
function initSentry() {
  console.log('SENTRY_ENABLED:' + isSentryEnabled())
  if (
    (typeof process === 'undefined' || process.env.JEST_WORKER_ID == undefined) &&
    isSentryEnabled()
  ) {
    Sentry.init({
      dsn: 'https://51574f2e37c742b3bd057957b21ebd5b@sentry.io/1415589',
      release: chrome.runtime.getManifest().version
    })
    Sentry.configureScope(scope => {
      scope.setTag('ext_name', chrome.runtime.getManifest().name)
    })
  }
}

function captureMessageWithSentry(message) {
  if (
    (typeof process === 'undefined' || process.env.JEST_WORKER_ID == undefined) &&
    isSentryEnabled()
  ) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
      let url
      if (tabs.length > 0 && tabs[0].url) {
        url = tabs[0].url
      }

      Sentry.withScope(scope => {
        if (url) {
          scope.setTag('url', url)
        }
        Sentry.captureMessage(message)
      })
    })
  } else {
    // if running on local output error message to console not to sentry
    console.log('Error: ' + message)
  }
}

function getErrorType(message) {
  if (message === 'Duplicate Token') {
    return 1
  } else if (message === 'Expired Token') {
    return 2
  } else {
    return 0
  }
}

function getDomain(url) {
  url = url.replace(/https?:\/\/(www.)?/i, '')
  if (url.indexOf('/') === -1) {
    return url
  }
  return url.split('/')[0]
}

function validAmazonURL(url) {
  if (
    ((getCommonConstant('SUPPORTED_STORES').test(getDomain(url)) ||
      getCommonConstant('OPTIONAL_STORES').test(getDomain(url))) &&
      (getCommonConstant('BEST_SELLER_REGX').test(url) ||
        getCommonConstant('NEW_RELEASES_REGX').test(url) ||
        getCommonConstant('MOVERS_AND_SHAKERS_REGX').test(url) ||
        getCommonConstant('TOP_RATED_REGX').test(url) ||
        getCommonConstant('MOST_WISHES_REGX').test(url) ||
        getCommonConstant('MOST_GIFTED_REGX').test(url) ||
        getCommonConstant('SHOP_PAGES').test(url) ||
        getCommonConstant('GENERAL_SEARCH_REGEX').test(url) ||
        getCommonConstant('WISH_LIST_INF_REGEX').test(url) ||
        getCommonConstant('WISH_LIST_LS_REGEX').test(url) ||
        getCommonConstant('STORE_FRONT_REGEX').test(url) ||
        getCommonConstant('ASIN_REGEX').test(url) ||
        getCommonConstant('SEARCH_RESULT_REGEX').test(url) ||
        getCommonConstant('BUYING_GUIDE_REGEX').test(url))) ||
    getCommonConstant('SELLERCENTRAL').test(url)
  ) {
    return true
  } else {
    return false
  }
}

function injectAds(url, tabid) {
  if (validAmazonURL(url)) {
    chrome.tabs.executeScript(tabid, {
      file: 'ads/one.js'
    })
  }
}

function updateExtensionIcon(url, tabId) {
  if (validAmazonURL(url)) {
    chrome.browserAction.setIcon({
      path: {
        '16': 'images/16-active.png'
      },
      tabId: tabId
    })
  } else {
    chrome.browserAction.setIcon({
      path: {
        '16': 'images/16-inactive.png'
      },
      tabId: tabId
    })
  }
}

// for unit testing purpose
if (typeof exports != 'undefined') {
  exports.getErrorType = getErrorType
  exports.initSentry = initSentry
  exports.updateExtensionIcon = updateExtensionIcon
  exports.injectAds = injectAds
}
