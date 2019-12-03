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
            $("#statusMessage").text("What would you like to do?");
        }, 500)
    }
    static openSettingsMenu() {
        $(".main-menu").fadeOut(500);
        setTimeout(function() {
            $(".settings-menu").fadeIn(500);
            $("#statusMessage").text("Configure TurboCop");
        }, 500)
    }
    static performInitialFadeIn() {
        $("#turboCopHeading").fadeIn(500);
        MenuAgent.openMainMenu();
    }
    static performModalPrompt(description, callback) {

    }
}
class SettingsAgent {
    static loadSettings() {
        
    }
    static getConfig() {
        
    }
}

$(document).ready(function() {
    MenuAgent.performInitialFadeIn();
    $("#turboCopHeading").click(MenuAgent.openMainMenu);
    $("#configureButton").click(MenuAgent.openSettingsMenu);
})