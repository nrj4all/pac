# Proxy Auto-Configuration
You can deploy a list of objects which contains a pac return string (proxy, direct, ...). Additionally it is possible to define a list of fine grained urls/hosts/regex which will be compared with the requested host/url. If the requested host/url matches the list entries, the respective value string will be returned.
## proxy.pac:
```
[...]
var proxies = [
  {
    // return string
    value: "PROXY proxy.tld:8080",
    // list of entries that will be compared with the requested url/host
    links: [
      "*.domain.tld", // shell expression
      "domain.tld", // explicit domain
      "http://www.domain.tld/", // explicit url
      /^[a-zA-Z]+\.domain\.tld$/ // regex
    ]
  },
  { /* add more proxies */ }
]
[...]
```
## Recommended
https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file
