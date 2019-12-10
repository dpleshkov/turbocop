class TurboCopExplorerAgent {
    static updateSearchView() {
        
    }
    static filterFromSearch(region) {
        var query = $("#explorerSearchInput").val().toLowerCase();
        var keywords = query.split(" ");
        var stock = europeMobileStock;
        if (region == "us") {
            stock = americaMobileStock;
        }
        var results = [];
        Object.keys(europeMobileStock.products_and_categories).forEach(function(category) {
            europeMobileStock.products_and_categories.category.forEach(function(item) {
                keywords.forEach(function(keyword) {
                    if (item.name.includes(keyword)) {
                        results.push(item);
                    }
                })
            })
        });
        $("#explorerResults").empty();
    }
}