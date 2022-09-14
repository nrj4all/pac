function FindProxyForURL(url, host) {
	// proxy list
	var proxies = [
		{
      			// block list (optional)
			value: "PROXY 127.0.0.1:65535",
			links: [
				"*.googletagservices.com"
			]
		},
    		// proxies
		{
			value: "PROXY proxy1.example.lan:8080",
			links: [
				"domain1.tld",
				"domain2.tld",
				"*.domain3.tld"
			]
		},
		{
			value: "PROXY proxy2.example.lan:8080",
			links: [
				"https://intranet.lan",
				"*.domain4.tld"
			]
		},
    		// direct communication
		{
			value: "DIRECT",
			links: [
				/^[^.]+$/i, // isPlainHostname() - all hosts without dot
				"10.0.0.*",
				"127.0.0.1",
				"localhost"
			]
		}
	];
	
	// defining default fallback proxy (optional)
	var fallback = { value: "default-proxy.example.lan:8080" };
	
	// Returns Url or host
	// depending of the match-string type
	function urlOrHost(string) {
		// check if string contains protocol (ftp/http/s)
		var pattern = /^(ft|htt)ps?:\/\//i;
		// if protocol matched
		return pattern.test(string) ? url : host;
	}
	
	// check the datatype of link/host
	// and invokes the respective function
	// depending on the datatype
	function matchData(variable) {
		// RegExp data type
		if (variable instanceof RegExp) {
			// check by RegExp
			// returns Boolean
			return variable.test(url);
		}
		// String datatype
		else if (typeof variable == "string") {
			// Shell Expression
			return shExpMatch(urlOrHost(variable), variable);
		}
	}
	
	// defining neccessary variables
	var i, j, proxy, link;
	
	// iterate defined proxies
	for (i in proxies) {
		// current proxy
		proxy = proxies[i];
		// iterating though hosts/urls
		for (j in proxy.links) {
			// current host/url
			link = proxy.links[j];
			// check if host/url matches with
			// Shell Expression
			if (matchData(link)) {
				// In case of match return respective proxy
				return proxy.value;
			}
		}
	}
	// returning default/fallback proxy
	return fallback.value;
}
