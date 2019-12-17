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

class SupremeItem {
    constructor(itemName, styleName, sizeName, category, region) {
        this.itemName = itemName;
        this.styleName = styleName;
        this.sizeName = sizeName;
        this.region = region;
        this.category = category;
    }
}

var europeMobileStock;
var americaMobileStock;
var shoppingList = [];
$(document).ready(function () {
    TurboCopMenuAgent.performInitialFadeIn();
    $("#turboCopHeading").click(TurboCopMenuAgent.openMainMenu);
    $("#configureButton").click(TurboCopMenuAgent.openSettingsMenu);
    $("#buyButton").click(TurboCopMenuAgent.openBuyMenu);
    $("#explorerButton").click(TurboCopMenuAgent.openExplorerMenu);
    $("#droplistButton").click(TurboCopMenuAgent.openDroplistMenu);
    $("#variableInputForm").submit(function (evt) {
        $("#inputModal").modal("hide");
        evt.preventDefault();
    });
    TurboCopSettingsAgent.bindEvents();
    TurboCopSettingsAgent.updateSettingsDisplay();
    TurboCopProxyAgent.makeEUWebRequest("https://www.supremenewyork.com/mobile_stock.json", function (stock) {
        europeMobileStock = stock;
        $("#explorerSearchButton").click(function (evt) {
            var height = $(document).height();
            height = height - (height - $("#copyrightMessage").offset().top) - $("#explorerResults").offset().top;
            $("#explorerResults").css({
                'max-height': height.toString(),
                'height': height.toString()
            });
            height = $(document).height();
            height = height - (height - $("#copyrightMessage").offset().top) - $("#explorerMoreInfo").offset().top;
            $("#explorerMoreInfo").css({
                'max-height': height.toString(),
                'height': height.toString()
            });
            if ($("#regionSelect option:selected").val() == "europe") {
                TurboCopExplorerAgent.filterFromSearch(europeMobileStock);
            } else {
                TurboCopExplorerAgent.filterFromSearch(americaMobileStock);
            }
        });
        $("#explorerSearchInput").on("keyup", function (evt) {
            var height = $(document).height();
            height = height - (height - $("#copyrightMessage").offset().top) - $("#explorerResults").offset().top;
            $("#explorerResults").css({
                'max-height': height.toString(),
                'height': height.toString()
            });
            height = $(document).height();
            height = height - (height - $("#copyrightMessage").offset().top) - $("#explorerMoreInfo").offset().top;
            $("#explorerMoreInfo").css({
                'max-height': height.toString(),
                'height': height.toString()
            });
            if ($("#regionSelect option:selected").val() == "europe") {
                TurboCopExplorerAgent.filterFromSearch(europeMobileStock);
            } else {
                TurboCopExplorerAgent.filterFromSearch(americaMobileStock);
            }
        })
    });
    $("#explorerBuyButton").unbind("click");
    $("#explorerBuyButton").click(function (evt) {
        TurboCopShoppingAgent.buy(shoppingList);
    });
    TurboCopProxyAgent.getUSMobileStockJSON(function (stock) {
        americaMobileStock = stock;
    });
})
