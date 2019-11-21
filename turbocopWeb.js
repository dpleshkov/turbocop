// ==UserScript==
// @name         Turbocop™
// @namespace    https://www.supremenewyork.com
// @version      0.1
// @description  Supreme shopping automaton
// @author       Dmitry Pleshkov
// @match        https://www.supremenewyork.com/shop/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var config = {
        name: "John Appleseed",

    }

    function buyProduct(evt) {
        document.getElementsByName("commit")[0].click();
    }
    document.body.onkeydown = function (e) {
        var letter = String.fromCharCode(e.keyCode);
        console.log(letter, "was pressed");
        if (letter == "Q") {
            buyProduct();
        }
    };
})();
