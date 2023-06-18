if (!com)
	var com = {};
if (!com.mieux)
	com.mieux = {};
com.mieux.jonCooperCookieManager = {
	/*To get cookie url*/
	extrapolateUrlFromCookie: function(cookie) {
		// _log.info('cookie in path extraction:',cookie);
		var prefix = cookie.secure ? "https://" : "http://";
		// _log.info('cookie prefix',prefix);
		// _log.info('cookie domain name : ',cookie.domain);
		if (cookie[0].domain.charAt(0) == ".")
			prefix += "www";
		return prefix + cookie[0].domain + cookie[0].path;
	},
	saveCookieToLocalStorage: function(cookie) {
		if (cookie.name == 'access_token') {
			this.setItem('access_token', cookie.value);
		} else if (cookie.name == 'refresh_token') {
			this.setItem('refresh_token', cookie.value);
		} else if (cookie.name == 'expires_in') {
			this.setItem('expires_in', cookie.value);
		} else if (cookie.name == 'token_type') {
			this.setItem('token_type', cookie.value);
		} else if (cookie.name == 'scope') {
			this.setItem('scope', cookie.value);
		}
	},
	deleteCookie: function(backgroundObj) {
		var keys = backgroundObj.apiParams;
		var domainName = backgroundObj.domainName;
		chrome.cookies.getAll({
			'domain': domainName
		}, function(cookie) {
			var prefix = cookie.secure ? "https://" : "http://";
			for (var i = 0; i < cookie.length; i++) {
				// _log.info('cookie name : ',cookie[i].name);
				if (cookie[i].name == 'access_token' || cookie[i].name ==
					'refresh_token' ||
					cookie[i].name == 'expires_in' || cookie[i].name == 'token_type' ||
					cookie[i].name == 'scope') {
					chrome.cookies.remove({
						url: prefix + cookie[i].domain + cookie[i].path,
						name: cookie[i].name
					});
				}
			}

		});
	},
	cookieInit: function(cookies) {
		var self = com.mieux.jonCooperCookieManager;
		if (cookies.length > 0) {
			for (var i in cookies) {
				self.saveCookieToLocalStorage(cookies[i]);
				_log.info('cookie saving' + cookies[i]);
			}
		}
	},
	setItem: function(key, val) {
		var value = JSON.stringify(val);
		try {
			_log.info("Inside setItem:" + key + ":" + value);
			localStorage.removeItem(key);
			localStorage.setItem(key, value);
		} catch (e) {
			_log.info("Error inside setItem");
			_log.info(e.toString());
		}
		_log.info("Return from setItem" + key + ":" + value);
	},
	getItem: function(key) {
		var value;
		_log.info('Get Item:', key);
		try {
			value = JSON.parse(localStorage.getItem(key));
		} catch (e) {
			_log.info("Error inside getItem() for key:", key);
			_log.info('catch error', e.toString());
			value = "null";
		}
		_log.info("Returning value: ", value);
		// _log.info('length: ' + value.length);
		return value;
	}
}
