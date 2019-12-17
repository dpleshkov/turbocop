class TurboCopShoppingAgent {
    static buy(list) {
        $("#explorerBuyButton").text("Buy task started");
        document.getElementById("explorerBuyButton").setAttribute("disabled", "disabled");
        ipcRenderer.send("buy", list);
    }
    static renderList() {
        var list = document.getElementById("shoppingListDisplay")
        while (list.childNodes.length > 2) {
            list.removeChild(list.lastChild);
        }
        shoppingList.forEach(function (item) {
            var td1 = document.createElement("td");
            td1.innerHTML = item.styleName;
            var td2 = document.createElement("td");
            td2.innerHTML = item.sizeName;
            var td3 = document.createElement("td");
            td3.innerHTML = item.itemName;
            var td4 = document.createElement("td");
            td4.className = "onhover-red";
            td4.innerHTML = "&times;";
            td4.onclick = function(evt) {
                shoppingList.splice(shoppingList.indexOf(item), 1);
                TurboCopShoppingAgent.renderList();
            };
            var tr = document.createElement("tr");
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            document.getElementById("shoppingListDisplay").appendChild(tr);
        });
        document.getElementById("explorerBuyButton").removeAttribute("disabled");
    }
}
