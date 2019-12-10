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
$(document).ready(function () {
    TurboCopMenuAgent.performInitialFadeIn();
    $("#turboCopHeading").click(TurboCopMenuAgent.openMainMenu);
    $("#configureButton").click(TurboCopMenuAgent.openSettingsMenu);
    $("#buyButton").click(TurboCopMenuAgent.openBuyMenu);
    $("#explorerButton").click(TurboCopMenuAgent.openExplorerMenu);
    $("#variableInputForm").submit(function(evt) {
        $("#inputModal").modal("hide");
        evt.preventDefault();
    })
    TurboCopSettingsAgent.bindEvents();
    TurboCopSettingsAgent.updateSettingsDisplay();
    TurboCopProxyAgent.makeEUWebRequest("https://www.supremenewyork.com/mobile_stock.json", function (stock) {
        europeMobileStock = stock
    });
    TurboCopProxyAgent.getUSMobileStockJSON(function (stock) {
        americaMobileStock = stock;
    })
})
