(function(global) {
  function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
  }

  function parseQuery(filter) {
    var urlParams = {},
        match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query)) {
      var key = decode(match[1])
      var value = decode(match[2])
      if (typeof filter === 'string') {
        var reg = new RegExp(filter)
        if (reg.test(key)) {
          urlParams[key] = value;
        }
      } else if (typeof filter === 'function') {
        if (filter(key)) {
          urlParams[key] = value;
        }
      } else {
        urlParams[key] = value
      }
    }
    return urlParams
  }

  function getGtagDimensionCommonParams() {
    var COMMON_KEYS = [
      'utm_source',
      'utm_campaign',
      'utm_medium',
      'utm_term',
      'utm_term_keyword',
      'utm_plan',
      'utm_content',
      'phone',
      'landingPage',
      'caseId',
      'MEIQIA_VISIT_ID',
      'BAIDUID',
    ]
    var params = {
      href: window.location.href
    }
    var queryObject = parseQuery('^utm_')
    for (var i = 0; i < COMMON_KEYS.length; i++) {
      var item = COMMON_KEYS[i];
      var lowerKey = item.toLocaleLowerCase()
      var queryValue = queryObject[item];
      if (queryValue) {
        params[lowerKey] = queryValue;
      } else {
        var cookieValue = $.cookie(item)
        if (cookieValue) {
          params[lowerKey] = cookieValue
        } else {
          params[lowerKey] = 'EMPTY'
        }
      }
    }
    return params
  }

  global.LeapUtils = {
    getQueryStringByName: getQueryStringByName,
    parseQuery: parseQuery,
    getGtagDimensionCommonParams: getGtagDimensionCommonParams
  }
}(window))