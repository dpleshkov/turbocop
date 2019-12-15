class TurboCopShoppingAgent {
    static buy() {
        var list = JSON.stringify(shoppingList);
        
    }
    static renderList() {
        $("#shoppingListDisplay").empty();
        shoppingList.forEach(function (item) {
            var a = document.createElement("a");
            a.className = "list-group-item";
            a.innerHTML = item.sizeName + " " + item.styleName + " " + item.itemName;
            document.getElementById("shoppingListDisplay").appendChild(a);
        });
        document.getElementById("explorerBuyButton").removeAttribute("disabled");
    }
    static buy() {
        
    }
}
