// ==UserScript==
// @name         Turbocop™
// @namespace    https://www.supremenewyork.com
// @version      0.1
// @description  Supreme shopping automaton
// @author       Dmitry Pleshkov
// @match        https://www.supremenewyork.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var config = {
        "billing_name": "Guy Smiler",
        "email": "guy@gmail.com",
        "tel": "5105555561",
        "billing_address": "69 Fuckshit Ave",
        "billing_zip": "94404",
        "billing_city": "San Mateo",
        "state": "CA",
        "card_number": "4104557140761269",
        "cvv": "420",
        "exp_month": "04",
        "exp_year": "2028"
    }

    function buyProduct(evt) {
        document.getElementsByName("commit")[0].click();
    }

    function autoFill(evt) {
        document.getElementsByName("order[billing_name]")[0].value = config["billing_name"];
        document.getElementsByName("order[email]")[0].value = config["email"];
        document.getElementsByName("order[tel]")[0].value = config["tel"];
        document.getElementsByName("order[billing_address]")[0].value = config["billing_address"];
        document.getElementsByName("order[billing_zip]")[0].value = config["billing_zip"];
        document.getElementsByName("order[billing_city]")[0].value = config["billing_city"];
        document.getElementById('order_billing_state').value = config.state;
        document.querySelector('input[placeholder="number"').value = config.card_number;
        document.getElementById('credit_card_month').value = config.exp_month;
        document.getElementById('credit_card_year').value = config.exp_year;
        document.querySelector('input[placeholder="CVV"]').value = config.cvv;
        document.querySelector('input[value="process payment"]').click();
    }

    function checkoutProduct(evt) {
        document.getElementsByClassName("checkout")[0].click();
    }
    document.body.onkeydown = function (e) {
        var letter = String.fromCharCode(e.keyCode);
        console.log(letter, "was pressed");
        if (letter == "Q" && e.ctrlKey) {
            buyProduct();
        }
        if (letter == "A" && e.ctrlKey) {
            checkoutProduct();
        }
        if (letter == "Z" && e.ctrlKey) {
            autoFill();
        }
    };
})();
