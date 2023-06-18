// Injection guard
if ($('.jsContainer').length >= 1) {
  throw new Error('Injected! Race condition or duplicated injection.')
}

const reportSentryError = message => {
  chrome.runtime.sendMessage({
    action: 'reportSentry',
    message
  })
}

window.onerror = function(msg, url, lineNo, columnNo, error) {
  reportSentryError(msg)
  return false
}

// This is duplicated from the utils module. Necessary for the login page
const isJsp = () => {
  return getAppCode() === 'jsp'
}

// Used to wrap code that only executes when data collection is approved
const executeIfTrackingAllowed = trackingCode => {
  if(navigator.userAgent.includes('Firefox')) {
    chrome.storage.sync.get('consentDataCollectionPolicy', result => {
      if(result.consentDataCollectionPolicy === true) {
        return trackingCode()
      }
    })
  } else {
    return trackingCode()
  }
}

const watchAjaxRequests = () => {
  let ajaxRequestsFinishedTimeout = null

  $('body').on('ajaxRequestsStarted', () => {
    clearTimeout(ajaxRequestsFinishedTimeout)
  })

  //--------------------------------------------------------------------------------//
  //After the ajax requests have been stopped, to refresh headers
  $('body').on('ajaxRequestsFinished', () => {
    clearTimeout(ajaxRequestsFinishedTimeout)
    ajaxRequestsFinishedTimeout = setTimeout(function() {
      if (state) {
        state.saveCurrentState()
        fetchOppScoreAndStopSpinner()
      }
    }, 1000)
  })
}

$(document).ready(watchAjaxRequests)

//--------------------------------------------------------------------------------//
//Add comma
function numberWithCommas(x) {
  if (typeof x == 'undefined') {
    return 'N.A.'
  }
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

//--------------------------------------------------------------------------------//
//return just any number
function pureNumber(number) {
  if (number && typeof number == 'string') {
    number = number.match(/[0-9.]/g)
    number = number ? number.join('') : 'N.A.'
    return !isNaN(number) ? number : 'N.A.'
  } else if (!isNaN(number) && typeof number == 'number') {
    return number
  } else {
    return 'N.A.'
  }
}

//---------------------------------------------------------------//
//If there is invalid token around
function invalidToken(message) {
  //Fire the event
  chrome.runtime.sendMessage({ action: 'invalidToken', message })
  //Close the current modal
  if ($('.jsContainer').is(':visible')) {
    $('.jsContainer #closeJsPopup')
      .get(0)
      .click()
  }
  return false
}

//---------------------------------------------------------------//
//A prototype to clean undefined/null/empty values
Array.prototype.clean = function() {
  return this.filter(function(e) {
    return typeof e !== 'undefined' && e != null && e != ''
  })
}

// Temp polyfill for ES6 rest/spread operator

// Can be used like this:
// const object1 = {
//   a: 1,
//   b: 2,
//   c: 3
// };

// const object2 = Object.assign({c: 4, d: 5}, object1);
// console.log(object2.c, object2.d);

// expected output: 3 5

// we first set the Object.assign function to null to show that the polyfill works
Object.assign = null

// start polyfill

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict'
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object')
      }

      var to = Object(target)

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

// end polyfill
