const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        center: true,
        resizeable: false,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    });
    mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);
    mainWindow.removeMenu();
    mainWindow.openDevTools({mode: 'undocked'})
    mainWindow.on('ready-to-show', () => {
      mainWindow.show();
    })
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});