class TurboCopMenuAgent {
    static openMainMenu() {
        $(".settings-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        setTimeout(function () {
            $(".main-menu").fadeIn(500);
            $("#statusMessage").text("What would you like to do?");
        }, 500)
    }
    static openSettingsMenu() {
        $(".main-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        setTimeout(function () {
            $(".settings-menu").fadeIn(500);
            $("#statusMessage").text("Configure TurboCop");
        }, 500)
    }
    static openBuyMenu() {
        $(".main-menu").fadeOut(500);
        $(".settings-menu").fadeOut(500);
        $(".explorer-menu").fadeOut(500);
        setTimeout(function () {
            $(".buy-menu").fadeIn(500);
            $("#statusMessage").text("Enter known item info");
        }, 500)
    }
    static openExplorerMenu() {
        $(".main-menu").fadeOut(500);
        $(".settings-menu").fadeOut(500);
        $(".buy-menu").fadeOut(500);
        setTimeout(function () {
            $(".explorer-menu").fadeIn(500);
            $("#statusMessage").text("");
        }, 500)
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