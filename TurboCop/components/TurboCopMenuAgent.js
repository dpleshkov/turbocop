class TurboCopMenuAgent {
    static openMainMenu() {
        $(".settings-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        $(".droplist-menu").fadeOut(500);
        $(".console-menu").fadeOut(500);
        setTimeout(function () {
            $(".main-menu").fadeIn(500);
            $("#statusMessage").text("What would you like to do?");
        }, 500)
    }
    static openSettingsMenu() {
        $(".main-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        $(".droplist-menu").fadeOut(500);
        setTimeout(function () {
            $(".settings-menu").fadeIn(500);
            $("#statusMessage").text("Configure TurboCop");
        }, 500)
    }
    static openConsoleMenu() {
        $(".main-menu").fadeOut(500);
        $(".settings-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        $(".droplist-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        setTimeout(function () {
            $(".console-menu").fadeIn(500, function () {
                var height = $(document).height();
                height = height - (height - $("#copyrightMessage").offset().top) - $("#stdout").offset().top;
                $("#stdout").css("height", height-20);
            });
            $("#statusMessage").text("Bot task started.");
            TurboCopShoppingAgent.renderList();
        }, 500)
    }
    static openBuyMenu() {
        $(".main-menu").fadeOut(500);
        $(".settings-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        $(".droplist-menu").fadeOut(500);
        setTimeout(function () {
            $(".buy-menu").fadeIn(500, function () {
                var height = $(document).height();
                height = height - (height - $("#copyrightMessage").offset().top) - $("#shoppingListDisplayContainer").offset().top;
                $("#shoppingListDisplayContainer").css("height", height-20);
            });
            $("#statusMessage").text("View your shopping list then hit buy to buy items.");
            TurboCopShoppingAgent.renderList();
        }, 500)
    }
    static openDroplistMenu() {
        $(".main-menu").fadeOut(500);
        $(".settings-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        setTimeout(function () {
            $(".droplist-menu").fadeIn(500, function () {
                var height = $(document).height();
                height = height - (height - $("#copyrightMessage").offset().top) - $("#droplistIframe").offset().top;
                $("#droplistIframe").css("height", height);
                $("#droplistIframe").css("width", $("#frameContainer").width());
                document.getElementById("droplistIframe").src = "https://supremecommunity.com/season/latest/droplists?bruh=" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            });
            $("#statusMessage").text("View droplists from Supreme Community");
        }, 500)
    }
    static openExplorerMenu() {
        $(".main-menu").fadeOut(500);
        $(".settings-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        $(".droplist-menu").fadeOut(500);
        $("#explorerMoreInfo").hide();
        setTimeout(function () {
            $(".explorer-menu").fadeIn(500);
            $("#statusMessage").text("");
        }, 500);
    }
    static performInitialFadeIn() {
        $("#turboCopHeading").fadeIn(500);
        TurboCopMenuAgent.openMainMenu();
    }
    static performModalPrompt(description, callback, optionalArgument) {
        $("#modalDescription").text(description);
        $("#variableInput").val("");
        $("#inputModal").modal();
        $("#inputModal").unbind("hide.bs.modal");
        $("#inputModal").on("hide.bs.modal", function (evt) {
            if ($("#variableInput").val()) {
                callback($("#variableInput").val(), optionalArgument);
            } else {
                callback("Unspecified", optionalArgument);
            }
        })
    }
}
