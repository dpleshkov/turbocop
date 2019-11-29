const { ipcRenderer } = require('electron');
const $ = require("jquery");
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
require("popper.js");
require("bootstrap");
function login() {
    return;
}

function loadMainMenu() {
    $(".settings-menu").fadeOut(500, function () {
        $("#statusMessage").text("What would you like to do?");
        $(".main-menu").fadeIn(500);
    });
}

function loadSettingsMenu() {
    $(".main-menu").fadeOut(500, function () {
        $("#statusMessage").text("Configure TurboCop");
        $(".settings-menu").fadeIn(500);
    });
}
$("#turboCopHeading").fadeIn(1000, function () {
    $("#statusMessage").text("Please wait...");
    $("#statusMessage").text("Logging in...");
    login();
    loadMainMenu();
});

$("#configureButton").click(loadSettingsMenu);
$("#turboCopHeading").click(loadMainMenu);

function getConfig() {
    var localStorage = window.localStorage;
    var config = {
        "Name": localStorage.getItem("Name"),
        "Email": localStorage.getItem("Email"),
        "Tel": localStorage.getItem("Tel"),
        "Address": localStorage.getItem("Address"),
        "Apt": localStorage.getItem("Apt"),
        "Zip": localStorage.getItem("Zip"),
        "City": localStorage.getItem("City"),
        "State": localStorage.getItem("State"),
        "Country": localStorage.getItem("Country"),
        "CardNumber": localStorage.getItem("CardNumber"),
        "ExpMonth": localStorage.getItem("ExpMonth"),
        "ExpYear": localStorage.getItem("ExpYear"),
        "CVV": localStorage.getItem("CVV")
    };
    return config;
}

function updateInfo(config) {
    Object.keys(config).forEach(function (key) {
        if (!config[key]) {
            config[key] = "Unspecified";
            if (key == "Country") {
                config[key] = "USA"
            } else if (key == "CardNumber") {
                config[key] = "1234567812345678"
            } else if (key == "ExpMonth") {
                config[key] = "00"
            } else if (key == "ExpYear") {
                config[key] = "2019"
            }
        }
        $("#config" + key).text(config[key]);
    })
}
var config = getConfig();
updateInfo(config);
