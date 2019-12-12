class TurboCopExplorerAgent {
    static filterFromSearch(stock) {
        var query = $("#explorerSearchInput").val().toLowerCase();
        var keywords = query.split(" ");
        var results = new Set();
        var resultNames = new Set();
        for (let categoryIndex in stock.products_and_categories) {
            var category = stock.products_and_categories[categoryIndex];
            for (let itemIndex in category) {
                var item = category[itemIndex];
                for (let keywordIndex in keywords) {
                    let keyword = keywords[keywordIndex];
                    if (item.name.toLowerCase().includes(keyword) && !resultNames.has(item.name)) {
                        results.add(item);
                        resultNames.add(item.name);
                    }
                }
            }
        }
        $("#explorerResults").empty();
        results.forEach(function (item) {
            var div = document.createElement("div");
            div.className = "media courier-new color-white";
            var img = document.createElement("img");
            img.setAttribute("src", "https:" + item.image_url_hi);
            var divMediaBody = document.createElement("div");
            divMediaBody.className = "media-body courier-new color-white";
            var a = document.createElement("a");
            a.className = "list-group-item list-group-item-action courier-new onhover-red color-white";
            a.innerHTML = item.name;
            a.onclick = function (evt) {
                TurboCopExplorerAgent.displayInfo(item);
            }
            divMediaBody.appendChild(a);
            div.appendChild(img);
            div.appendChild(divMediaBody);
            document.getElementById("explorerResults").appendChild(div);
        });
    }
    static displayInfo(item) {
        $("#explorerMoreInfoImage").attr("src", "https:" + item.image_url_hi);
        $("#explorerMoreInfoTitle").text(String(item.name));
        document.getElementById("explorerMoreInfoDescription").setAttribute("data-itemid", item.id);
        $("#explorerMoreInfoDescription").text("Loading item information, please wait...");
        $("#explorerMoreInfo").show();
        $("#explorerMoreInfoPrice").text("$" + item.price / 100);
        let height = $(document).height();
        height = height - (height - $("#copyrightMessage").offset().top) - $("#explorerMoreInfo").offset().top;
        $("#explorerMoreInfo").css({
            'max-height': height.toString(),
            'height': height.toString()
        });
        document.getElementById("explorerSizeSelect").innerHTML = "";
        document.getElementById("explorerStyleSelect").innerHTML = "";
        if (item.price_euro) {
            TurboCopProxyAgent.makeEUWebRequest("https://www.supremenewyork.com/shop/" + String(item.id) + ".json", function (stockInfo, url) {
                var url = url.split("/");
                var filename = url[url.length - 1];
                var itemID = filename.split(".")[0];
                if (document.getElementById("explorerMoreInfoDescription").getAttribute("data-itemid") == itemID) {
                    $("#explorerMoreInfoDescription").text(stockInfo.description);
                    let height = $(document).height();
                    height = height - (height - $("#copyrightMessage").offset().top) - $("#explorerMoreInfo").offset().top;
                    $("#explorerMoreInfo").css({
                        'max-height': height.toString(),
                        'height': height.toString()
                    });
                    if (document.getElementById("explorerStyleSelect").childElementCount < stockInfo.styles.length) {
                        stockInfo.styles.forEach(function (style) {
                            var option = document.createElement("option");
                            option.innerHTML = style.name;
                            document.getElementById("explorerStyleSelect").appendChild(option);
                            if (style.sizes.length > document.getElementById("explorerSizeSelect").childElementCount) {
                                style.sizes.forEach(function (size) {
                                    var option = document.createElement("option");
                                    option.innerHTML = size.name;
                                    document.getElementById("explorerSizeSelect").appendChild(option);
                                })
                            }
                        });
                        $("#addToListButton").unbind("click");
                        document.getElementById("addToListButton").removeAttribute("disabled");
                    }
                }
            })
        }
    }
}
