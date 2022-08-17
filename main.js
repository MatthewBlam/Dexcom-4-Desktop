const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

var mainWin;
let win_coords;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

const createWindow = () => {
  app.setAppUserModelId('com.dexcom.desktop');

  mainWin = new BrowserWindow({
    width: 500,
    height: 500,
    icon: __dirname + '/web/dexcom.png',
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    },
    transparent: true,
    resizable: false,
    show: false,
  });

  // Set window to always on top
  mainWin.setAlwaysOnTop(true, "floating", 1);
  mainWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWin.setFullScreenable(false);

  mainWin.on('move', function () {
    win_coords = mainWin.getPosition();
  });

  mainWin.loadURL('http://localhost:8000/index.html');

  mainWin.once('ready-to-show', () => {
    sleep(1000)
    mainWin.show();
  });

  ipcMain.on("toMain", (event, args) => {
    var values = JSON.parse(args);
    var keys = Object.keys(values);
    var call = keys[0];
    if (call == 'sM.close()') {
      mainWin.close()
    }
    if (call == 'sM.minimize()') {
      mainWin.minimize()
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', function (e) {
  sendRender({ 'sR.save_bounds()': win_coords })
  sendRender({ 'sR.close()': 'null' });
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


function sendRender(message) {
  mainWin.webContents.send("toRender", JSON.stringify(message));
}

ipcMain.on("toMain", (event, args) => {
  var values = JSON.parse(args);
  var keys = Object.keys(values);
  var call = keys[0];

  if (call == 'sM.mouse_move()') {
    coords = values['sM.mouse_move()'];
    mainWin.webContents.capturePage({ x: coords[0], y: coords[1], width: 1, height: 1 }).then(img => {
      opacity = img.toBitmap()[3];
      if (opacity != 0) {
        mainWin.setIgnoreMouseEvents(false);
      }
      else if (opacity == 0) {
        mainWin.setIgnoreMouseEvents(true, { forward: true });
      }
    });
  }

  if (call == 'sM.set_bounds()') {
    try {
      bounds = values['sM.set_bounds()'];
      mainWin.setPosition(bounds[0], bounds[1])
    }
    catch (err) {
      sendRender({ 'sR.err_in_main()': err })
    }
  }
});
