// Copyright 2019 Dmitry Pleshkov. All Rights Reserved.

const {
    ipcRenderer
} = require('electron');
const $ = require("jquery");
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
require("popper.js");
require("bootstrap");

class MenuAgent {
    static openMainMenu() {
        $(".settings-menu").fadeOut(500);
        setTimeout(function() {
            $(".main-menu").fadeIn(500);
            $("#statusMessage").text("What would you like to do?")
        }, 500)
    }
    static openSettingsMenu() {

    }
    static performInitialFadeIn() {
        $("#turboCopHeading").fadeIn(500);
        MenuAgent.openMainMenu();
    }
    static performModalPrompt(description, callback) {

    }
}

$(document).ready(function() {
    MenuAgent.performInitialFadeIn();
})