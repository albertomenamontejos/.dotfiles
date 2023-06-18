//Double injection guard
if (typeof $ != 'undefined' && $('.jsContainer').length >= 1) {
  throw new Error('Injected!')
}

//NOTE: to use constants please use getConstant(name), don't use this directly.
//Ex. getConstant('APP_LOGIN_TITLE') will return 'Login to Jungle Scout Pro'
//if its the pro chrome extension.
const constants = {
  SUPPORTED_STORES: /(amazon.com(.?)$)|(amazon.co.uk(.?)$)|(amazon.ca(.?)$)|(amazon.de(.?)$)|(amazon.fr(.?)$)/i,
  OPTIONAL_STORES: /(amazon.in(.?)$)|(amazon.com.mx(.?)$)|(amazon.it(.?)$)|(amazon.es(.?)$)|(amazon.co.jp(.?)$)/i,
  BEST_SELLER_REGX: /(best\-?sellers)/i,
  NEW_RELEASES_REGX: /(new\-?releases)/i,
  MOVERS_AND_SHAKERS_REGX: /(movers\-?and\-?shakers)/i,
  TOP_RATED_REGX: /(top\-?rated)/i,
  MOST_WISHES_REGX: /(most\-?wished\-?for)/i,
  MOST_GIFTED_REGX: /(most\-?gifted)/i,
  ASIN_REGEX: /(dp|product|asin)?\/[0-9A-Z]{10}/,
  SHOP_PAGES: /pages\/[0-9A-Z]{10}/,
  GENERAL_SEARCH_REGEX: /(field\-keywords)/i,
  WISH_LIST_INF_REGEX: /(hz\/wishlist\/inf)/i,
  WISH_LIST_LS_REGEX: /(hz\/wishlist\/ls)/i,
  STORE_FRONT_REGEX: /(stores\/node\/[0-9])/i,
  BUYING_GUIDE_REGEX: /(vs\/buying\-guide\/)/i,
  SEARCH_RESULT_REGEX: /(s\?k=)/i,
  SELLERCENTRAL: /sellercentral(-\w*)*\.amazon.*\//i,
  ADVERTISING_URL_REGEX: /advertising(-\w*)*\.amazon.*\/campaigns/i,
  JUNGLE_SCOUT_WEB_APP_REGEX: /members\.junglescout\.com/i,
  PRODUCT_RECORD_EXPIRY_TIME: 15 * 60 * 1000, // 15 minutes old - considered FRESH. Change as required.
  FREE_TRIAL_GRAPH_EXPIRY_TIME: 30 * 60 * 1000, // 30 minutes
  NARROW_BREAKPOINT: 1300,
  SUMMARY_HEIGHT_POPUP: 115,
  SUMMARY_HEIGHT_DOCK_NARROW: 98,
  SUMMARY_HEIGHT_DOCK_WIDE: 70,
  jsp: {
    APP_LOGIN_TITLE: 'Login to Jungle Scout Pro',
    API_HOST: 'https://ext.junglescout.com'
  },
  jsl: {
    APP_LOGIN_TITLE: 'Login to Jungle Scout',
    API_HOST: 'https://ext.junglescout.com'
  },
  MARKETPLACES_WITH_SUB_CATEGORY_SALES_ESTIMATES: ['us', 'jp', 'ca', 'mx', 'eu', 'fr', 'it', 'de']
}

//will figure out app code from manifest
function getAppCode() {
  return chrome.runtime.getManifest().name.includes('Lite') ? 'jsl' : 'jsp'
}

//will return undefined if not found
function getConstant(name) {
  return constants[getAppCode()][name]
}

function getCommonConstant(name) {
  return constants[name]
}

// for unit testing purpose
if (typeof exports != 'undefined') {
  exports.getAppCode = getAppCode
  exports.getConstant = getConstant
  exports.getCommonConstant = getCommonConstant
}
