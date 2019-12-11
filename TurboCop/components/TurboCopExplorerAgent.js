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
        results.forEach(function(item) {
            var div = document.createElement("div");
            div.className = "media courier-new color-white";
            var img = document.createElement("img");
            img.setAttribute("src", "https:"+item.image_url_hi);
            var divMediaBody = document.createElement("div");
            divMediaBody.className = "media-body courier-new color-white";
            var a = document.createElement("a");
            a.className = "list-group-item list-group-item-action courier-new onhover-red color-white";
            a.innerHTML = item.name;
            divMediaBody.appendChild(a);
            div.appendChild(img);
            div.appendChild(divMediaBody);
            document.getElementById("explorerResults").appendChild(div);
        });
    }
}