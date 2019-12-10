class TurboCopSettingsAgent {
    static bindEvents() {
        $('#inputModal').on('shown.bs.modal', function () {
            $('#variableInput').trigger('focus')
        })
        var config = TurboCopSettingsAgent.getConfig();
        Object.keys(config).forEach(function (key) {
            var value = config[key];
            switch (key) {
                case "CardNumber":
                    $("#config" + key).click(function (evt) {
                        TurboCopMenuAgent.performModalPrompt("Please enter your 16-digit credit card number.", function (input, index) {
                            let uuid = window.localStorage.getItem("uuid");
                            window.localStorage.setItem(index, CryptoJS.AES.encrypt(input, uuid));
                            TurboCopSettingsAgent.updateSettingsDisplay();
                        }, key);
                    });
                    break;
                case "CVV":
                    $("#config" + key).click(function (evt) {
                        TurboCopMenuAgent.performModalPrompt("Please enter your 3 or 4-digit CVV", function (input, index) {
                            let uuid = window.localStorage.getItem("uuid");
                            window.localStorage.setItem(index, CryptoJS.AES.encrypt(input, uuid));
                            TurboCopSettingsAgent.updateSettingsDisplay();
                        }, key);
                    });
                    break;
                default:
                    $("#config" + key).click(function (evt) {
                        TurboCopMenuAgent.performModalPrompt("Please enter your " + key.toLocaleLowerCase(), function (input, index) {
                            let uuid = window.localStorage.getItem("uuid");
                            window.localStorage.setItem(index, CryptoJS.AES.encrypt(input, uuid));
                            TurboCopSettingsAgent.updateSettingsDisplay();
                        }, key);
                    });
                    break;
            }
        });
    }
    static updateSettingsDisplay() {
        var config = TurboCopSettingsAgent.getConfig();
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
            TurboCopSettingsAgent.setConfig(config, uuid);
        } else {
            Object.keys(config).forEach(function (key) {
                config[key] = CryptoJS.AES.decrypt(localStorage.getItem(key), uuid).toString(CryptoJS.enc.Utf8);
            })
        }
        return config;
    }
}
