const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        }
    })
    win.maximize();
    // and load the index.html of the app.
    win.loadFile('index.html')

    // Open the DevTools.
    // win.webContents.openDevTools()
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("buy", function(evt, message) {
    console.log(message.list);
    console.log(message.config);
    
    let supremeWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            images: true
        }
    });
    supremeWindow.webContents.session.clearStorageData({
        storages: ["cookies"]
    });
    supremeWindow.loadURL("https://www.supremenewyork.com/shop");
    supremeWindow.webContents.on("did-finish-load", function(evt) {
        supremeWindow.webContents.executeJavaScript("var turbocoplist = "+JSON.stringify(message.list)+"; var turbocopconfig = "+JSON.stringify(message.config)+";"+'function turbocop(){var itemsInCart=0;function addToCart(itemID,styleID,sizeID){$.ajax({type:\"POST\",url:\"https:\/\/www.supremenewyork.com\/shop\/\"+String(itemID)+\"\/add.json\",data:{st:styleID,s:sizeID,qty:1},success:function(response){console.log(response);if(response.length==0){console.log(\"BRUH\");$.ajax({url:\"https:\/\/www.supremenewyork.com\/shop\/\"+itemID+\".json\",success:function(stockInfo){console.log(stockInfo);for(let styleIndex in stockInfo.styles){for(let sizeIndex in stockInfo.styles[styleIndex].sizes){if(stockInfo.styles[styleIndex].sizes[sizeIndex].stock_level==1){addToCart(itemID,styleID,stockInfo.styles[styleIndex].sizes[sizeIndex].id);return}}}},async:!1})}\r\nfor(let index in response){let i=response[index];if(!i.in_stock&&i.size_id==sizeID){console.log(\"BRUH\");$.ajax({url:\"https:\/\/www.supremenewyork.com\/shop\/\"+itemID+\".json\",success:function(stockInfo){for(let styleIndex in stockInfo.styles){for(let sizeIndex in stockInfo.styles[styleIndex].sizes){if(stockInfo.styles[styleIndex].sizes[sizeIndex].stock_level==1){addToCart(itemID,styleID,stockInfo.styles[styleIndex].sizes[sizeIndex].id);return}}}},async:!1})}else if(i.in_stock&&i.size_id==sizeID){itemsInCart+=1;return}}},xhrFields:{withCredentials:!0},contentType:\"application\/x-www-form-urlencoded\",async:!1})}\r\nfunction autoFill(evt){document.getElementsByName(\"order[billing_name]\")[0].value=turbocopconfig.Name;document.getElementsByName(\"order[email]\")[0].value=turbocopconfig.Email;document.getElementsByName(\"order[tel]\")[0].value=turbocopconfig.Tel;document.getElementsByName(\"order[billing_address]\")[0].value=turbocopconfig.Address;document.getElementsByName(\"order[billing_zip]\")[0].value=turbocopconfig.Zip;document.getElementsByName(\"order[billing_city]\")[0].value=turbocopconfig.City;document.querySelector(\'option[value=\"\'+turbocopconfig.State+\'\"]\').selected=!0;document.querySelector(\'input[placeholder=\"number\"\').value=turbocopconfig.CardNumber;document.querySelector(\'option[value=\"\'+turbocopconfig.ExpMonth+\'\"]\').selected=!0;document.querySelector(\'option[value=\"\'+turbocopconfig.ExpMonth+\'\"]\').setAttribute(\"selected\",\"selected\")\r\ndocument.querySelector(\'option[value=\"\'+turbocopconfig.ExpYear+\'\"]\').selected=!0;document.querySelector(\'input[placeholder=\"CVV\"]\').value=turbocopconfig.CVV;document.querySelectorAll(\'.iCheck-helper\')[1].click()}\r\nif(window.location.href.includes(\"checkout\")){setTimeout(autoFill,150)}else{setTimeout(function(){for(let itemIndex in turbocoplist){let item=turbocoplist[itemIndex];addToCart(item.itemID,item.styleID,item.sizeID)}\r\nif(itemsInCart){window.location.href=\"https:\/\/www.supremenewyork.com\/checkout\"}else{alert(\"All the styles and sizes for the item you want are out of stock :(. You may close this window.\")}},150)}}\r\nturbocop()');
    })
})