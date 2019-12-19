class TurboCopShoppingAgent {
    static buy(list) { // Initial stage of the buy process, finds item ids
        $("#explorerBuyButton").text("Buy task started");
        $("#stdout").empty();
        document.getElementById("explorerBuyButton").setAttribute("disabled", "disabled");
        TurboCopMenuAgent.openConsoleMenu();
        setTimeout(function () {
            if (list.length <= 0) {
                TurboCopShoppingAgent.print("Empty shopping list. Aborting task.");
                TurboCopShoppingAgent.print("Task aborted. Click the logo to return to the main menu.");
                return;
            }
            TurboCopShoppingAgent.print("Received " + String(list.length) + " item(s). Prioritizing first one.");
            TurboCopShoppingAgent.print("Looking for item IDs...");
            TurboCopShoppingAgent.print("Looking in local mobile_stock.json");
            list = TurboCopShoppingAgent.getItemIDs(list, americaMobileStock);
            setTimeout(function () {
                if (!list[0].itemID) {
                    TurboCopShoppingAgent.print("Didn't find item ID locally. Looking in web mobile_stock.json.");
                    while (!list[0].itemID) {
                        $.ajax({
                            url: "https://www.supremenewyork.com/mobile_stock.json",
                            success: function (result) {
                                list = TurboCopShoppingAgent.getItemIDs(list, result);
                            },
                            async: false
                        })
                    }
                }
                TurboCopShoppingAgent.buyStage2(list);
            }, 100)
        }, 500)

    }
    static buyStage2(list) { // Stage 2, find item and size ids
        TurboCopShoppingAgent.print("Found item IDs. Now finding style and size IDs.");
        for (let itemIndex in list) {
            var item = list[itemIndex];
            $.ajax({
                url: "https://www.supremenewyork.com/shop/" + item.itemID + ".json",
                success: function (stockInfo) {
                    for (let styleIndex in stockInfo.styles) {
                        var style = stockInfo.styles[styleIndex];
                        if (style.name == item.styleName) {
                            list[itemIndex].styleID = style.id;
                            TurboCopShoppingAgent.print("Style id of " + item.styleName + " is " + style.id);
                        } else {
                            continue;
                        }
                        for (let sizeIndex in style.sizes) {
                            console.log(style.sizes);
                            var size = style.sizes[sizeIndex];
                            if (size.name == item.sizeName) {
                                TurboCopShoppingAgent.print("Size id of " + item.sizeName + " is " + size.id);
                                list[itemIndex].sizeID = size.id;
                            }
                        }
                    }
                },
                async: false
            })
        }
        if (list[0].sizeID) {
            TurboCopShoppingAgent.print("Found style and size IDs. Now sending task to main.js .");
            ipcRenderer.send("buy", {
                list: list,
                config: TurboCopSettingsAgent.getConfig()
            });
        }
    }
    static getItemIDs(list, stock) {
        for (let category in stock.products_and_categories) {
            for (let itemIndex in stock.products_and_categories[category]) {
                let item = stock.products_and_categories[category][itemIndex];
                for (let listIndex in list) {
                    let listItem = list[listIndex];
                    if (listItem.itemID) {
                        continue;
                    }
                    if (listItem.itemName == item.name) {
                        list[listIndex].itemID = item.id;
                        TurboCopShoppingAgent.print("Item ID of " + item.name + " is " + item.id);
                    }
                }
            }
        }
        return list;
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
            td4.onclick = function (evt) {
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
    static print(string) {
        var pre = document.createElement("pre");
        pre.textContent = "> " + string;
        pre.className = "color-white courier-new";
        document.getElementById("stdout").appendChild(pre);
    }
}
