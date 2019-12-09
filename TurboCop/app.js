// Copyright 2019 Dmitry Pleshkov. All Rights Reserved.

const {
    ipcRenderer
} = require('electron');
const $ = require("jquery");
const CryptoJS = require("crypto-js");
const HttpsProxyAgent = require('https-proxy-agent');
const request = require('request');
require("popper.js");
require("bootstrap");

class MenuAgent {
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
        MenuAgent.openMainMenu();
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
class SettingsAgent {
    static bindEvents() {
        var config = SettingsAgent.getConfig();
        Object.keys(config).forEach(function (key) {
            var value = config[key];
            switch (key) {
                case "CardNumber":
                    $("#config" + key).click(function (evt) {
                        MenuAgent.performModalPrompt("Please enter your 16-digit credit card number.", function (input, index) {
                            let uuid = window.localStorage.getItem("uuid");
                            window.localStorage.setItem(index, CryptoJS.AES.encrypt(input, uuid));
                            SettingsAgent.updateSettingDisplay();
                        }, key)
                    });
                    break;
                case "CVV":
                    $("#config" + key).click(function (evt) {
                        MenuAgent.performModalPrompt("Please enter your 3 or 4-digit CVV", function (input, index) {
                            let uuid = window.localStorage.getItem("uuid");
                            window.localStorage.setItem(index, CryptoJS.AES.encrypt(input, uuid));
                            SettingsAgent.updateSettingDisplay();
                        }, key)
                    });
                    break;
                default:
                    $("#config" + key).click(function (evt) {
                        MenuAgent.performModalPrompt("Please enter your " + key.toLocaleLowerCase(), function (input, index) {
                            let uuid = window.localStorage.getItem("uuid");
                            window.localStorage.setItem(index, CryptoJS.AES.encrypt(input, uuid));
                            SettingsAgent.updateSettingDisplay();
                        }, key)
                    });
                    break;
            }
        });
    }
    static updateSettingDisplay() {
        var config = SettingsAgent.getConfig();
        Object.keys(config).forEach(function (key) {
            var value = config[key];
            switch (key) {
                case "CardNumber":
                    $("#config" + key).text("*".repeat(value.length - 4) + value.substr(value.length - 4));
                    break;
                case "CVV":
                    $("#config" + key).text("*".repeat(value.length));
                    break;
                default:
                    $("#config" + key).text(value);
                    break;
            }
        });
    }
    static setConfig(config, uuid) {
        Object.keys(config).forEach(function (key) {
            localStorage.setItem(key, CryptoJS.AES.encrypt(config[key], uuid));
        })
    }
    static setConfigValue(key, value) {
        var uuid = window.localStorage.getItem("uuid");
        window.localStorage.setItem(key, CryptoJS.AES.encrypt(value, uuid));
    }
    static getConfig() {
        var uuid = window.localStorage.getItem("uuid");
        var config = {
            "Name": "John Doe",
            "Email": "example@gmail.com",
            "Tel": "5551231234",
            "Address": "123 Example Ave",
            "Zip": "94404",
            "City": "San Mateo",
            "State": "CA",
            "CardNumber": "1234567812345678",
            "CVV": "123",
            "ExpMonth": "04",
            "ExpYear": "2023",
            "Country": "USA",
            "Apt": "420"
        }
        if (!uuid) {
            uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            window.localStorage.setItem("uuid", uuid);
            SettingsAgent.setConfig(config, uuid);
        } else {
            Object.keys(config).forEach(function (key) {
                config[key] = CryptoJS.AES.decrypt(localStorage.getItem(key), uuid).toString(CryptoJS.enc.Utf8);
            })
        }
        return config;
    }
}
class TurbocopProxyAgent {
    static getEUMobileStockJSON(callback) {
        TurbocopProxyAgent.getEUProxyList(function (proxyList) {
            var result;
            for (let index = 0; index < proxyList.length; index++) {
                var proxy = "http://" + proxyList[index][0];
                var agent = HttpsProxyAgent(proxy);
                request({
                    uri: "https://www.supremenewyork.com/mobile_stock.json",
                    method: "GET",
                    agent: agent,
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10,
                }, function (error, response, body) {
                    if (error) {
                        console.log("Error occured with selected proxy")
                        return;
                    } else if (body.includes("403 error")) {
                        console.log("Supreme gave a 403 with proxy, trying next one")
                        return;
                    } else {
                        callback(JSON.parse(body));
                    }
                });
            }
        });
    }
    static getProxy(countryCode, callback) { // Deprecated
        $.ajax({
            url: "https://api.getproxylist.com/proxy?country[]=" + countryCode + "&protocol[]=http&allowsHttps=1"
        }).done(callback);
    }
    static getEUProxyList(callback) {
        $.ajax({
            url: "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list.txt"
        }).done(function (data) {
            data = data.split("\n");
            for (let x = 0; x < 9; x++) {
                data.shift();
            }
            data.pop();
            data.pop();
            for (let index = 0; index < data.length; index++) {
                data[index] = data[index].split(" ");
                data[index].pop();
                if (data[index][2] != "+" || data[index][1].split("-").length < 3) {
                    data.splice(index, 1);
                    index -= 1;
                    continue;
                }
                let countryCode = data[index][1].split("-")[0];
                if (!TurbocopProxyAgent.getEuropeanCountryCodes().includes(countryCode)) {
                    data.splice(index, 1);
                    index -= 1;
                }
            }
            callback(data);
        });
    }
    static getEuropeanCountryCodes() {
        return ["GB", "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PO", "PT", "RO", "SE", "SI", "SK", "AL", "AD", "AM", "BA", "BY", "CH", "FO", "GE", "GI", "IS", "MC", "MK", "NO", "SM", "TR", "UA", "VA"]
    }
}
var europeMobileStock;
$(document).ready(function () {
    MenuAgent.performInitialFadeIn();
    $("#turboCopHeading").click(MenuAgent.openMainMenu);
    $("#configureButton").click(MenuAgent.openSettingsMenu);
    $("#buyButton").click(MenuAgent.openBuyMenu);
    $("#explorerButton").click(MenuAgent.openExplorerMenu);
    SettingsAgent.bindEvents();
    SettingsAgent.updateSettingDisplay();
    TurbocopProxyAgent.getEUMobileStockJSON(function(stock) {europeMobileStock = stock});
})
