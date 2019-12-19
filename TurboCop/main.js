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
            nodeIntegration: true,
            images: true
        }
    });
    supremeWindow.webContents.session.clearStorageData({
        storages: ["cookies"]
    });
    supremeWindow.loadURL("https://www.supremenewyork.com/shop");
    supremeWindow.webContents.on("did-stop-loading", function(evt) {
        supremeWindow.webContents.executeJavaScript("var list = "+JSON.stringify(message.list)+"; var config = "+JSON.stringify(message.config)+";"+'var itemsInCart=0;function addToCart(e,t,o){$.ajax({type:\"POST\",url:\"https:\/\/www.supremenewyork.com\/shop\/\"+String(e)+\"\/add.json\",data:{st:t,s:o,qty:1},success:function(s){console.log(s),0==s.length&&(console.log(\"BRUH\"),$.ajax({url:\"https:\/\/www.supremenewyork.com\/shop\/\"+e+\".json\",success:function(o){console.log(o);for(let s in o.styles)for(let l in o.styles[s].sizes)if(1==o.styles[s].sizes[l].stock_level)return void addToCart(e,t,o.styles[s].sizes[l].id)},async:!1}));for(let l in s){let n=s[l];if(n.in_stock||n.size_id!=o){if(n.in_stock&&n.size_id==o)return void(itemsInCart+=1)}else console.log(\"BRUH\"),$.ajax({url:\"https:\/\/www.supremenewyork.com\/shop\/\"+e+\".json\",success:function(o){for(let s in o.styles)for(let l in o.styles[s].sizes)if(1==o.styles[s].sizes[l].stock_level)return void addToCart(e,t,o.styles[s].sizes[l].id)},async:!1})}},xhrFields:{withCredentials:!0},contentType:\"application\/x-www-form-urlencoded\",async:!1})}function autoFill(e){document.getElementsByName(\"order[billing_name]\")[0].value=config.Name,document.getElementsByName(\"order[email]\")[0].value=config.Email,document.getElementsByName(\"order[tel]\")[0].value=config.Tel,document.getElementsByName(\"order[billing_address]\")[0].value=config.Address,document.getElementsByName(\"order[billing_zip]\")[0].value=config.Zip,document.getElementsByName(\"order[billing_city]\")[0].value=config.City,document.querySelector(\'option[value=\"\'+config.State+\'\"]\').selected=!0,document.querySelector(\'input[placeholder=\"number\"\').value=config.CardNumber,document.querySelector(\'option[value=\"\'+config.ExpMonth+\'\"]\').selected=!0,document.querySelector(\'option[value=\"\'+config.ExpMonth+\'\"]\').setAttribute(\"selected\",\"selected\"),document.querySelector(\'option[value=\"\'+config.ExpYear+\'\"]\').selected=!0,document.querySelector(\'input[placeholder=\"CVV\"]\').value=config.CVV,document.querySelector(\"#order_terms\").checked=!0}if(window.location.href.includes(\"checkout\"))autoFill();else{for(let e in list){let t=list[e];addToCart(t.itemID,t.styleID,t.sizeID)}itemsInCart?window.location.href=\"https:\/\/www.supremenewyork.com\/checkout\":alert(\"All the styles and sizes for the item you want are out of stock :(. You may close this window.\")}');
    })
})