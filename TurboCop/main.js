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
    supremeWindow.webContents.on("did-finish-load", function(evt) {
        supremeWindow.webContents.executeJavaScript("var turbocoplist = "+JSON.stringify(message.list)+"; var turbocopconfig = "+JSON.stringify(message.config)+";"+'function turbocop(){var e=0;function o(t,n,s){$.ajax({type:\"POST\",url:\"https:\/\/www.supremenewyork.com\/shop\/\"+String(t)+\"\/add.json\",data:{st:n,s:s,qty:1},success:function(c){console.log(c),0==c.length&&(console.log(\"BRUH\"),$.ajax({url:\"https:\/\/www.supremenewyork.com\/shop\/\"+t+\".json\",success:function(e){console.log(e);for(let s in e.styles)for(let c in e.styles[s].sizes)if(1==e.styles[s].sizes[c].stock_level)return void o(t,n,e.styles[s].sizes[c].id)},async:!1}));for(let l in c){let i=c[l];if(i.in_stock||i.size_id!=s){if(i.in_stock&&i.size_id==s)return void(e+=1)}else console.log(\"BRUH\"),$.ajax({url:\"https:\/\/www.supremenewyork.com\/shop\/\"+t+\".json\",success:function(e){for(let s in e.styles)for(let c in e.styles[s].sizes)if(1==e.styles[s].sizes[c].stock_level)return void o(t,n,e.styles[s].sizes[c].id)},async:!1})}},xhrFields:{withCredentials:!0},contentType:\"application\/x-www-form-urlencoded\",async:!1})}window.location.href.includes(\"checkout\")?setTimeout(function(e){document.getElementsByName(\"order[billing_name]\")[0].value=turbocopconfig.Name,document.getElementsByName(\"order[email]\")[0].value=turbocopconfig.Email,document.getElementsByName(\"order[tel]\")[0].value=turbocopconfig.Tel,document.getElementsByName(\"order[billing_address]\")[0].value=turbocopconfig.Address,document.getElementsByName(\"order[billing_zip]\")[0].value=turbocopconfig.Zip,document.getElementsByName(\"order[billing_city]\")[0].value=turbocopconfig.City,document.querySelector(\'option[value=\"\'+turbocopconfig.State+\'\"]\').selected=!0,document.querySelector(\'input[placeholder=\"number\"\').value=turbocopconfig.CardNumber,document.querySelector(\'option[value=\"\'+turbocopconfig.ExpMonth+\'\"]\').selected=!0,document.querySelector(\'option[value=\"\'+turbocopconfig.ExpMonth+\'\"]\').setAttribute(\"selected\",\"selected\"),document.querySelector(\'option[value=\"\'+turbocopconfig.ExpYear+\'\"]\').selected=!0,document.querySelector(\'input[placeholder=\"CVV\"]\').value=turbocopconfig.CVV,document.querySelector(\"#order_terms\").checked=!0},150):setTimeout(function(){for(let e in turbocoplist){let t=turbocoplist[e];o(t.itemID,t.styleID,t.sizeID)}e?window.location.href=\"https:\/\/www.supremenewyork.com\/checkout\":alert(\"All the styles and sizes for the item you want are out of stock :(. You may close this window.\")},150)}turbocop()');
    })
})