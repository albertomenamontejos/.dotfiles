/**
 * @Author: Greg Mercer
 * Copyright © 2020 Jungle Scout
 *
 * JS popup icon besides address bar
 */

$(function() {
  var port = null
  // TODO Change to the constants for supportedStores and optionalStores
  var supportedStores = getCommonConstant('SUPPORTED_STORES')
  var optionalStores = getCommonConstant('OPTIONAL_STORES')
  var requestedStores = [] //To request just needed permissions
  chrome.storage.local.get('auth', function(result) {
    if (Object.keys(result).length === 0) {
      //Check if the page opened
      chrome.tabs.query({ url: chrome.extension.getURL('login.html') }, function(tabs) {
        if (tabs.length == 0) {
          chrome.tabs.create({ url: chrome.extension.getURL('login.html') })
          //Faster
          window.close()
          return false
        } else {
          chrome.tabs.update(tabs[0].id, { highlighted: true })
          //Faster
          window.close()
          return false
        }
      })
    } else {
      chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        // TODO: Remove after release if sellerCentral graph
        var parshedAuthData = (result.auth && JSON.parse(result.auth)) || {}
        var advertisingEnabled =
          parshedAuthData.flag_data &&
          parshedAuthData.flag_data['fflag.extension.sellerCentralGraph']

        var url = tabs[0].url
        var domainURL = getDomain(url)
        if (
          supportedStores.test(domainURL) &&
          !getCommonConstant('SELLERCENTRAL').test(url) &&
          !getCommonConstant('ADVERTISING_URL_REGEX').test(url)
        ) {
          port = chrome.tabs.connect(tabs[0].id, { name: 'jsPopupChannel' })
          port.postMessage({ url: url, action: 'openCloseJsPopup' })
          window.close()
          return false
        } else if (
          optionalStores.test(domainURL) ||
          getCommonConstant('SELLERCENTRAL').test(url) ||
          (getCommonConstant('ADVERTISING_URL_REGEX').test(url) && advertisingEnabled)
        ) {
          //Just requested stores
          if (domainURL == 'amazon.in') {
            requestedStores.push('*://www.amazon.in/*')
            if (isJsp()) {
              requestedStores.push('*://*.amazonservices.in/*')
            }
            $('#accessName').text('India')
          } else if (domainURL == 'amazon.com.mx') {
            requestedStores.push('*://www.amazon.com.mx/*')
            $('#accessName').text('Mexico')
          } else if (domainURL == 'amazon.it') {
            requestedStores.push('*://www.amazon.it/*')
            $('#accessName').text('Italy')
          } else if (domainURL == 'amazon.es') {
            requestedStores.push('*://www.amazon.es/*')
            $('#accessName').text('Spain')
          } else if (getCommonConstant('SELLERCENTRAL').test(url)) {
            requestedStores.push('*://' + domainURL + '/*')
            $('#accessName').text('Seller Central')
          } else if (getCommonConstant('ADVERTISING_URL_REGEX').test(url) && advertisingEnabled) {
            requestedStores.push('*://' + domainURL + '/*')
            $('#accessName').text('Advertising')
          } else if (domainURL == 'amazon.co.jp') {
            requestedStores.push('*://www.amazon.co.jp/*')
            $('#accessName').text('Japan')
          }
          //Check if I have the permission
          chrome.permissions.contains(
            {
              origins: requestedStores
            },
            function(result) {
              if (!result) {
                $('.js-no-products').css('display', 'none')
                $('.request-access').css('display', 'inline-block')
              } else {
                port = chrome.tabs.connect(tabs[0].id, { name: 'jsPopupChannel' })
                port.postMessage({ url: url, action: 'openCloseJsPopup' })
                window.close()
                return false
              }
            }
          )
        }
      })
    }
  })

  //----------------------------------------------------------------//
  function getDomain(url) {
    url = url.replace(/https?:\/\/(www.)?/i, '')
    if (url.indexOf('/') === -1) {
      return url
    }
    return url.split('/')[0]
  }
  //----------------------------------------------------------------//
  //Request access to the new store
  $('body').on('click', '#submitAccess', function(e) {
    e.preventDefault()
    btnInProcess()
    //To refresh all amazon pages
    chrome.runtime.connect({ name: 'newPermissionRequested' })
    //If the user doesn't have the permission, request it
    chrome.permissions.request({ origins: requestedStores })
  })
  //---------------------------------------------------------------------------------//
  $('body').on('click', '#closeBtn', function(e) {
    e.preventDefault()
    window.close()
  })
  //---------------------------------------------------------------------------------//
  $('body').on('click', '#refreshBtn', function(e) {
    e.preventDefault()
    window.reload()
  })
  //---------------------------------------------------------------------------------//
  function btnInProcess() {
    $('#submitAccess').attr('data-content', $('#submitAccess').html())
    $('#submitAccess span').html(
      "<img src='../images/icons/loading-active.png' width='15px' height='15px' class='js-processing-btn'/>"
    )
  }
})
