class TurboCopProxyAgent {
    static makeEUWebRequest(url, callback) {
        TurboCopProxyAgent.getEUProxyList(function (proxyList) {
            var result;
            for (let index = 0; index < proxyList.length; index++) {
                var proxy = "http://" + proxyList[index][0];
                var agent = HttpsProxyAgent(proxy);
                request({
                    uri: url,
                    method: "GET",
                    agent: agent,
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10,
                }, function (error, response, body) {
                    if (error) {
                        console.log("Error occured with selected proxy");
                        return;
                    } else if (body.includes("403 error")) {
                        console.log("Supreme gave a 403 with proxy, trying next one");
                        return;
                    } else {
                        console.log("Success");
                        callback(JSON.parse(body), url);
                    }
                });
            }
        });
    }
    static getUSMobileStockJSON(callback) {
        $.ajax({
            url: "https://www.supremenewyork.com/mobile_stock.json"
        }).done(function (stock) {
            callback(stock);
        })
    }
    static getProxy(countryCode, callback) { // Deprecated
        $.ajax({
            url: "https://api.getproxylist.com/proxy?country[]=" + countryCode + "&protocol[]=http&allowsHttps=1"
        }).done(callback);
    }
    static getEUProxyList(callback) {
        $.ajax({
            url: "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list.txt"
        }).done(function (data) {
            data = data.split("\n");
            for (let x = 0; x < 9; x++) {
                data.shift();
            }
            data.pop();
            data.pop();
            for (let index = 0; index < data.length; index++) {
                data[index] = data[index].split(" ");
                data[index].pop();
                if (data[index][2] != "+" || data[index][1].split("-").length < 3) {
                    data.splice(index, 1);
                    index -= 1;
                    continue;
                }
                let countryCode = data[index][1].split("-")[0];
                if (!TurboCopProxyAgent.getEuropeanCountryCodes().includes(countryCode)) {
                    data.splice(index, 1);
                    index -= 1;
                }
            }
            callback(data);
        });
    }
    static getEuropeanCountryCodes() {
        return ["GB", "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PO", "PT", "RO", "SE", "SI", "SK", "AL", "AD", "AM", "BA", "BY", "CH", "FO", "GE", "GI", "IS", "MC", "MK", "NO", "SM", "TR", "UA", "VA"]
    }
}