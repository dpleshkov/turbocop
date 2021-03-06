function turbocop() {
    var itemsInCart = 0;

    function addToCart(itemID, styleID, sizeID) {
        $.ajax({
            type: "POST",
            url: "https://www.supremenewyork.com/shop/" + String(itemID) + "/add.json",
            data: {
                st: styleID,
                s: sizeID,
                qty: 1
            },
            success: function (response) {
                console.log(response);
                if (response.length == 0) {
                    console.log("BRUH");
                    $.ajax({
                        url: "https://www.supremenewyork.com/shop/" + itemID + ".json",
                        success: function (stockInfo) {
                            console.log(stockInfo);
                            for (let styleIndex in stockInfo.styles) {
                                for (let sizeIndex in stockInfo.styles[styleIndex].sizes) {
                                    if (stockInfo.styles[styleIndex].sizes[sizeIndex].stock_level == 1) {
                                        addToCart(itemID, styleID, stockInfo.styles[styleIndex].sizes[sizeIndex].id);
                                        return;
                                    }
                                }
                            }
                        },
                        async: false
                    });
                }
                for (let index in response) {
                    let i = response[index];
                    if (!i.in_stock && i.size_id == sizeID) {
                        console.log("BRUH");
                        $.ajax({
                            url: "https://www.supremenewyork.com/shop/" + itemID + ".json",
                            success: function (stockInfo) {
                                for (let styleIndex in stockInfo.styles) {
                                    for (let sizeIndex in stockInfo.styles[styleIndex].sizes) {
                                        if (stockInfo.styles[styleIndex].sizes[sizeIndex].stock_level == 1) {
                                            addToCart(itemID, styleID, stockInfo.styles[styleIndex].sizes[sizeIndex].id);
                                            return;
                                        }
                                    }
                                }
                            },
                            async: false
                        })
                    } else if (i.in_stock && i.size_id == sizeID) {
                        itemsInCart += 1;
                        return;
                    }
                }
            },
            xhrFields: {
                withCredentials: true
            },
            contentType: "application/x-www-form-urlencoded",
            async: false
        });
    }

    function autoFill(evt) {
        document.getElementsByName("order[billing_name]")[0].value = turbocopconfig["Name"];
        document.getElementsByName("order[email]")[0].value = turbocopconfig["Email"];
        document.getElementsByName("order[tel]")[0].value = turbocopconfig["Tel"];
        document.getElementsByName("order[billing_address]")[0].value = turbocopconfig["Address"];
        document.getElementsByName("order[billing_zip]")[0].value = turbocopconfig["Zip"];
        document.getElementsByName("order[billing_city]")[0].value = turbocopconfig["City"];
        document.querySelector('option[value="' + turbocopconfig["State"] + '"]').selected = true;
        document.querySelector('input[placeholder="number"').value = turbocopconfig["CardNumber"];
        document.querySelector('option[value="' + turbocopconfig["ExpMonth"] + '"]').selected = true;
        document.querySelector('option[value="' + turbocopconfig["ExpMonth"] + '"]').setAttribute("selected", "selected")
        document.querySelector('option[value="' + turbocopconfig["ExpYear"] + '"]').selected = true;
        document.querySelector('input[placeholder="CVV"]').value = turbocopconfig["CVV"];
        document.querySelectorAll('.iCheck-helper')[1].click();
    }
    if (window.location.href.includes("checkout")) {
        setTimeout(autoFill, 150);
    } else {
        setTimeout(function () {
            for (let itemIndex in turbocoplist) {
                let item = turbocoplist[itemIndex];
                addToCart(item.itemID, item.styleID, item.sizeID);
            }
            if (itemsInCart) {
                window.location.href = "https://www.supremenewyork.com/checkout";
            } else {
                alert("All the styles and sizes for the item you want are out of stock :(. You may close this window.");
            }
        }, 150);
    }

}
document.addEventListener("load", turbocop);
