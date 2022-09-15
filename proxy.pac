function FindProxyForURL(url, host) {
	// proxy list
	var proxies = [
      		// block list (optional)
		{
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
	
	// default fallback proxy (optional)
	var fallback = { value: "PROXY default-proxy.example.lan:8080" };
	//var fallback = { value: "DIRECT" };
	
	// Returns Url or host depending
	// on the match-string type
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
		// if variable is RegExp datatype
		if (variable instanceof RegExp) {
			// test passed value by RegExp
			// returns Boolean
			return variable.test(url);
		}
		// string datatype
		else if (typeof variable == "string") {
			// shell expression
			return shExpMatch(urlOrHost(variable), variable);
		}
	}
	
	// necessary variables
	var i, j, proxy, link;
	
	// iterate through defined proxies
	for (i in proxies) {
		// current proxy
		proxy = proxies[i];
		// iterating through hosts/urls
		for (j in proxy.links) {
			// current host/url
			link = proxy.links[j];
			// check if host/url matches
			// with shell expression
			if (matchData(link)) {
				//in case of match, return respective proxy
				return proxy.value;
			}
		}
	}
	// return default/fallback proxy
	return fallback.value;
}
